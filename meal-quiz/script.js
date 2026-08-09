/* ---------------- 入場動畫（魔法陣） ---------------- */
const lamp = document.getElementById("lamp");
const introHint = document.getElementById("intro-hint");
const enterBtn = document.getElementById("enter-btn");
const introScreen = document.getElementById("intro-screen");
const appEl = document.getElementById("app");
const lampWrap = document.getElementById("lamp-wrap");

let lampRubbed = false;

function activateLamp() {
  if (lampRubbed) return;
  lampRubbed = true;

  lampWrap.classList.add("activated");

  setTimeout(() => {
    introHint.textContent = "精靈：讓我帶你找到今天想吃的美食吧！";
    enterBtn.hidden = false;
  }, 1100);
}

lamp.addEventListener("click", activateLamp);
lamp.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    activateLamp();
  }
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

const stepDots = document.getElementById("step-dots");
const quizSlide = document.getElementById("quiz-slide");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizStep = document.getElementById("quiz-step");
const backBtn = document.getElementById("back-btn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const minigameOverlay = document.getElementById("minigame-overlay");

function renderStepDots() {
  stepDots.innerHTML = "";
  QUESTIONS.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "step-dot";
    if (i === currentStep) dot.classList.add("current");
    else if (i < currentStep) dot.classList.add("done");
    stepDots.appendChild(dot);
  });
}

function renderQuestion(enterDirection) {
  const q = QUESTIONS[currentStep];
  renderStepDots();
  quizQuestion.textContent = q.title;
  quizStep.textContent = `第 ${currentStep + 1} / ${QUESTIONS.length} 題`;
  backBtn.disabled = currentStep === 0;

  quizOptions.innerHTML = "";
  const cards = [];
  q.options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", opt.label);
    card.innerHTML = `<span class="option-icon" aria-hidden="true">${opt.icon}</span><span class="option-label">${opt.label}</span>`;
    if (answers[q.key] === opt.value) card.classList.add("active");
    cards.push(card);
    quizOptions.appendChild(card);
  });
  cards.forEach((card, i) => {
    card.addEventListener("click", () => selectOption(q, q.options[i], card, cards));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(q, q.options[i], card, cards);
      }
    });
  });

  quizSlide.classList.remove("exit-forward", "exit-back");
  if (enterDirection) {
    quizSlide.classList.add(enterDirection === "forward" ? "enter-forward" : "enter-back");
    setTimeout(() => quizSlide.classList.remove("enter-forward", "enter-back"), 320);
  }
}

function selectOption(question, opt, cardEl, cards) {
  if (opt.value === "__unsure__") {
    playMiniGame(question);
    return;
  }
  cards.forEach(c => c.classList.toggle("faded", c !== cardEl));
  cardEl.classList.add("selected");
  answers[question.key] = opt.value;
  setTimeout(advance, 380);
}

function advance() {
  quizSlide.classList.add("exit-forward");
  if (currentStep < QUESTIONS.length - 1) {
    setTimeout(() => {
      currentStep++;
      renderQuestion("forward");
    }, 250);
  } else {
    setTimeout(showEnding, 250);
  }
}

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    quizSlide.classList.add("exit-back");
    setTimeout(() => {
      currentStep--;
      renderQuestion("back");
    }, 250);
  }
});

/* ---------------- 不確定時的小遊戲 ---------------- */
const MINIGAME_DURATION = { tarot: 3400, dice: 3100, lots: 2300, wheel: 2900 };

function playMiniGame(question) {
  const pool = question.options.filter(o => o.value !== "__unsure__" && o.value !== null);
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const pickedIndex = pool.indexOf(picked);

  minigameOverlay.hidden = false;
  minigameOverlay.innerHTML = `<div class="mg-particles" id="mg-particles"></div>` + renderMiniGameHTML(question.miniGame, pool, pickedIndex);
  renderParticles(document.getElementById("mg-particles"), "stars", "#bfe6ff", 18);
  runMiniGameAnimation(question.miniGame, pool, pickedIndex, picked);

  const duration = MINIGAME_DURATION[question.miniGame] || 2200;
  setTimeout(() => {
    minigameOverlay.hidden = true;
    minigameOverlay.innerHTML = "";
    answers[question.key] = picked.value;
    advance();
  }, duration);
}

