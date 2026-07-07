import type {
  NavLink,
  Flavour,
  StandardItem,
  IncludingItem,
  Partner,
  FranchisePartner,
  ChatBubble,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Company", href: "#company" },
  { label: "Products", href: "#products" },
];

export const flavours: Flavour[] = [
  {
    id: "mango",
    name: "Mango",
    accent: "text-[var(--color-mango)]",
    bg: "bg-[var(--color-mango-bg)]",
    scoop: "#FFB347",
    image: "/flavour-mango.png",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    accent: "text-[var(--color-navy)]",
    bg: "bg-[var(--color-strawberry-bg)]",
    scoop: "#F1495A",
    image: "/flavour-strawberry.png",
  },
  {
    id: "lemon",
    name: "Lemon",
    accent: "text-[var(--color-lemon)]",
    bg: "bg-[var(--color-lemon-bg)]",
    scoop: "#FFE066",
    image: "/flavour-lemon.png",
  },
  {
    id: "blue-raspberry",
    name: "Blue Raspberry",
    accent: "text-[var(--color-blueraspberry)]",
    bg: "bg-[var(--color-blueraspberry-bg)]",
    scoop: "#4FC3E8",
    image: "/flavour-blue-raspberry.png",
  },
];

export const chatBubbles: ChatBubble[] = [
  {
    id: "italian-ice",
    question: "Have you ever had Italian Ice?",
    answer: "Most likely!",
    align: "right",
  },
  {
    id: "in-a-cone",
    question:
      "Have you ever had your Italian Ice / shave ice / Dole Whip / FroYo in a cone?",
    answer: "No chance!",
    align: "left",
  },
];

export const standards: StandardItem[] = [
  {
    id: "kosher",
    icon: "UtensilsCrossed",
    title: "Kosher",
    description:
      "Certified kosher to meet the highest standards of dietary purity.",
  },
  {
    id: "halal",
    icon: "BadgeCheck",
    title: "Halal",
    description: "Prepared in strict accordance with Halal compliance guidelines.",
  },
  {
    id: "gluten-free",
    icon: "WheatOff",
    title: "Gluten-Free",
    description: "Safe for individuals with celiac disease or gluten sensitivities.",
  },
  {
    id: "vegan",
    icon: "Leaf",
    title: "Vegan",
    description: "100% free from animal products, dairy, and animal byproducts.",
  },
  {
    id: "tree-free",
    icon: "TreeDeciduous",
    title: "Tree-Free",
    description: "Packed using sustainable, eco-friendly packaging materials.",
  },
  {
    id: "nut-free",
    icon: "ShieldOff",
    title: "Nut-Free",
    description: "Safe for schools and individuals with severe nut allergies.",
  },
  {
    id: "plant-based",
    icon: "Sprout",
    title: "Plant Based",
    description: "Crafted entirely from wholesome, plant-derived ingredients.",
  },
  {
    id: "made-in-usa",
    icon: "Flag",
    title: "Made in the USA",
    description: "Proudly manufactured locally right here in Pennsylvania.",
  },
];

export const includingAlso: IncludingItem[] = [
  {
    id: "shelf-stable",
    title: "Shelf Stable / Ambient / Freezer-Safe",
    description: "Store at room temperature or keep frozen without losing quality.",
  },
  {
    id: "stays-soft",
    title: "Stays Soft When Frozen Filled",
    description: "Maintains a smooth, scoopable texture straight out of the freezer.",
  },
  {
    id: "wont-crack",
    title: "Won't Crack / Break During Transit",
    description: "Engineered with durable, high-impact materials for safe shipping.",
  },
  {
    id: "buddy-system",
    title: "\u2018Buddy System\u2019 #2 Sleeves Included",
    description: "Comes equipped with convenient matching sleeves for easy handling.",
  },
];

export const distributorPartners: Partner[] = [
  {
    id: "sunset-slush",
    name: "Sunset Slush - Wholesale (North Carolina & South Carolina)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "philly-water-ice",
    name: "Philadelphia Water Ice Factory - Wholesale (Pennsylvania)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "southwest-traders",
    name: "Southwest Traders, Inc. (California)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "instantwhip-ny",
    name: "InstantWhip Foods (Rochester NY)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "instantwhip-pa",
    name: "InstantWhip Foods (Pennsylvania)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "cedar-crest",
    name: "Cedar Crest Dairy Inc. (Michigan & Indiana)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "hill-markes",
    name: "Hill & Markes, Proudly Part of BradyPLUS (New York & Vermont)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "tampa-bay",
    name: "Tampa Bay Ice Cream (Florida)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "tpc-food",
    name: "TPC Food Service (Ohio & surrounding states)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "la-tiendita",
    name: "La Tiendita Confectionery Essentials (Texas)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "dfs-hospitality",
    name: "DFS Hospitality (Florida)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
  {
    id: "regional-distributors",
    name: "Regional Distributors / Imperial Dade (New York / Amazon)",
    phone: "910-619-7724",
    email: "info@sunsetslush.com",
  },
];

export const franchisePartners: FranchisePartner[] = [
  { id: "fp-1", name: "Logoipsum", color: "#023525" },
  { id: "fp-2", name: "Logoipsum", color: "#033CCE" },
  { id: "fp-3", name: "Logoipsum", color: "#2C4CFD" },
  { id: "fp-4", name: "Logoipsum", color: "#6BDA0A" },
  { id: "fp-5", name: "Logoipsum", color: "#FF3902" },
  { id: "fp-6", name: "Logoipsum", color: "#3902FF" },
  { id: "fp-7", name: "Logoipsum", color: "#FF500B" },
  { id: "fp-8", name: "Logoipsum", color: "#FF1616" },
];

export const footerLinks: string[][] = [
  ["About Us", "Case Studies"],
  ["Products", "News"],
  ["For Partners", "Careers"],
  ["Marketing Partners", "Contact"],
];
