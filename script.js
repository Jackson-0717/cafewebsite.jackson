/* ---------------- 入場動畫（阿拉丁神燈） ---------------- */
const lamp = document.getElementById("lamp");
const genie = document.getElementById("genie");
const introHint = document.getElementById("intro-hint");
const enterBtn = document.getElementById("enter-btn");
const introScreen = document.getElementById("intro-screen");
const appEl = document.getElementById("app");
const smokes = document.querySelectorAll(".smoke");

let lampRubbed = false;

lamp.addEventListener("click", () => {
  if (lampRubbed) return;
  lampRubbed = true;

  lamp.classList.add("rubbed");
  smokes.forEach(s => s.classList.add("rise"));

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
      answers[q.key] = opt.value;
      if (currentStep < QUESTIONS.length - 1) {
        currentStep++;
        setTimeout(renderQuestion, 200);
      } else {
        setTimeout(showResult, 200);
      }
    });
    quizOptions.appendChild(chip);
  });
}

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
});

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

function renderResultCard(food) {
  resultSection.innerHTML = `
    <div class="result-card">
      <div class="result-genie">🧞</div>
      <div class="result-emoji">${food.emoji}</div>
      <div class="result-name">${food.name}</div>
      <div class="result-tags">${food.category} · ${food.mealType} · ${"$".repeat(food.budget)}</div>
      <div>
        <button class="reroll-btn" id="reroll-btn">精靈再想想</button>
        <button class="restart-btn" id="restart-btn">重新回答</button>
      </div>
    </div>
  `;
  document.getElementById("reroll-btn").addEventListener("click", () => {
    renderResultCard(pickFood());
  });
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function showResult() {
  quizSection.hidden = true;
  resultSection.hidden = false;
  renderResultCard(pickFood());
}

function restartQuiz() {
  Object.keys(answers).forEach(k => delete answers[k]);
  currentStep = 0;
  resultSection.hidden = true;
  quizSection.hidden = false;
  renderQuestion();
}