function renderMiniGameHTML(type, pool, pickedIndex) {
  if (type === "tarot") {
    const cards = pool
      .map((o, i) => `
        <div class="tarot-card-mini" id="${i === pickedIndex ? "mg-el" : ""}" style="--i:${i}">
          <div class="tc-face tc-back">✦</div>
          <div class="tc-face tc-front"><span class="tc-icon">${o.icon}</span><span class="tc-label">${o.label}</span></div>
        </div>`)
      .join("");
    return `
      <div class="minigame-box">
        <div class="tarot-spread" style="--n:${pool.length}">${cards}</div>
        <p class="minigame-caption" id="mg-caption">精靈正在洗牌...</p>
      </div>`;
  }
  if (type === "dice") {
    return `
      <div class="minigame-box">
        <div class="dice-scene">
          <div class="dice-cube" id="mg-el">
            <div class="d-face d-front">⚀</div>
            <div class="d-face d-back">⚅</div>
            <div class="d-face d-right">⚁</div>
            <div class="d-face d-left">⚄</div>
            <div class="d-face d-top">⚂</div>
            <div class="d-face d-bottom">⚃</div>
          </div>
        </div>
        <p class="minigame-caption" id="mg-caption">骰子滾動中...</p>
      </div>`;
  }
  if (type === "lots") {
    const sticks = pool
      .map((o, i) => `<div class="lots-stick" id="${i === pickedIndex ? "mg-el" : ""}" style="--i:${i};--n:${pool.length}"><span>${o.icon}</span></div>`)
      .join("");
    return `
      <div class="minigame-box">
        <div class="lots-scene">
          <div class="lots-sticks">${sticks}</div>
          <div class="lots-cup-body">🥡</div>
        </div>
        <p class="minigame-caption" id="mg-caption">搖籤中...</p>
      </div>`;
  }
  // wheel
  const n = pool.length;
  const seg = 360 / n;
  const colors = ["#ff8c42", "#ffb266", "#ff6f61", "#ffd166"];
  const stops = pool
    .map((_, i) => `${colors[i % colors.length]} ${i * seg}deg ${(i + 1) * seg}deg`)
    .join(",");
  const dividers = pool
    .map((_, i) => `<span class="wheel-divider" style="transform:rotate(${i * seg}deg)"></span>`)
    .join("");
  const icons = pool
    .map((o, i) => {
      const angle = i * seg + seg / 2;
      return `<span class="wheel-seg-icon" style="transform:translate(-50%,-50%) rotate(${angle}deg) translateY(-78px) rotate(${-angle}deg)"><span class="wheel-seg-icon-badge">${o.icon}</span></span>`;
    })
    .join("");
  return `
    <div class="minigame-box">
      <div class="wheel-scene">
        <div class="wheel-pointer"></div>
        <div class="wheel-disc" id="mg-el" style="background:conic-gradient(${stops})">
          ${dividers}
          ${icons}
          <div class="wheel-hub"></div>
        </div>
      </div>
      <p class="minigame-caption" id="mg-caption">輪盤轉動中...</p>
    </div>`;
}

