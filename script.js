/* ---------------- 入場動畫（魔法陣） ---------------- */
const lamp = document.getElementById("lamp");
const genie = document.getElementById("genie");
const introHint = document.getElementById("intro-hint");
const enterBtn = document.getElementById("enter-btn");
const introScreen = document.getElementById("intro-screen");
const appEl = document.getElementById("app");
const lampWrap = document.getElementById("lamp-wrap");

let lampRubbed = false;

lamp.addEventListener("click", () => {
  if (lampRubbed) return;
  lampRubbed = true;

  lampWrap.classList.add("activated");

  setTimeout(() => {
    genie.classList.add("appear");
  }, 300);

  setTimeout(() => {
    introHint.textContent = "精靈：讓我帶你找到今天想吃的美食吧！";
    enterBtn.hidden = false;
  }, 1100);
});

enterBtn.addEventListener("click", () => {
  introScreen.style.transition = "opacity 0.5s ease";
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.hidden = true;
    appEl.hidden = false;
    renderQuestion();
  }, 500);
});

/* ---------------- 問答流程 ---------------- */
const answers = {};
let currentStep = 0;

const progressFill = document.getElementById("progress-fill");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizStep = document.getElementById("quiz-step");
const backBtn = document.getElementById("back-btn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const minigameOverlay = document.getElementById("minigame-overlay");

function renderQuestion() {
  const q = QUESTIONS[currentStep];
  progressFill.style.width = `${((currentStep + 1) / QUESTIONS.length) * 100}%`;
  quizQuestion.textContent = q.title;
  quizStep.textContent = `第 ${currentStep + 1} / ${QUESTIONS.length} 題`;
  backBtn.disabled = currentStep === 0;

  quizOptions.innerHTML = "";
  q.options.forEach(opt => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = opt.label;
    if (answers[q.key] === opt.value) chip.classList.add("active");
    chip.addEventListener("click", () => {
      if (opt.value === "__unsure__") {
        playMiniGame(q);
        return;
      }
      answers[q.key] = opt.value;
      advance();
    });
    quizOptions.appendChild(chip);
  });
}

function advance() {
  if (currentStep < QUESTIONS.length - 1) {
    currentStep++;
    setTimeout(renderQuestion, 200);
  } else {
    setTimeout(showEnding, 200);
  }
}

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
});

/* ---------------- 不確定時的小遊戲 ---------------- */
function playMiniGame(question) {
  const pool = question.options.filter(o => o.value !== "__unsure__" && o.value !== null);
  const picked = pool[Math.floor(Math.random() * pool.length)];

  minigameOverlay.hidden = false;
  minigameOverlay.innerHTML = renderMiniGameHTML(question.miniGame, picked);
  runMiniGameAnimation(question.miniGame, picked);

  setTimeout(() => {
    minigameOverlay.hidden = true;
    minigameOverlay.innerHTML = "";
    answers[question.key] = picked.value;
    advance();
  }, 2000);
}

function renderMiniGameHTML(type, picked) {
  if (type === "tarot") {
    return `
      <div class="minigame-box">
        <div class="tarot-card" id="mg-el">
          <div class="tarot-face tarot-back">🔮</div>
          <div class="tarot-face tarot-front">${picked.label}</div>
        </div>
        <p class="minigame-caption" id="mg-caption">精靈正在為你抽牌...</p>
      </div>`;
  }
  if (type === "dice") {
    return `
      <div class="minigame-box">
        <div class="dice" id="mg-el">🎲</div>
        <p class="minigame-caption" id="mg-caption">骰子滾動中...</p>
      </div>`;
  }
  if (type === "lots") {
    return `
      <div class="minigame-box">
        <div class="lots-cup">🥢🥢🥢🥢<span class="lots-stick" id="mg-el">🎋</span>🥢</div>
        <p class="minigame-caption" id="mg-caption">搖籤中...</p>
      </div>`;
  }
  // wheel
  return `
    <div class="minigame-box">
      <div class="wheel" id="mg-el">🎡</div>
      <p class="minigame-caption" id="mg-caption">輪盤轉動中...</p>
    </div>`;
}

