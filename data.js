// 餐點資料庫：每個項目有名稱、分類、口味、預算等級、圖示
const FOODS = [
  { name: "牛肉麵", category: "中式", taste: "重口味", budget: 2, emoji: "🍜" },
  { name: "滷肉飯", category: "中式", taste: "清淡", budget: 1, emoji: "🍚" },
  { name: "水餃", category: "中式", taste: "清淡", budget: 1, emoji: "🥟" },
  { name: "麻辣火鍋", category: "中式", taste: "辣", budget: 3, emoji: "🍲" },
  { name: "小籠包", category: "中式", taste: "清淡", budget: 2, emoji: "🥟" },
  { name: "宮保雞丁", category: "中式", taste: "辣", budget: 2, emoji: "🍗" },
  { name: "廣東粥", category: "中式", taste: "清淡", budget: 1, emoji: "🥣" },
  { name: "臭豆腐", category: "中式", taste: "重口味", budget: 1, emoji: "🧊" },

  { name: "義大利麵", category: "西式", taste: "清淡", budget: 2, emoji: "🍝" },
  { name: "漢堡", category: "西式", taste: "重口味", budget: 1, emoji: "🍔" },
  { name: "牛排", category: "西式", taste: "重口味", budget: 3, emoji: "🥩" },
  { name: "披薩", category: "西式", taste: "重口味", budget: 2, emoji: "🍕" },
  { name: "沙拉", category: "西式", taste: "清淡", budget: 1, emoji: "🥗" },
  { name: "三明治", category: "西式", taste: "清淡", budget: 1, emoji: "🥪" },

  { name: "壽司", category: "日式", taste: "清淡", budget: 2, emoji: "🍣" },
  { name: "拉麵", category: "日式", taste: "重口味", budget: 2, emoji: "🍜" },
  { name: "咖哩飯", category: "日式", taste: "重口味", budget: 1, emoji: "🍛" },
  { name: "天婦羅", category: "日式", taste: "清淡", budget: 2, emoji: "🍤" },
  { name: "丼飯", category: "日式", taste: "清淡", budget: 2, emoji: "🍱" },
  { name: "章魚燒", category: "日式", taste: "重口味", budget: 1, emoji: "🐙" },

  { name: "部隊鍋", category: "韓式", taste: "辣", budget: 2, emoji: "🍲" },
  { name: "韓式炸雞", category: "韓式", taste: "重口味", budget: 2, emoji: "🍗" },
  { name: "石鍋拌飯", category: "韓式", taste: "清淡", budget: 2, emoji: "🍚" },
  { name: "辣炒年糕", category: "韓式", taste: "辣", budget: 1, emoji: "🌶️" },

  { name: "越南河粉", category: "東南亞", taste: "清淡", budget: 1, emoji: "🍜" },
  { name: "打拋豬", category: "東南亞", taste: "辣", budget: 1, emoji: "🌶️" },
  { name: "月亮蝦餅", category: "東南亞", taste: "重口味", budget: 2, emoji: "🍤" },

  { name: "珍珠奶茶", category: "飲料", taste: "清淡", budget: 1, emoji: "🧋" },
  { name: "咖啡", category: "飲料", taste: "清淡", budget: 1, emoji: "☕" },
  { name: "鬆餅", category: "甜點", taste: "清淡", budget: 1, emoji: "🧇" },
  { name: "蛋糕", category: "甜點", taste: "清淡", budget: 2, emoji: "🍰" },
  { name: "剉冰", category: "甜點", taste: "清淡", budget: 1, emoji: "🍧" },
];
