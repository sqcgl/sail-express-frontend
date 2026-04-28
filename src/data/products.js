import nyfishProducts from "./nyfishProducts.json";

export const productCategories = [
  { id: "all", label: "All" },
  { id: "fresh", label: "Fresh" },
  { id: "frozen", label: "Frozen" },
  { id: "dry", label: "Dry" },
  { id: "supplies", label: "Supplies" },
];

export const productImages = {
  fresh: "/products/fresh-seafood.jpg",
  frozen: "/products/frozen-specialty.jpg",
  dry: "/products/dry-pantry.jpg",
  supplies: "/products/restaurant-supplies.jpg",
};

const sourceGroupsByCategory = {
  fresh: ["fresh-food"],
  frozen: ["frozen-food", "ice-cream"],
  dry: ["dry-food", "sauce", "vegetable"],
  supplies: ["non-food"],
};

const sourceGroupLabels = {
  "fresh-food": "Fresh Food",
  "frozen-food": "Frozen Food",
  "dry-food": "Dry Food",
  "non-food": "Non Food",
  sauce: "Sauce",
  vegetable: "Vegetable",
  "ice-cream": "Ice Cream",
};

const featuredNames = new Set([
  "FLUKE",
  "SPANISH MACKEREL",
  "LIVE UNI",
  "LIVE LOBSTER",
  "KING SALMON",
  "FATTY TUNA",
  "UDON NOODLES",
  "TOBIKO WASABI",
  "MASAGO 4.4LB",
  "KOSHI HIKARI RICE",
]);

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "item";

const buildPack = ({ code, unit }) => [code, unit].filter(Boolean).join(" ");

const makeProductsForGroup = (category, sourceGroup) =>
  (nyfishProducts[sourceGroup]?.products ?? []).map((item, index) => ({
    id: `${category}-${sourceGroup}-${slugify(item.title)}-${index + 1}`,
    name: item.title,
    category,
    subcategory: item.display || sourceGroupLabels[sourceGroup],
    pack: buildPack(item) || "Contact for pack size",
    code: item.code,
    unit: item.unit,
    tags: [category, sourceGroup],
    image: productImages[category],
    sourceGroup,
    sourceGroupLabel: sourceGroupLabels[sourceGroup],
    detailUrl: item.detailUrl,
    sourceImageUrl: item.fullImageUrl,
    thumbnailUrl: item.thumbnailUrl,
    sourcePageUrl: item.sourcePageUrl,
    featured: featuredNames.has(item.title),
  }));

const makeProductsForCategory = (category) =>
  sourceGroupsByCategory[category].flatMap((sourceGroup) =>
    makeProductsForGroup(category, sourceGroup),
  );

export const freshSeafoodProducts = makeProductsForCategory("fresh");
export const frozenProducts = makeProductsForCategory("frozen");
export const dryProducts = makeProductsForCategory("dry");
export const suppliesProducts = makeProductsForCategory("supplies");

export const products = [
  ...freshSeafoodProducts,
  ...frozenProducts,
  ...dryProducts,
  ...suppliesProducts,
];

const seenFeaturedNames = new Set();

export const featuredProducts = products
  .filter((product) => {
    if (!product.featured || seenFeaturedNames.has(product.name)) return false;
    seenFeaturedNames.add(product.name);
    return true;
  })
  .slice(0, 10);

export const whyUsProofPoints = [
  {
    title: "Refrigerated delivery routes",
    copy: "Cold-chain route planning keeps seafood, frozen products, and refrigerated staples aligned with restaurant service timing.",
  },
  {
    title: "One-stop Japanese restaurant wholesale",
    copy: "Restaurants can combine seafood, frozen food, dry goods, sauces, produce, packaging, and daily supplies in one order conversation.",
  },
  {
    title: "New York facility checks",
    copy: "Orders move through receiving, checking, staging, and loading before leaving the New York facility workflow.",
  },
  {
    title: "Broad product mix",
    copy: "The catalog supports recurring kitchen needs across fresh, frozen, dry, sauces, produce, and non-food supply categories.",
  },
  {
    title: "Account support for substitutions",
    copy: "The team helps confirm availability, suggest substitutions, and coordinate route details around the full product list.",
  },
];
