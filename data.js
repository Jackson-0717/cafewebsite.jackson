// 餐點資料庫
// spicy: 0 = 不辣, 1 = 小辣, 2 = 很辣
// mealType: "正餐" | "湯品" | "點心甜點" | "飲料"
// budget: 1 = 平價, 2 = 中等, 3 = 奢侈
// moods: 適合的心情標籤（開心 / 普通 / 有點累 / 療癒 / 放縱）
const FOODS = [
  { name: "牛肉麵", category: "中式", spicy: 1, mealType: "正餐", budget: 2, moods: ["療癒", "普通"], emoji: "🍜" },
  { name: "滷肉飯", category: "中式", spicy: 0, mealType: "正餐", budget: 1, moods: ["療癒", "有點累", "普通"], emoji: "🍚" },
  { name: "水餃", category: "中式", spicy: 0, mealType: "正餐", budget: 1, moods: ["有點累", "普通"], emoji: "🥟" },
  { name: "麻辣火鍋", category: "中式", spicy: 2, mealType: "正餐", budget: 3, moods: ["放縱", "開心"], emoji: "🍲" },
  { name: "小籠包", category: "中式", spicy: 0, mealType: "正餐", budget: 2, moods: ["開心", "普通"], emoji: "🥟" },
  { name: "宮保雞丁", category: "中式", spicy: 1, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍗" },
  { name: "廣東粥", category: "中式", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🥣" },
  { name: "臭豆腐", category: "中式", spicy: 1, mealType: "點心甜點", budget: 1, moods: ["放縱", "普通"], emoji: "🧊" },

  { name: "義大利麵", category: "西式", spicy: 0, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍝" },
  { name: "漢堡", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["放縱", "有點累"], emoji: "🍔" },
  { name: "牛排", category: "西式", spicy: 0, mealType: "正餐", budget: 3, moods: ["放縱", "開心"], emoji: "🥩" },
  { name: "披薩", category: "西式", spicy: 0, mealType: "正餐", budget: 2, moods: ["放縱", "開心"], emoji: "🍕" },
  { name: "沙拉", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["普通", "療癒"], emoji: "🥗" },
  { name: "三明治", category: "西式", spicy: 0, mealType: "正餐", budget: 1, moods: ["有點累", "普通"], emoji: "🥪" },
  { name: "濃湯", category: "西式", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🍲" },

  { name: "壽司", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["開心", "普通"], emoji: "🍣" },
  { name: "拉麵", category: "日式", spicy: 1, mealType: "湯品", budget: 2, moods: ["療癒", "有點累"], emoji: "🍜" },
  { name: "咖哩飯", category: "日式", spicy: 1, mealType: "正餐", budget: 1, moods: ["療癒", "普通"], emoji: "🍛" },
  { name: "天婦羅", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["普通", "開心"], emoji: "🍤" },
  { name: "丼飯", category: "日式", spicy: 0, mealType: "正餐", budget: 2, moods: ["有點累", "普通"], emoji: "🍱" },
  { name: "章魚燒", category: "日式", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "普通"], emoji: "🐙" },

  { name: "部隊鍋", category: "韓式", spicy: 2, mealType: "湯品", budget: 2, moods: ["放縱", "療癒"], emoji: "🍲" },
  { name: "韓式炸雞", category: "韓式", spicy: 1, mealType: "正餐", budget: 2, moods: ["放縱", "開心"], emoji: "🍗" },
  { name: "石鍋拌飯", category: "韓式", spicy: 1, mealType: "正餐", budget: 2, moods: ["普通", "療癒"], emoji: "🍚" },
  { name: "辣炒年糕", category: "韓式", spicy: 2, mealType: "點心甜點", budget: 1, moods: ["開心", "放縱"], emoji: "🌶️" },

  { name: "越南河粉", category: "東南亞", spicy: 0, mealType: "湯品", budget: 1, moods: ["療癒", "有點累"], emoji: "🍜" },
  { name: "打拋豬", category: "東南亞", spicy: 2, mealType: "正餐", budget: 1, moods: ["普通", "開心"], emoji: "🌶️" },
  { name: "月亮蝦餅", category: "東南亞", spicy: 0, mealType: "點心甜點", budget: 2, moods: ["放縱", "開心"], emoji: "🍤" },

  { name: "珍珠奶茶", category: "不限", spicy: 0, mealType: "飲料", budget: 1, moods: ["普通", "放縱"], emoji: "🧋" },
  { name: "咖啡", category: "不限", spicy: 0, mealType: "飲料", budget: 1, moods: ["普通", "有點累"], emoji: "☕" },
  { name: "鬆餅", category: "不限", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "放縱"], emoji: "🧇" },
  { name: "蛋糕", category: "不限", spicy: 0, mealType: "點心甜點", budget: 2, moods: ["開心", "放縱", "療癒"], emoji: "🍰" },
  { name: "剉冰", category: "不限", spicy: 0, mealType: "點心甜點", budget: 1, moods: ["開心", "普通"], emoji: "🍧" },
];

// 五個問題與選項定義
const QUESTIONS = [
  {
    key: "mood",
    title: "今天心情如何？",
    options: [
      { value: "開心", label: "開心 😊" },
      { value: "普通", label: "普通 😐" },
      { value: "有點累", label: "有點累 😪" },
      { value: "療癒", label: "心情不好，想療癒一下 🥺" },
      { value: "放縱", label: "想放縱一下 🎉" },
    ],
  },
  {
    key: "spicy",
    title: "想吃辣的嗎？",
    options: [
      { value: 0, label: "完全不辣 🙅" },
      { value: 1, label: "小辣即可 🌶️" },
      { value: 2, label: "越辣越好 🔥" },
      { value: null, label: "都可以 🤷" },
    ],
  },
  {
    key: "category",
    title: "想吃哪種料理？",
    options: [
      { value: "中式", label: "中式" },
      { value: "西式", label: "西式" },
      { value: "日式", label: "日式" },
      { value: "韓式", label: "韓式" },
      { value: "東南亞", label: "東南亞" },
      { value: null, label: "不限" },
    ],
  },
  {
    key: "budget",
    title: "預算大概多少？",
    options: [
      { value: 1, label: "$ 平價" },
      { value: 2, label: "$$ 中等" },
      { value: 3, label: "$$$ 奢侈" },
      { value: null, label: "不限" },
    ],
  },
  {
    key: "mealType",
    title: "想吃正餐還是想吃點心？",
    options: [
      { value: "正餐", label: "正餐 🍚" },
      { value: "湯品", label: "湯品 🍲" },
      { value: "點心甜點", label: "點心甜點 🍰" },
      { value: "飲料", label: "飲料 🧋" },
      { value: null, label: "都可以" },
    ],
  },
];
