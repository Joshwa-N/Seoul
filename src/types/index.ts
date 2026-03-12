export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  description: string;
  features?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: Record<string, string>;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  color: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}
