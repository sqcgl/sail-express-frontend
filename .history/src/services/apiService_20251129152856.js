// 本地数据服务 - 使用localStorage存储产品数据
const STORAGE_KEY = "sail_express_products";

// 初始化默认产品数据
const initializeDefaultProducts = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    const defaultProducts = [
      // ========== 新鲜类 (Fresh) ==========
      {
        id: 1,
        name_zh: "鳗鱼 9 OZ / 箱",
        name_en: "Eel 9 OZ / Box",
        description_zh: "优质鳗鱼，9盎司装",
        description_en: "Premium eel, 9 oz per box",
        price: "$225 / 箱",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        name_zh: "鳗鱼 12 OZ / 箱",
        name_en: "Eel 12 OZ / Box",
        description_zh: "优质鳗鱼，12盎司装",
        description_en: "Premium eel, 12 oz per box",
        price: "$180 / 箱",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        name_zh: "金枪鱼碎肉 22磅",
        name_en: "Tuna Ground 22 LB",
        description_zh: "优质金枪鱼碎肉，22磅装，适合制作寿司和刺身",
        description_en: "Premium tuna ground, 22 lb, perfect for sushi and sashimi",
        price: "$3.75 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 4,
        name_zh: "AAA级金枪鱼碎肉 22磅",
        name_en: "Tuna Ground AAA Grade 22 LB",
        description_zh: "AAA级优质金枪鱼碎肉，22磅装，顶级品质",
        description_en: "AAA grade premium tuna ground, 22 lb, top quality",
        price: "$4.25 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 5,
        name_zh: "金枪鱼块",
        name_en: "Tuna Saku",
        description_zh: "精选金枪鱼块，适合制作高级寿司",
        description_en: "Selected tuna saku blocks, perfect for premium sushi",
        price: "$10.5 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 6,
        name_zh: "金枪鱼里脊",
        name_en: "Tuna Loin",
        description_zh: "优质金枪鱼里脊肉，肉质鲜嫩",
        description_en: "Premium tuna loin, tender and fresh",
        price: "$5.95 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 7,
        name_zh: "白鲔鱼 (台湾)",
        name_en: "White Tuna (Taiwan)",
        description_zh: "台湾进口白鲔鱼，品质优良",
        description_en: "Imported white tuna from Taiwan, excellent quality",
        price: "$9.25 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 8,
        name_zh: "罗非鱼片 (9-11盎司)",
        name_en: "Tilapia Fillet (9-11 OZ)",
        description_zh: "新鲜罗非鱼片，每片9-11盎司，肉质细嫩",
        description_en: "Fresh tilapia fillet, 9-11 oz per piece, tender texture",
        price: "$6.95 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 9,
        name_zh: "冷冻黄尾鱼",
        name_en: "Frozen Yellowtail",
        description_zh: "优质冷冻黄尾鱼，肉质鲜美，适合制作寿司和刺身",
        description_en: "Premium frozen yellowtail, fresh and tender, perfect for sushi and sashimi",
        price: "$10.95 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 10,
        name_zh: "A级烟熏三文鱼",
        name_en: "Smoked Salmon Grade A",
        description_zh: "A级优质烟熏三文鱼，口感丰富，适合制作寿司和日式料理",
        description_en: "Grade A premium smoked salmon, rich flavor, perfect for sushi and Japanese cuisine",
        price: "$10.95 / LB",
        category: "fresh",
        image: null,
        created_at: new Date().toISOString(),
      },
      // ========== 冷冻类 (Frozen) ==========
      {
        id: 11,
        name_zh: "寿司虾 5L (30只-15包)",
        name_en: "Sushi Ebi 5L (30PC-15 PACKS)",
        description_zh: "寿司专用虾，5L规格，每包30只，共15包",
        description_en: "Sushi grade shrimp, 5L size, 30 pieces per pack, 15 packs",
        price: "$5.5",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 12,
        name_zh: "寿司虾 6L (30只-15包)",
        name_en: "Sushi Ebi 6L (30PC-15 PACKS)",
        description_zh: "寿司专用虾，6L规格，每包30只，共15包",
        description_en: "Sushi grade shrimp, 6L size, 30 pieces per pack, 15 packs",
        price: "询价",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 13,
        name_zh: "天妇罗虾 (135只)",
        name_en: "Shrimp Tempura (135 pieces)",
        description_zh: "优质天妇罗虾，135只装，即食方便",
        description_en: "Premium shrimp tempura, 135 pieces, ready to serve",
        price: "$55 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 14,
        name_zh: "墨鱼",
        name_en: "Mongo Ika",
        description_zh: "新鲜墨鱼，适合制作寿司和刺身",
        description_en: "Fresh mongo squid, perfect for sushi and sashimi",
        price: "$18 / PK",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 15,
        name_zh: "鱿鱼丝",
        name_en: "Surume Ika",
        description_zh: "日式鱿鱼丝，口感鲜美",
        description_en: "Japanese dried squid strips, delicious flavor",
        price: "询价 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 16,
        name_zh: "龙虾尾 (5OZ)",
        name_en: "Lobster Tail (5OZ)",
        description_zh: "龙虾尾，5盎司",
        description_en: "Lobster tail, 5 oz",
        price: "$235 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 17,
        name_zh: "龙虾尾 (4OZ)",
        name_en: "Lobster Tail (4OZ)",
        description_zh: "龙虾尾，4盎司",
        description_en: "Lobster tail, 4 oz",
        price: "$235 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 18,
        name_zh: "龙虾尾 (3OZ)",
        name_en: "Lobster Tail (3OZ)",
        description_zh: "龙虾尾，3盎司",
        description_en: "Lobster tail, 3 oz",
        price: "$235 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 19,
        name_zh: "虾烧麦 (NISSUI)",
        name_en: "Shrimp Shumai (NISSUI)",
        description_zh: "日水牌虾烧麦",
        description_en: "NISSUI brand shrimp shumai",
        price: "$58 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 20,
        name_zh: "绿色菜饺",
        name_en: "Gyoza Vegetable",
        description_zh: "蔬菜饺子",
        description_en: "Vegetable gyoza",
        price: "$55 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 21,
        name_zh: "鸡肉饺",
        name_en: "Gyoza Chicken & Pork",
        description_zh: "鸡肉猪肉饺子",
        description_en: "Chicken and pork gyoza",
        price: "$55 / 箱",
        category: "frozen",
        image: null,
        created_at: new Date().toISOString(),
      },
      // ========== 干货类 (Dry) ==========
      {
        id: 22,
        name_zh: "海藻沙拉 (日本)",
        name_en: "Seaweed Salad (Japan)",
        description_zh: "日本进口海藻沙拉，口感爽脆，营养丰富",
        description_en: "Imported Japanese seaweed salad, crispy texture, rich in nutrients",
        price: "$20 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 23,
        name_zh: "海藻沙拉 (中国)",
        name_en: "Seaweed Salad (China)",
        description_zh: "中国产海藻沙拉，品质优良，价格实惠",
        description_en: "Chinese seaweed salad, excellent quality, affordable price",
        price: "$10.25 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 24,
        name_zh: "飞鱼籽 (4.4磅 冰岛产)",
        name_en: "Masago (4.4LB Iceland)",
        description_zh: "冰岛进口飞鱼籽，4.4磅装，颗粒饱满",
        description_en: "Imported Icelandic masago, 4.4 lb, plump roe",
        price: "$35 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 25,
        name_zh: "软壳蟹 (10/12/14/18只)",
        name_en: "Soft Shell Crab (10/12/14/18 pieces)",
        description_zh: "优质软壳蟹，多种规格可选，适合制作寿司卷",
        description_en: "Premium soft shell crab, various sizes available, perfect for sushi rolls",
        price: "$25 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 26,
        name_zh: "章鱼头 (完整)",
        name_en: "Tako Whole",
        description_zh: "完整章鱼头，肉质紧实，适合制作刺身和寿司",
        description_en: "Whole octopus head, firm texture, perfect for sashimi and sushi",
        price: "$10.5 / LB",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 27,
        name_zh: "章鱼脚",
        name_en: "Tako Leg",
        description_zh: "新鲜章鱼脚，口感Q弹，适合制作寿司",
        description_en: "Fresh octopus legs, chewy texture, perfect for sushi",
        price: "$11.25 / LB",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 28,
        name_zh: "寿司干贝 (2S)",
        name_en: "Sushi Scallop (2S)",
        description_zh: "寿司用干贝，2S规格",
        description_en: "Sushi scallop, 2S size",
        price: "$55 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 29,
        name_zh: "寿司干贝 (1S)",
        name_en: "Sushi Scallop (1S)",
        description_zh: "寿司用干贝，1S规格",
        description_en: "Sushi scallop, 1S size",
        price: "询价 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 30,
        name_zh: "寿司干贝 (M)",
        name_en: "Sushi Scallop (M)",
        description_zh: "寿司用干贝，M规格",
        description_en: "Sushi scallop, M size",
        price: "询价 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 31,
        name_zh: "飞鱼籽 (红/黑/绿/橙)",
        name_en: "Topiko Fish Roe (Red, Black, Green, Orange)",
        description_zh: "彩色飞鱼籽，红、黑、绿、橙四种颜色可选，装饰美观",
        description_en: "Colored flying fish roe, available in red, black, green, and orange, beautiful decoration",
        price: "$18 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 32,
        name_zh: "三文鱼籽 (大粒)",
        name_en: "Ikura Salmon Roe (Large)",
        description_zh: "优质大粒三文鱼籽，口感鲜美，营养丰富",
        description_en: "Premium large salmon roe, delicious flavor, rich in nutrients",
        price: "$35 / 盒",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 33,
        name_zh: "昆布 (2.2LB)",
        name_en: "Kombu (2.2LB)",
        description_zh: "海带，2.2磅装",
        description_en: "Kelp, 2.2 lb",
        price: "$60 / 箱",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 34,
        name_zh: "裙带菜 (1.1LB) 20包/箱",
        name_en: "Wakame (1.1LB) 20 packs/box",
        description_zh: "裙带菜，1.1磅，20包每箱",
        description_en: "Wakame, 1.1 lb, 20 packs per box",
        price: "$18 / BAG",
        category: "dry",
        image: null,
        created_at: new Date().toISOString(),
      },
      // ========== 器具类 (Supply) ==========
      {
        id: 35,
        name_zh: "春卷皮 (1.5盎司×200条)",
        name_en: "Spring Roll Wrapper (1.5OZ x 200 pieces)",
        description_zh: "优质春卷皮，每张1.5盎司，每箱200条",
        description_en: "Premium spring roll wrapper, 1.5 oz per sheet, 200 pieces per box",
        price: "$35 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 36,
        name_zh: "日式玉子烧",
        name_en: "Tamago",
        description_zh: "传统日式煎蛋卷，口感香甜，适合制作寿司",
        description_en: "Traditional Japanese sweet omelet, perfect for sushi making",
        price: "$5 / 包",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 37,
        name_zh: "日式炒面",
        name_en: "Yaki Soba",
        description_zh: "正宗日式炒面，口感劲道，方便快捷",
        description_en: "Authentic Japanese stir-fried noodles, chewy texture, quick and convenient",
        price: "$32 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 38,
        name_zh: "毛豆 (20 / BAG 台湾)",
        name_en: "Edamame (20 / BAG Taiwan)",
        description_zh: "台湾毛豆，20包",
        description_en: "Taiwan edamame, 20 bags",
        price: "$32",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 39,
        name_zh: "毛豆 (20 / BAG)",
        name_en: "Edamame (20 / BAG)",
        description_zh: "毛豆，20包",
        description_en: "Edamame, 20 bags",
        price: "$26 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 40,
        name_zh: "乌冬面",
        name_en: "Udon",
        description_zh: "优质乌冬面，口感Q弹，适合制作日式料理",
        description_en: "Premium udon noodles, chewy texture, perfect for Japanese cuisine",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 41,
        name_zh: "龙虾沙拉 (日本)",
        name_en: "Lobster Salad (Japan)",
        description_zh: "日本进口龙虾沙拉，口感鲜美，适合制作寿司卷",
        description_en: "Imported Japanese lobster salad, delicious flavor, perfect for sushi rolls",
        price: "$19.5 / 盒",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 42,
        name_zh: "蟹条 (OSAKI)",
        name_en: "Kani Stick (OSAKI)",
        description_zh: "OSAKI牌蟹肉棒",
        description_en: "OSAKI brand crab stick",
        price: "$110 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 43,
        name_zh: "蟹条 (GOLD)",
        name_en: "Kani Stick (GOLD)",
        description_zh: "GOLD牌蟹肉棒",
        description_en: "GOLD brand crab stick",
        price: "$75 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 44,
        name_zh: "蟹条 (BLUE)",
        name_en: "Kani Stick (BLUE)",
        description_zh: "BLUE牌蟹肉棒",
        description_en: "BLUE brand crab stick",
        price: "$55 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 45,
        name_zh: "黄金海苔 (8小箱/大箱)",
        name_en: "Nori Gold Seaweed (8 small boxes/1 large box)",
        description_zh: "优质黄金海苔，8小箱装一大箱，适合制作寿司卷",
        description_en: "Premium gold nori, 8 small boxes per large box, perfect for sushi rolls",
        price: "$520 / 大箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 46,
        name_zh: "豆皮 (每盒6包)",
        name_en: "Soy Paper (6 packs per box)",
        description_zh: "优质豆皮，每盒6包，适合制作寿司卷",
        description_en: "Premium soy paper, 6 packs per box, perfect for sushi rolls",
        price: "$63 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 47,
        name_zh: "芥末 (Waner 日本)",
        name_en: "Wasabi (Waner Japan)",
        description_zh: "日本Waner牌芥末，口感辛辣，品质优良",
        description_en: "Japanese Waner brand wasabi, spicy flavor, excellent quality",
        price: "市场价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 48,
        name_zh: "特级芥末",
        name_en: "Wasabi Premium",
        description_zh: "特级芥末，口感浓郁，适合高级日式料理",
        description_en: "Premium wasabi, rich flavor, perfect for high-end Japanese cuisine",
        price: "$60 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 49,
        name_zh: "白芝麻",
        name_en: "White Sesame",
        description_zh: "白芝麻",
        description_en: "White sesame seeds",
        price: "$18 / BAG",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 50,
        name_zh: "黑芝麻",
        name_en: "Black Sesame",
        description_zh: "黑芝麻",
        description_en: "Black sesame seeds",
        price: "$4.95 / BAG",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 51,
        name_zh: "竹制筷子",
        name_en: "Chopstick (Bamboo)",
        description_zh: "优质竹制筷子，环保健康，适合日式餐厅",
        description_en: "Premium bamboo chopsticks, eco-friendly and healthy, perfect for Japanese restaurants",
        price: "$40 / BOX",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 52,
        name_zh: "木制筷子",
        name_en: "Chopstick (Wood)",
        description_zh: "优质木制筷子，手感舒适，耐用环保",
        description_en: "Premium wooden chopsticks, comfortable grip, durable and eco-friendly",
        price: "$80 / BOX",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 53,
        name_zh: "竹叶 (Sasa)",
        name_en: "Bamboo Leaf (Sasa)",
        description_zh: "寿司专用竹叶，天然环保，装饰美观",
        description_en: "Sushi bamboo leaves, natural and eco-friendly, beautiful decoration",
        price: "$85 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 54,
        name_zh: "寿司吧布 (150PC/BOX)",
        name_en: "Kitchen Towel (150PC/BOX)",
        description_zh: "厨房毛巾，150条每箱",
        description_en: "Kitchen towel, 150 pieces per box",
        price: "$105 / 盒",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 55,
        name_zh: "玫瑰纸巾 (1000PC/BOX)",
        name_en: "Rose Napkin (1000PC/BOX)",
        description_zh: "玫瑰纸巾，1000张每箱",
        description_en: "Rose napkin, 1000 pieces per box",
        price: "$35",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 56,
        name_zh: "美乃滋",
        name_en: "Mayonnaise",
        description_zh: "优质美乃滋，口感顺滑，适合制作寿司和日式料理",
        description_en: "Premium mayonnaise, smooth texture, perfect for sushi and Japanese cuisine",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 57,
        name_zh: "昆布卷 (20包/盒)",
        name_en: "Kombu Maki (20 packs/box)",
        description_zh: "日式昆布卷，每盒20包，口感鲜美",
        description_en: "Japanese kombu maki, 20 packs per box, delicious flavor",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 58,
        name_zh: "田牧米 (50LB)",
        name_en: "Rice Tamaki (50LB)",
        description_zh: "田牧米，50磅装",
        description_en: "Tamaki rice, 50 lb",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 59,
        name_zh: "锦米 (50LB)",
        name_en: "Rice Jin (50LB)",
        description_zh: "锦米，50磅装",
        description_en: "Jin rice, 50 lb",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 60,
        name_zh: "吉米 (50LB)",
        name_en: "Rice Ji (50LB)",
        description_zh: "吉米，50磅装",
        description_en: "Ji rice, 50 lb",
        price: "询价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 61,
        name_zh: "富田米 (50LB)",
        name_en: "Rice Tomita (50LB)",
        description_zh: "富田米，50磅装",
        description_en: "Tomita rice, 50 lb",
        price: "$35",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 62,
        name_zh: "寿司手套 (日本 50只)",
        name_en: "Sushi Gloves (Japan 50PC)",
        description_zh: "日本进口寿司专用手套，每袋50只，卫生安全",
        description_en: "Imported Japanese sushi gloves, 50 pieces per bag, hygienic and safe",
        price: "$3.95 / BAG",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 63,
        name_zh: "A级姜片",
        name_en: "Ginger Grade A",
        description_zh: "A级优质姜片，口感辛辣，适合搭配寿司",
        description_en: "Grade A premium ginger slices, spicy flavor, perfect with sushi",
        price: "$22 / 桶",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 64,
        name_zh: "山型分隔片 1号",
        name_en: "Baran Type 1",
        description_zh: "日式山型分隔片，1号规格，用于寿司摆盘",
        description_en: "Japanese mountain-shaped divider, type 1, for sushi presentation",
        price: "$3.75 / BOX",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 65,
        name_zh: "米饭粉 (Miola)",
        name_en: "Miola Rice Powder",
        description_zh: "Miola牌米饭粉，用于制作寿司饭，口感更佳",
        description_en: "Miola brand rice powder, for making sushi rice, better texture",
        price: "$35 / 瓶",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 66,
        name_zh: "日式高汤粉 (Hondashi)",
        name_en: "Hondashi Japanese Flavor",
        description_zh: "日本Hondashi高汤调味料，提鲜增味",
        description_en: "Japanese Hondashi soup seasoning, enhances umami flavor",
        price: "$19.50 / BAG",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 67,
        name_zh: "鳗鱼酱 (KB23)",
        name_en: "Eel Sauce (KB23)",
        description_zh: "优质鳗鱼酱，口感香甜，适合搭配鳗鱼料理",
        description_en: "Premium eel sauce, sweet and savory flavor, perfect with eel dishes",
        price: "$60",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 68,
        name_zh: "味噌",
        name_en: "Miso",
        description_zh: "日式味噌，口感醇厚，适合制作味噌汤和日式料理",
        description_en: "Japanese miso paste, rich flavor, perfect for miso soup and Japanese cuisine",
        price: "$55 / 箱",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 69,
        name_zh: "天妇罗粉 (日清)",
        name_en: "Tempurako (Nisshin)",
        description_zh: "日清牌天妇罗粉，制作天妇罗专用，口感酥脆",
        description_en: "Nisshin brand tempura powder, for making tempura, crispy texture",
        price: "市场价",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 70,
        name_zh: "天妇罗粉 (加拿大)",
        name_en: "Tempurako (Canada)",
        description_zh: "加拿大产天妇罗粉，品质优良，价格实惠",
        description_en: "Canadian tempura powder, excellent quality, affordable price",
        price: "$46 / BOX",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 71,
        name_zh: "米醋 (白菊)",
        name_en: "Rice Vinegar (Shiragiku)",
        description_zh: "白菊牌米醋，口感清爽，适合制作寿司醋饭",
        description_en: "Shiragiku brand rice vinegar, refreshing taste, perfect for sushi rice",
        price: "$50",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 72,
        name_zh: "味醂",
        name_en: "Mirin",
        description_zh: "日式味醂，甜味调料，用于日式料理调味",
        description_en: "Japanese mirin, sweet cooking wine, for Japanese cuisine seasoning",
        price: "$36",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 73,
        name_zh: "纸卷 (50粒/箱)",
        name_en: "Paper Roll (50 pieces/box)",
        description_zh: "寿司用纸卷，每箱50粒，方便使用",
        description_en: "Sushi paper roll, 50 pieces per box, convenient to use",
        price: "$52",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 74,
        name_zh: "日本汽水",
        name_en: "Japanese Soda",
        description_zh: "日本进口汽水，口感清爽，适合日式餐厅",
        description_en: "Imported Japanese soda, refreshing taste, perfect for Japanese restaurants",
        price: "$160",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 75,
        name_zh: "酱油杯 (1.5/2盎司 2000套)",
        name_en: "Soy Sauce Cups (1.5/2 OZ 2000 sets)",
        description_zh: "日式酱油杯，1.5盎司/2盎司两种规格，每套2000个",
        description_en: "Japanese soy sauce cups, 1.5 oz / 2 oz sizes, 2000 sets",
        price: "$78",
        category: "supply",
        image: null,
        created_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(existingData);
};

// 获取所有产品
const getAllProducts = (language = "zh") => {
  try {
    const products = initializeDefaultProducts();
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error("获取产品失败:", error);
    return {
      success: false,
      data: [],
      message: "获取产品数据失败",
    };
  }
};

// 根据分类获取产品
const getProductsByCategory = (category, language = "zh") => {
  try {
    const products = initializeDefaultProducts();
    const filteredProducts =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    return {
      success: true,
      data: filteredProducts,
    };
  } catch (error) {
    console.error("获取分类产品失败:", error);
    return {
      success: false,
      data: [],
      message: "获取分类产品数据失败",
    };
  }
};

// 根据ID获取产品
const getProductById = (id, language = "zh") => {
  try {
    const products = initializeDefaultProducts();
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      return {
        success: true,
        data: product,
      };
    }
    return {
      success: false,
      data: null,
      message: "产品不存在",
    };
  } catch (error) {
    console.error("获取产品失败:", error);
    return {
      success: false,
      data: null,
      message: "获取产品数据失败",
    };
  }
};