function runMiniGameAnimation(type, pool, pickedIndex, picked) {
  const el = document.getElementById("mg-el");
  const caption = document.getElementById("mg-caption");

  if (type === "tarot") {
    const cards = document.querySelectorAll(".tarot-card-mini");
    setTimeout(() => { caption.textContent = "選一張命運之牌..."; }, 900);
    setTimeout(() => {
      // 釋放發牌動畫對 transform/opacity 的控制權，讓後面的狀態變化能正常轉場
      cards.forEach(c => { c.style.animation = "none"; });
      cards.forEach(c => c.classList.add(c.id === "mg-el" ? "chosen" : "discard"));
    }, 1300);
    setTimeout(() => { el.classList.add("flipped"); }, 1650);
    setTimeout(() => { caption.textContent = `抽到了：${picked.label}`; }, 2500);
  } else if (type === "dice") {
    el.style.setProperty("--fx", `${900 + Math.floor(Math.random() * 360)}deg`);
    el.style.setProperty("--fy", `${720 + Math.floor(Math.random() * 360)}deg`);
    el.classList.add("tumbling");
    setTimeout(() => {
      el.classList.add("landed");
      caption.textContent = `結果是：${picked.label}`;
    }, 1600);
  } else if (type === "lots") {
    const sticks = document.querySelectorAll(".lots-stick");
    sticks.forEach(s => s.classList.add("jitter"));
    setTimeout(() => {
      sticks.forEach(s => {
        s.classList.remove("jitter");
        s.classList.add(s.id === "mg-el" ? "drawn" : "settle");
      });
      caption.textContent = `抽到了：${picked.label}`;
    }, 1300);
  } else if (type === "wheel") {
    const seg = 360 / pool.length;
    const target = 1800 + (360 - (pickedIndex * seg + seg / 2));
    requestAnimationFrame(() => {
      el.style.transform = `rotate(${target}deg)`;
    });
    setTimeout(() => { caption.textContent = `停在：${picked.label}`; }, 2450);
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

  renderParticles(endingParticles, ending.particle, ending.gradient[2]);
}

function renderParticles(container, type, color, count = 26) {
  container.innerHTML = "";
  const symbols = PARTICLE_SYMBOLS[type] || ["✦"];
  const motion = PARTICLE_MOTION[type] || "twinkle";

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
    container.appendChild(span);
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
      <div class="result-genie"><svg class="mascot-icon" aria-hidden="true"><use href="#mascot"></use></svg></div>
      <div class="result-emoji" aria-hidden="true">${food.emoji}</div>
      <div class="result-name">${food.name}</div>
      <div class="result-tags">${food.category} · ${food.mealType} · ${"$".repeat(food.budget)}</div>
      <div>
        <button class="reroll-btn" id="reroll-btn">精靈再想想</button>
        <button class="restart-btn" id="restart-btn">重新回答</button>
      </div>
      <div>
        <button class="nearby-btn" id="nearby-btn">📍 幫我找附近店家</button>
        <button class="share-btn" id="share-btn">🔗 分享結果</button>
      </div>
      <p class="share-feedback" id="share-feedback" hidden></p>
      <div class="nearby-box" id="nearby-box" hidden></div>
    </div>
  `;
  document.getElementById("reroll-btn").addEventListener("click", () => {
    currentFood = pickFood();
    renderResultCard(currentFood);
  });
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
  document.getElementById("nearby-btn").addEventListener("click", () => findNearby(food));
  document.getElementById("share-btn").addEventListener("click", () => shareResult(food));
}

async function shareResult(food) {
  const text = `精靈說我今天該吃「${food.name}」${food.emoji}，換你去問問精靈今天要吃什麼吧！`;
  const url = location.href.split("#")[0].split("?")[0];
  const feedback = document.getElementById("share-feedback");

  const showFeedback = msg => {
    feedback.textContent = msg;
    feedback.hidden = false;
    setTimeout(() => { feedback.hidden = true; }, 2500);
  };

  if (navigator.share) {
    try {
      await navigator.share({ title: "今天吃什麼？", text, url });
    } catch (err) {
      // 使用者取消分享，不需要處理
    }
    return;
  }

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      showFeedback("已複製到剪貼簿，貼給朋友看看吧！");
    } catch (err) {
      showFeedback("複製失敗，請手動複製網址分享。");
    }
    return;
  }

  showFeedback("這個瀏覽器不支援分享功能。");
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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  let res;
  try {
    res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
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

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderNearbyList(box, places) {
  if (places.length === 0) {
    box.innerHTML = `<p class="nearby-status">方圓 5 公里內找不到符合的店家，範圍內可能真的很少，建議擴大範圍找找看。</p>`;
    return;
  }
  const items = places
    .map(
      p => `<li><span class="nearby-name">${escapeHtml(p.name)}</span><span class="nearby-dist">${(p.distance / 1000).toFixed(1)} km</span></li>`
    )
    .join("");
  box.innerHTML = `
    <ul class="nearby-list">${items}</ul>
    <p class="nearby-disclaimer">依距離幫你排好順序了，資料來自 OpenStreetMap。</p>
  `;
}
