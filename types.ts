// types.ts

export interface Category {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  model: string;
  category: Category; // Category object with name property
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt: string; // ISO date string
}

export type CartProduct = Product & { quantity: number };

// User slice type
export interface UserSlice {
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string }) => void;
  resetUser: () => void;
}

// Cart slice type (for future integration)
export interface CartSlice {
  products: CartProduct[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}

// Combined store type
export type Store = CartSlice; // Include CartSlice if needed
