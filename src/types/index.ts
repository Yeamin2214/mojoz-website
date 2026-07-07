export interface NavLink {
  label: string;
  href: string;
}

export interface Flavour {
  id: string;
  name: string;
  accent: string;
  bg: string;
  scoop: string;
  image: string;
  leaf?: boolean;
}

export interface StandardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface IncludingItem {
  id: string;
  title: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface FranchisePartner {
  id: string;
  name: string;
  color: string;
}

export interface ChatBubble {
  id: string;
  question: string;
  answer: string;
  align: "left" | "right";
}