function runMiniGameAnimation(type, picked) {
  const el = document.getElementById("mg-el");
  const caption = document.getElementById("mg-caption");

  if (type === "tarot") {
    setTimeout(() => el.classList.add("flipped"), 500);
    setTimeout(() => { caption.textContent = `抽到了：${picked.label}`; }, 1300);
  } else if (type === "dice") {
    el.classList.add("rolling");
    const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    setTimeout(() => {
      el.classList.remove("rolling");
      el.textContent = faces[Math.floor(Math.random() * faces.length)];
      caption.textContent = `結果是：${picked.label}`;
    }, 1000);
  } else if (type === "lots") {
    el.classList.add("pop");
    setTimeout(() => { caption.textContent = `抽到了：${picked.label}`; }, 900);
  } else if (type === "wheel") {
    el.style.setProperty("--spin", `${1080 + Math.floor(Math.random() * 360)}deg`);
    el.classList.add("spin");
    setTimeout(() => { caption.textContent = `停在：${picked.label}`; }, 1300);
  }
}

/* ---------------- 計分與推薦 ---------------- */
function scoreFood(food) {
  let score = 0;
  if (answers.mood != null && food.moods.includes(answers.mood)) score += 3;
  if (answers.spicy != null && food.spicy === answers.spicy) score += 2;
  if (answers.category != null) {
    if (food.category === answers.category || food.category === "不限") score += 2;
  }
  if (answers.budget != null && food.budget === answers.budget) score += 1;
  if (answers.mealType != null && food.mealType === answers.mealType) score += 2;
  return score;
}

function pickFood() {
  const scored = FOODS.map(food => ({ food, score: scoreFood(food) }));
  const maxScore = Math.max(...scored.map(s => s.score));
  const best = scored.filter(s => s.score === maxScore).map(s => s.food);
  return best[Math.floor(Math.random() * best.length)];
}

/* ---------------- 終焉結局動畫 ---------------- */
const endingScreen = document.getElementById("ending-screen");
const endingTitle = document.getElementById("ending-title");
const endingLine = document.getElementById("ending-line");
const endingParticles = document.getElementById("ending-particles");
const endingContinueBtn = document.getElementById("ending-continue-btn");

const PARTICLE_SYMBOLS = {
  stars: ["✦", "✧", "★"],
  embers: ["●", "○"],
  dust: ["·", "•"],
  confetti: ["▪", "▫", "◆"],
  fireflies: ["●"],
  petals: ["❀", "✿"],
  bubbles: ["○", "◌"],
};

const PARTICLE_MOTION = {
  stars: "twinkle",
  embers: "rise",
  dust: "drift",
  confetti: "fall",
  fireflies: "drift",
  petals: "fall",
  bubbles: "rise",
};

let currentFood = null;

function showEnding() {
  currentFood = pickFood();
  const ending = ENDINGS[currentFood.ending];

  quizSection.hidden = true;
  endingScreen.hidden = false;
  endingScreen.style.setProperty("--e1", ending.gradient[0]);
  endingScreen.style.setProperty("--e2", ending.gradient[1]);
  endingScreen.style.setProperty("--e3", ending.gradient[2]);
  endingTitle.textContent = ending.title;
  endingLine.textContent = ending.line;

  renderParticles(ending.particle, ending.gradient[2]);
}

function renderParticles(type, color) {
  endingParticles.innerHTML = "";
  const symbols = PARTICLE_SYMBOLS[type] || ["✦"];
  const motion = PARTICLE_MOTION[type] || "twinkle";
  const count = 26;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "ending-particle";
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 10 + Math.random() * 18;
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = motion === "fall" ? "-5%" : `${Math.random() * 100}%`;
    span.style.fontSize = `${size}px`;
    span.style.color = color;
    span.style.opacity = String(0.3 + Math.random() * 0.7);

    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 3;
    if (motion === "rise") {
      span.style.animation = `particle-rise ${duration}s linear ${delay}s infinite`;
    } else if (motion === "fall") {
      span.style.animation = `particle-fall ${duration}s linear ${delay}s infinite`;
    } else if (motion === "drift") {
      span.style.animation = `particle-drift ${duration}s ease-in-out ${delay}s infinite, particle-twinkle ${duration / 2}s ease-in-out ${delay}s infinite`;
    } else {
      span.style.animation = `particle-twinkle ${duration}s ease-in-out ${delay}s infinite`;
    }
    endingParticles.appendChild(span);
  }
}

