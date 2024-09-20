import { create } from 'zustand';
import { createCartSlice } from './cart-slice';
import { CartSlice, CartProduct } from '@/types';

// Load initial cart state from localStorage
const loadCartState = (): CartProduct[] => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Save cart state to localStorage
const saveCartState = (products: CartProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(products));
};

export const useAppStore = create<CartSlice>((set, get, store) => ({
  ...createCartSlice(set, get, store), // Pass all three arguments
  products: loadCartState(), // Initialize products from localStorage
  setProducts: (products: CartProduct[]) => {
    set({ products });
    saveCartState(products); // Save products to localStorage whenever they change
  },
}));
