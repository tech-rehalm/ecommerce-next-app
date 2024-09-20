import { StateCreator } from 'zustand';
import { CartSlice, CartProduct, Product } from '@/types';

const calculateTotal = (products: CartProduct[]): number => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
};

// Function to save cart to localStorage
const saveCartToLocalStorage = (products: CartProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(products));
};

// Function to load cart from localStorage
const loadCartFromLocalStorage = (): CartProduct[] => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

export const createCartSlice: StateCreator<CartSlice> = (set, get) => {
    const initialProducts = loadCartFromLocalStorage(); // Load initial state from localStorage

    return {
        products: initialProducts,
        total: calculateTotal(initialProducts), // Calculate total based on loaded products
        addToCart: (product: Product) => set((state) => {
            const existingProduct = state.products.find(item => item._id === product._id);
            let updatedProducts;

            if (existingProduct) {
                updatedProducts = state.products.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedProducts = [...state.products, { ...product, quantity: 1 }];
            }

            // Save updated products to localStorage
            saveCartToLocalStorage(updatedProducts);

            return { 
                products: updatedProducts, 
                total: calculateTotal(updatedProducts) 
            };
        }),
        removeFromCart: (productId: string) => set((state) => {
            const updatedProducts = state.products.filter(item => item._id !== productId);
            
            // Save updated products to localStorage
            saveCartToLocalStorage(updatedProducts);

            return { 
                products: updatedProducts, 
                total: calculateTotal(updatedProducts) 
            };
        }),
        setTotal: (total) => set({ total }),
        reset: () => {
            localStorage.removeItem('cart'); // Clear cart from localStorage
            set({ products: [], total: 0 });
        },
    };
};