endingContinueBtn.addEventListener("click", () => {
  endingScreen.hidden = true;
  resultSection.hidden = false;
  renderResultCard(currentFood);
});

/* ---------------- 結果卡片 ---------------- */
function renderResultCard(food) {
  resultSection.innerHTML = `
    <div class="result-card">
      <div class="result-genie"><svg class="mascot-icon"><use href="#mascot"></use></svg></div>
      <div class="result-emoji">${food.emoji}</div>
      <div class="result-name">${food.name}</div>
      <div class="result-tags">${food.category} · ${food.mealType} · ${"$".repeat(food.budget)}</div>
      <div>
        <button class="reroll-btn" id="reroll-btn">精靈再想想</button>
        <button class="restart-btn" id="restart-btn">重新回答</button>
      </div>
      <button class="nearby-btn" id="nearby-btn">📍 幫我找附近店家</button>
      <div class="nearby-box" id="nearby-box" hidden></div>
    </div>
  `;
  document.getElementById("reroll-btn").addEventListener("click", () => {
    currentFood = pickFood();
    renderResultCard(currentFood);
  });
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
  document.getElementById("nearby-btn").addEventListener("click", () => findNearby(food));
}

function restartQuiz() {
  Object.keys(answers).forEach(k => delete answers[k]);
  currentStep = 0;
  resultSection.hidden = true;
  quizSection.hidden = false;
  renderQuestion();
}

/* ---------------- 附近店家（OpenStreetMap，免費、無金鑰） ---------------- */
const CUISINE_KEYWORDS = {
  "中式": "chinese",
  "西式": "european",
  "日式": "japanese",
  "韓式": "korean",
  "東南亞": "asian",
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

async function findNearby(food) {
  const box = document.getElementById("nearby-box");
  box.hidden = false;
  box.innerHTML = `<p class="nearby-status">正在取得你的位置...</p>`;

  if (!navigator.geolocation) {
    box.innerHTML = `<p class="nearby-status">這個瀏覽器不支援定位功能。</p>`;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;
      box.innerHTML = `<p class="nearby-status">搜尋方圓 5 公里內的店家...</p>`;
      try {
        const places = await queryNearbyRestaurants(latitude, longitude, food.category);
        renderNearbyList(box, places);
      } catch (err) {
        box.innerHTML = `<p class="nearby-status">搜尋失敗，請稍後再試一次。</p>`;
      }
    },
    () => {
      box.innerHTML = `<p class="nearby-status">無法取得你的位置，請確認已允許定位權限。</p>`;
    },
    { timeout: 10000 }
  );
}

async function queryNearbyRestaurants(lat, lon, category) {
  const radius = 5000;
  const cuisine = CUISINE_KEYWORDS[category];
  const cuisineFilter = cuisine ? `["cuisine"~"${cuisine}",i]` : "";
  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="restaurant"]${cuisineFilter}(around:${radius},${lat},${lon});
    );
    out center 20;
  `;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  if (!res.ok) throw new Error("overpass request failed");
  const data = await res.json();

  return data.elements
    .filter(el => el.tags && el.tags.name)
    .map(el => ({
      name: el.tags.name,
      distance: haversineDistance(lat, lon, el.lat, el.lon),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8);
}

function renderNearbyList(box, places) {
  if (places.length === 0) {
    box.innerHTML = `<p class="nearby-status">方圓 5 公里內找不到符合的店家，範圍內可能真的很少，建議擴大範圍找找看。</p>`;
    return;
  }
  const items = places
    .map(
      p => `<li><span class="nearby-name">${p.name}</span><span class="nearby-dist">${(p.distance / 1000).toFixed(1)} km</span></li>`
    )
    .join("");
  box.innerHTML = `
    <ul class="nearby-list">${items}</ul>
    <p class="nearby-disclaimer">資料來源：OpenStreetMap，依「距離」排序（免費地圖無公開評價分數，若需要以評價排序需串接 Google Places API 金鑰）。</p>
  `;
}
