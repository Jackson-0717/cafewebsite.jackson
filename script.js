const state = {
  category: null,
  taste: null,
  budget: null,
};

const CATEGORIES = [...new Set(FOODS.map(f => f.category))];
const TASTES = [...new Set(FOODS.map(f => f.taste))];
const BUDGETS = [
  { value: 1, label: "$ 平價" },
  { value: 2, label: "$$ 中等" },
  { value: 3, label: "$$$ 奢侈" },
];

function renderChips(containerId, items, stateKey, getLabel, getValue) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach(item => {
    const value = getValue(item);
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = getLabel(item);
    chip.addEventListener("click", () => {
      state[stateKey] = state[stateKey] === value ? null : value;
      updateActiveChips();
    });
    chip.dataset.value = value;
    container.appendChild(chip);
  });
}

function updateActiveChips() {
  document.querySelectorAll("#category-filters .chip").forEach(chip => {
    chip.classList.toggle("active", state.category === chip.dataset.value);
  });
  document.querySelectorAll("#taste-filters .chip").forEach(chip => {
    chip.classList.toggle("active", state.taste === chip.dataset.value);
  });
  document.querySelectorAll("#budget-filters .chip").forEach(chip => {
    chip.classList.toggle("active", state.budget === Number(chip.dataset.value));
  });
}

renderChips("category-filters", CATEGORIES, "category", c => c, c => c);
renderChips("taste-filters", TASTES, "taste", t => t, t => t);
renderChips("budget-filters", BUDGETS, "budget", b => b.label, b => b.value);

function getMatches() {
  return FOODS.filter(f =>
    (!state.category || f.category === state.category) &&
    (!state.taste || f.taste === state.taste) &&
    (!state.budget || f.budget === state.budget)
  );
}

function renderResult(food) {
  const result = document.getElementById("result");
  if (!food) {
    result.innerHTML = `<div class="result-empty">找不到符合條件的餐點，換個組合再試試吧！</div>`;
    return;
  }
  result.innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${food.emoji}</div>
      <div class="result-name">${food.name}</div>
      <div class="result-tags">${food.category} · ${food.taste} · ${"$".repeat(food.budget)}</div>
      <button class="reroll-btn" id="reroll-btn">再抽一次</button>
    </div>
  `;
  document.getElementById("reroll-btn").addEventListener("click", decide);
}

function decide() {
  const matches = getMatches();
  if (matches.length === 0) {
    renderResult(null);
    return;
  }
  const pick = matches[Math.floor(Math.random() * matches.length)];
  renderResult(pick);
}

document.getElementById("decide-btn").addEventListener("click", decide);

document.getElementById("reset-btn").addEventListener("click", () => {
  state.category = null;
  state.taste = null;
  state.budget = null;
  updateActiveChips();
  document.getElementById("result").innerHTML =
    `<div class="result-placeholder">選好條件後，按下「幫我決定！」</div>`;
});
