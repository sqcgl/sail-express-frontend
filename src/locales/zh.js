export default {
  // 导航
  nav: {
    home: "首页",
    about: "关于我们",
    products: "产品列表",
    contact: "联系我们",
    inquiry: "立即询价",
    language: {
      zh: "中文",
      en: "English",
    },
  },

  // 首页
  home: {
    hero: {
      title: "专业寿司食材批发",
      subtitle: "为您的餐厅提供最优质的海鲜、食材和器具",
      cta: "立即询价",
      learnMore: "了解更多",
    },
    business: {
      title: "我们的业务",
      subtitle: "专注于为餐饮行业提供优质食材",
    },
    advantages: {
      title: "为什么选择我们",
      quality: "优质保证",
      delivery: "快速配送",
      service: "专业服务",
      price: "优惠价格",
    },
  },

  // 关于我们
  about: {
    title: "关于我们",
    subtitle: "专业的寿司食材批发商",
    story: {
      title: "我们的故事",
      content:
        "Sail Express 成立于2020年，专注于为餐饮行业提供最优质的寿司食材。我们拥有丰富的行业经验和专业的供应链网络。",
    },
    values: {
      title: "我们的价值观",
      quality: "品质至上",
      service: "客户至上",
      integrity: "诚信经营",
      innovation: "持续创新",
    },
  },

  // 产品
  products: {
    title: "我们的产品",
    subtitle: "发现优质的海鲜、食材和器具",
    categories: {
      fresh: "新鲜",
      frozen: "冷冻",
      dry: "干货",
      supply: "器具",
      all: "全部",
    },
    search: "搜索产品...",
    clearFilters: "清空筛选",
    addToInquiry: "添加到询价",
    viewDetails: "查看详情",
    close: "关闭",
    continueBrowsing: "继续浏览",
    loading: "加载中...",
    error: "加载失败",
    retry: "重试",
    noData: "暂无产品数据",
    noResults: "没有找到匹配的产品",
    tryAdjust: "尝试调整搜索条件或分类筛选",
    noDescription: "暂无描述",
    details: "产品详情",
    description: "产品描述",
    productId: "产品编号",
    addToCart: "添加到购物车",
    continueBrowsing: "继续浏览",
    addedToCart: "已添加到购物车！",
    noImage: "暂无图片",
    showing: "显示",
    items: "个产品",
    goToInquiry: "前往询价",
    itemsInCart: "购物车中有 {count} 个商品",
  },

  // 购物车
  cart: {
    title: "选中的产品",
    empty: "暂未选择产品",
    emptyMessage: "请在产品列表中选择您需要的产品",
    items: "种产品",
    removeProduct: "移除产品",
    totalValue: "总价值",
    priceNote: "* 以上价格为参考价格，具体价格请以实际询价为准",
  },

  // 联系我们
  contact: {
    title: "联系我们",
    subtitle: "随时为您提供专业服务",
    form: {
      title: "发送询价",
      name: "姓名",
      namePlaceholder: "请输入您的姓名",
      company: "公司名称",
      companyPlaceholder: "请输入公司名称",
      email: "邮箱地址",
      emailPlaceholder: "请输入邮箱地址",
      phone: "联系电话",
      phonePlaceholder: "请输入10位数字电话号码",
      message: "询价内容",
      messagePlaceholder: "请详细描述您的需求，包括产品名称、数量等",
      submit: "发送询价",
      sending: "发送中...",
      reset: "重置",
      successMessage: "询价提交成功！我们会尽快与您联系。",
      errorMessage: "提交失败，请稍后重试。",
    },
    info: {
      title: "联系方式",
      phone: {
        title: "电话咨询",
        hours: "工作时间：周一至周五 9:00-18:00",
      },
      email: {
        title: "邮箱联系",
        response: "我们会在24小时内回复您的邮件",
      },
      address: {
        title: "公司地址",
        location: "上海市浦东新区XX路XX号",
        visit: "欢迎预约参观我们的仓库",
      },
    },
    promises: {
      title: "服务承诺",
      response: "24小时内回复询价",
      service: "专业团队一对一服务",
      quality: "质量保证，假一赔十",
      delivery: "快速配送，准时到达",
    },
  },

  // 产品管理
  admin: {
    title: "产品管理",
    addProduct: "添加产品",
    editProduct: "编辑产品",
    deleteProduct: "删除产品",
    form: {
      name: "产品名称",
      price: "价格",
      category: "分类",
      description: "产品描述",
      image: "产品图片",
      submit: "提交",
      cancel: "取消",
      update: "更新产品",
    },
    table: {
      id: "ID",
      image: "图片",
      name: "产品名称",
      category: "分类",
      price: "价格",
      description: "描述",
      createdAt: "创建时间",
      actions: "操作",
    },
  },

  // 图片管理
  imageManager: {
    title: "图片管理",
    subtitle: "管理和查看所有产品图片",
    categories: {
      all: "全部图片",
      fresh: "新鲜",
      frozen: "冷冻",
      dry: "干货",
      supply: "器具",
    },
    viewMode: {
      grid: "网格视图",
      list: "列表视图",
    },
    stats: {
      totalImages: "总图片数",
    },
    filter: {
      title: "按分类筛选",
    },
    loading: "正在加载图片数据...",
    refreshing: "刷新中...",
    refresh: "刷新图片列表",
    retry: "重试",
    errors: {
      fetchFailed: "获取产品数据失败",
    },
    noData: {
      title: "暂无图片数据",
      description: "请先在产品管理中添加带图片的产品",
    },
  },

  // API测试
  testAPI: {
    title: "API 连接测试",
    loading: "正在测试API连接...",
    testing: "测试中...",
    retest: "重新测试",
    result: {
      pass: "测试通过",
      fail: "测试失败",
    },
    tests: {
      health: {
        title: "健康检查",
        log: "测试健康检查...",
      },
      products: {
        title: "获取所有产品",
        log: "测试获取所有产品...",
      },
      fresh: {
        title: "获取新鲜类产品",
        log: "测试获取新鲜类产品...",
      },
      singleProduct: {
        title: "获取单个产品",
        log: "测试获取单个产品...",
      },
    },
  },

  // 首页
  home: {
    hero: {
      subtitle: "专业的寿司海鲜餐厅物品批发商，为您的寿司店提供优质食材和器具",
      viewProducts: "查看产品",
      contactUs: "联系我们",
    },
    coreBusiness: {
      title: "我们的核心业务",
      wholesale: {
        title: "产品批发",
        description:
          "提供各类寿司食材、海鲜、调味料和厨房器具的批发服务，价格优惠，品质保证。",
      },
      service: {
        title: "专业服务",
        description:
          "专业的销售团队为您提供一对一服务，从产品选择到配送安排，全程贴心服务。",
      },
      quality: {
        title: "品质保证",
        description:
          "所有产品均经过严格质量检验，确保新鲜度和安全性，让您的寿司店无后顾之忧。",
      },
    },
    featuredProducts: {
      title: "精选产品",
      inquiry: "询价",
      viewAll: "查看全部产品",
      items: [
        { name: "新鲜三文鱼", price: "¥180/kg", category: "海鲜类" },
        { name: "寿司米", price: "¥25/kg", category: "食材类" },
        { name: "海苔", price: "¥15/包", category: "食材类" },
        { name: "寿司刀", price: "¥280/把", category: "器具类" },
      ],
    },
    advantages: {
      title: "为什么选择我们",
      items: [
        { icon: "🚚", title: "快速配送", desc: "24小时内送达" },
        { icon: "💰", title: "价格优势", desc: "批发价格，量大从优" },
        { icon: "🛡️", title: "质量保证", desc: "假一赔十承诺" },
        { icon: "👥", title: "专业团队", desc: "一对一贴心服务" },
      ],
    },
  },

  // 关于我们
  about: {
    hero: {
      title: "关于我们",
      subtitle:
        "Sail Express 是专业的海鲜及日餐食材批发商，致力于为餐厅提供最优质的海鲜和日餐食材。我们拥有丰富的行业经验和专业的服务团队，是您值得信赖的合作伙伴。",
    },
    company: {
      title: "公司简介",
      paragraph1:
        "Sail Express 成立于2020年，总部位于纽约皇后区，专注于为纽约上州、滨州、费城、康州等地区的餐厅提供专业的海鲜及日餐食材批发服务。我们深知日本料理对食材新鲜度和品质的严格要求，因此建立了完善的供应商筛选、品质管控和时间管理体系。",
      paragraph2:
        "经过这几年的发展，我们已成为纽约地区知名的海鲜及日餐食材批发商，为超过200家餐厅提供稳定的食材供应，年营业额超过500万美元。",
      paragraph3:
        "我们的使命是通过专业的海鲜及日餐食材批发服务，帮助每一家餐厅获得最高品质的食材，为顾客提供最地道的料理体验。",
      stats: [
        { number: "200+", label: "餐厅合作伙伴" },
        { number: "1000+", label: "海鲜及日餐食材品类" },
        { number: "3+年", label: "专业经验" },
      ],
      advantages: {
        title: "我们的优势",
        items: [
          "✓ 覆盖纽约上州、滨州、费城、康州等地区的专业配送网络",
          "✓ 严格的海鲜及日餐食材品质管控体系",
          "✓ 配备顶级冷冻设备的专业配送车队",
          "✓ 24小时客户服务支持",
        ],
      },
      serviceArea: {
        title: "服务区域",
      },
    },
    timeline: {
      title: "发展历程",
      items: [
        {
          year: "2020",
          title: "公司成立",
          desc: "在纽约皇后区成立，开始专注海鲜及日餐食材批发",
        },
        {
          year: "2021",
          title: "业务扩张",
          desc: "服务餐厅超过50家，建立专业配送网络",
        },
        {
          year: "2022",
          title: "品质升级",
          desc: "建立完整的品质管控体系，获得客户信赖",
        },
        {
          year: "2023",
          title: "规模发展",
          desc: "服务餐厅超过200家，年营业额突破500万美元",
        },
      ],
    },
    team: {
      title: "核心团队",
      members: [
        {
          name: "Michael Chen",
          position: "创始人 & CEO",
          desc: "拥有10年海鲜及日餐食材行业经验，专注于纽约地区餐厅供应链管理",
        },
        {
          name: "Sarah Johnson",
          position: "采购总监",
          desc: "专业采购师，负责供应商管理和海鲜品质控制",
        },
        {
          name: "David Rodriguez",
          position: "运营总监",
          desc: "负责物流配送和客户服务，确保食材新鲜及时送达",
        },
      ],
    },
    clients: {
      title: "合作客户",
      client: "客户",
      description: "我们与众多知名日餐连锁店和高端海鲜餐厅建立了长期合作关系",
      learnMore: "了解更多客户案例",
    },
  },

  // 通用
  common: {
    loading: "加载中...",
    error: "出错了",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    delete: "删除",
    edit: "编辑",
    save: "保存",
    close: "关闭",
    back: "返回",
    next: "下一步",
    previous: "上一步",
  },

  // 语言切换
  language: {
    zh: "中文",
    en: "English",
    switch: "切换语言",
  },
};