// 将文件转换为Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 添加产品
const addProduct = async (productData, apiKey) => {
  try {
    const products = initializeDefaultProducts();
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    let imageData = null;
    if (productData.image instanceof File) {
      imageData = await fileToBase64(productData.image);
    } else if (productData.image) {
      imageData = productData.image;
    }

    const newProduct = {
      id: newId,
      name_zh: productData.name_zh || "",
      name_en: productData.name_en || "",
      description_zh: productData.description_zh || "",
      description_en: productData.description_en || "",
      price: productData.price || "",
      category: productData.category || "fresh",
      image: imageData,
      created_at: new Date().toISOString(),
    };

    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

    return {
      success: true,
      data: newProduct,
      message: "产品添加成功",
    };
  } catch (error) {
    console.error("添加产品失败:", error);
    return {
      success: false,
      message: "添加产品失败: " + error.message,
    };
  }
};

// 更新产品
const updateProduct = async (id, productData, apiKey) => {
  try {
    const products = initializeDefaultProducts();
    const index = products.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        message: "产品不存在",
      };
    }

    let imageData = products[index].image;
    if (productData.image instanceof File) {
      imageData = await fileToBase64(productData.image);
    } else if (productData.image) {
      imageData = productData.image;
    }

    const updatedProduct = {
      ...products[index],
      name_zh:
        productData.name_zh !== undefined
          ? productData.name_zh
          : products[index].name_zh,
      name_en:
        productData.name_en !== undefined
          ? productData.name_en
          : products[index].name_en,
      description_zh:
        productData.description_zh !== undefined
          ? productData.description_zh
          : products[index].description_zh,
      description_en:
        productData.description_en !== undefined
          ? productData.description_en
          : products[index].description_en,
      price:
        productData.price !== undefined
          ? productData.price
          : products[index].price,
      category:
        productData.category !== undefined
          ? productData.category
          : products[index].category,
      image: imageData,
    };

    products[index] = updatedProduct;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

    return {
      success: true,
      data: updatedProduct,
      message: "产品更新成功",
    };
  } catch (error) {
    console.error("更新产品失败:", error);
    return {
      success: false,
      message: "更新产品失败: " + error.message,
    };
  }
};

