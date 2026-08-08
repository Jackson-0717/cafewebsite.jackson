// 餐點資料庫
// spicy: 0 = 不辣, 1 = 小辣, 2 = 很辣
// mealType: "正餐" | "湯品" | "點心甜點" | "飲料"
// budget: 1 = 平價, 2 = 中等, 3 = 奢侈
// moods: 適合的心情標籤（開心 / 普通 / 有點累 / 療癒 / 放縱）
// ending: 對應的「終焉」結局類型，見 ENDINGS
const FOODS = [
  { name: "牛肉麵", category: "中式", spicy: 1, mealType: "正餐", budget: 2, moods: ["療癒", "普通"], emoji: "🍜", ending: "warm" },
  { name: "滷肉飯", category: "中式", spicy: 0, mealType: "正餐", budget: 1, moods: ["療癒", "有點累", "普通"], emoji: "🍚", ending: "nostalgic" },
  { name: "水餃", category: "中式", spicy: 0, mealType: "正餐", budget: 1, moods: ["有點累", "普通"], emoji: "🥟", ending: "warm" },
  { name: "麻辣火鍋", category: "中式", spicy: 2, mealType: "正餐", budget: 3, moods: ["放縱", "開心"], emoji: "🍲", ending: "fiery" },
  { name: "小籠包", category: "中式", spicy: 0, mealType: "正餐", budget: 2, moods: ["開心", "普通"], emoji: "🥟", ending: "grand" },
  { name: "宮保雞丁", category: "中式", spicy: 1, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍗", ending: "adventure" },
  { name: "廣東粥", category: "中式", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🥣", ending: "calm" },
  { name: "臭豆腐", category: "中式", spicy: 1, mealType: "點心甜點", budget: 1, moods: ["放縱", "普通"], emoji: "🧊", ending: "adventure" },

  { name: "義大利麵", category: "西式", spicy: 0, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍝", ending: "romantic" },
  { name: "漢堡", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["放縱", "有點累"], emoji: "🍔", ending: "festive" },
  { name: "牛排", category: "西式", spicy: 0, mealType: "正餐", budget: 3, moods: ["放縱", "開心"], emoji: "🥩", ending: "grand" },
  { name: "披薩", category: "西式", spicy: 0, mealType: "正餐", budget: 2, moods: ["放縱", "開心"], emoji: "🍕", ending: "festive" },
  { name: "沙拉", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["普通", "療癒"], emoji: "🥗", ending: "fresh" },
  { name: "三明治", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["有點累", "普通"], emoji: "🥪", ending: "calm" },
  { name: "濃湯", category: "西式", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🍲", ending: "warm" },

  { name: "壽司", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["開心", "普通"], emoji: "🍣", ending: "romantic" },
  { name: "拉麵", category: "日式", spicy: 1, mealType: "湯品", budget: 2, moods: ["療癒", "有點累"], emoji: "🍜", ending: "nostalgic" },
  { name: "咖哩飯", category: "日式", spicy: 1, mealType: "正餐", budget: 1, moods: ["療癒", "普通"], emoji: "🍛", ending: "adventure" },
  { name: "天婦羅", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍤", ending: "fresh" },
  { name: "丼飯", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["有點累", "普通"], emoji: "🍱", ending: "calm" },
  { name: "章魚燒", category: "日式", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "普通"], emoji: "🐙", ending: "festive" },

  { name: "部隊鍋", category: "韓式", spicy: 2, mealType: "湯品", budget: 2, moods: ["放縱", "療癒"], emoji: "🍲", ending: "fiery" },
  { name: "韓式炸雞", category: "韓式", spicy: 1, mealType: "正餐", budget: 2, moods: ["放縱", "開心"], emoji: "🍗", ending: "festive" },
  { name: "石鍋拌飯", category: "韓式", spicy: 1, mealType: "正餐", budget: 2, moods: ["普通", "療癒"], emoji: "🍚", ending: "warm" },
  { name: "辣炒年糕", category: "韓式", spicy: 2, mealType: "點心甜點", budget: 1, moods: ["開心", "放縱"], emoji: "🌶️", ending: "fiery" },

  { name: "越南河粉", category: "東南亞", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🍜", ending: "fresh" },
  { name: "打拋豬", category: "東南亞", spicy: 2, mealType: "正餐", budget: 1, moods: ["普通", "開心"], emoji: "🌶️", ending: "fiery" },
  { name: "月亮蝦餅", category: "東南亞", spicy: 0, mealType: "點心甜點", budget: 2, moods: ["放縱", "開心"], emoji: "🍤", ending: "mystic" },

  { name: "珍珠奶茶", category: "不限", spicy: 0, mealType: "飲料", budget: 1, moods: ["普通", "放縱"], emoji: "🧋", ending: "mystic" },
  { name: "咖啡", category: "不限", spicy: 0, mealType: "飲料", budget: 1, moods: ["普通", "有點累"], emoji: "☕", ending: "calm" },
  { name: "鬆餅", category: "不限", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "放縱"], emoji: "🧇", ending: "romantic" },
  { name: "蛋糕", category: "不限", spicy: 0, mealType: "點心甜點", budget: 2, moods: ["開心", "放縱", "療癒"], emoji: "🍰", ending: "romantic" },
  { name: "剉冰", category: "不限", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "普通"], emoji: "🍧", ending: "fresh" },
];

// 十種原創「終焉」結局：不重現任何動畫作品畫面，純粹以色調、光影、詩句營造史詩落幕感
const ENDINGS = {
  calm: {
    title: "靜謐終焉",
    line: "喧囂落幕，留下的只有恰到好處的安寧。",
    gradient: ["#1b2a4a", "#3a5a7a", "#a7c7e7"],
    particle: "stars",
  },
  warm: {
    title: "溫柔終焉",
    line: "像回家的那盞燈，永遠留一盞給你。",
    gradient: ["#3a2410", "#7a4a20", "#e8b06a"],
    particle: "embers",
  },
  nostalgic: {
    title: "懷舊終焉",
    line: "時間繞了一圈，你還是想念最初的味道。",
    gradient: ["#2a2015", "#5a4a30", "#c9a86a"],
    particle: "dust",
  },
  fiery: {
    title: "熱血終焉",
    line: "戰鬥結束的那一刻，痛快勝過一切。",
    gradient: ["#2a0e0e", "#7a1f1f", "#ff7043"],
    particle: "embers",
  },
  grand: {
    title: "華麗終焉",
    line: "這一餐，值得盛大登場。",
    gradient: ["#241033", "#5a2a7a", "#f2c94c"],
    particle: "confetti",
  },
  adventure: {
    title: "冒險終焉",
    line: "地圖的邊界，是下一口的起點。",
    gradient: ["#0e2a2a", "#1f5a5a", "#7ae0d8"],
    particle: "fireflies",
  },
  romantic: {
    title: "浪漫終焉",
    line: "有些美味，值得細細品味到最後一口。",
    gradient: ["#3a1030", "#7a2a5a", "#ffb3d1"],
    particle: "petals",
  },
  festive: {
    title: "狂歡終焉",
    line: "今天的主角，就是餐桌上的你。",
    gradient: ["#331a0e", "#8a3a1f", "#ffce54"],
    particle: "confetti",
  },
  fresh: {
    title: "清爽終焉",
    line: "洗去疲憊，從這一口重新開始。",
    gradient: ["#0e2a24", "#1f5a4a", "#8be0c9"],
    particle: "bubbles",
  },
  mystic: {
    title: "神秘終焉",
    line: "命運的籤，早已寫好答案。",
    gradient: ["#120a2e", "#2b1a52", "#8a6fd8"],
    particle: "stars",
  },
};

// 五個問題與選項定義
// miniGame: 當使用者選擇「不確定」時觸發的小遊戲類型（tarot / dice / lots / wheel）
// icon: 卡片上方顯示的大圖示；label: 卡片下方文字
const QUESTIONS = [
  {
    key: "mood",
    title: "今天心情如何？",
    miniGame: "tarot",
    options: [
      { value: "開心", icon: "😊", label: "開心" },
      { value: "普通", icon: "😐", label: "普通" },
      { value: "有點累", icon: "😪", label: "有點累" },
      { value: "療癒", icon: "🥺", label: "想療癒一下" },
      { value: "放縱", icon: "🎉", label: "想放縱一下" },
      { value: "__unsure__", icon: "🔮", label: "不確定，抽塔羅牌" },
    ],
  },
  {
    key: "spicy",
    title: "想吃辣的嗎？",
    miniGame: "dice",
    options: [
      { value: 0, icon: "🙅", label: "完全不辣" },
      { value: 1, icon: "🌶️", label: "小辣即可" },
      { value: 2, icon: "🔥", label: "越辣越好" },
      { value: "__unsure__", icon: "🎲", label: "不確定，擲骰子" },
    ],
  },
  {
    key: "category",
    title: "想吃哪種料理？",
    miniGame: "lots",
    options: [
      { value: "中式", icon: "🥟", label: "中式" },
      { value: "西式", icon: "🍝", label: "西式" },
      { value: "日式", icon: "🍣", label: "日式" },
      { value: "韓式", icon: "🍚", label: "韓式" },
      { value: "東南亞", icon: "🌶️", label: "東南亞" },
      { value: null, icon: "🌐", label: "不限" },
      { value: "__unsure__", icon: "🎋", label: "不確定，抽支籤" },
    ],
  },
  {
    key: "budget",
    title: "預算大概多少？",
    miniGame: "wheel",
    options: [
      { value: 1, icon: "💰", label: "平價" },
      { value: 2, icon: "💵", label: "中等" },
      { value: 3, icon: "💎", label: "奢侈" },
      { value: null, icon: "🌐", label: "不限" },
      { value: "__unsure__", icon: "🎡", label: "不確定，轉輪盤" },
    ],
  },
  {
    key: "mealType",
    title: "想吃正餐還是想吃點心？",
    miniGame: "wheel",
    options: [
      { value: "正餐", icon: "🍚", label: "正餐" },
      { value: "湯品", icon: "🍲", label: "湯品" },
      { value: "點心甜點", icon: "🍰", label: "點心甜點" },
      { value: "飲料", icon: "🧋", label: "飲料" },
      { value: null, icon: "🌐", label: "都可以" },
      { value: "__unsure__", icon: "🎡", label: "不確定，轉輪盤" },
    ],
  },
];