// 删除产品
const deleteProduct = async (id, apiKey) => {
  try {
    const products = initializeDefaultProducts();
    const filteredProducts = products.filter((p) => p.id !== parseInt(id));

    if (filteredProducts.length === products.length) {
      return {
        success: false,
        message: "产品不存在",
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));

    return {
      success: true,
      message: "产品删除成功",
    };
  } catch (error) {
    console.error("删除产品失败:", error);
    return {
      success: false,
      message: "删除产品失败: " + error.message,
    };
  }
};

// 产品相关API
export const productAPI = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

// 系统相关API（保留接口兼容性）
export const systemAPI = {
  healthCheck: async () => {
    return {
      success: true,
      message: "系统运行正常",
    };
  },
};

// 错误处理函数（保留接口兼容性）
export const handleAPIError = (error) => {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "网络连接失败，请检查网络连接";
  }

  if (error.message.includes("401")) {
    return "未授权访问，请检查API密钥";
  }

  if (error.message.includes("404")) {
    return "请求的资源不存在";
  }

  if (error.message.includes("500")) {
    return "服务器内部错误，请稍后重试";
  }

  return error.message || "未知错误";
};

// 图片URL处理 - 纯前端版本
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return null; // 返回null，让组件处理占位符
  }

  // 如果是Base64图片数据，直接返回
  if (typeof imagePath === "string" && imagePath.startsWith("data:")) {
    return imagePath;
  }

  // 如果是完整URL，直接返回
  if (typeof imagePath === "string" && imagePath.startsWith("http")) {
    return imagePath;
  }

  // 如果是相对路径，尝试从public目录加载
  if (typeof imagePath === "string" && imagePath.startsWith("/")) {
    return imagePath;
  }

  // 其他情况返回null
  return null;
};

export default {
  productAPI,
  systemAPI,
  handleAPIError,
  getImageUrl,
};
