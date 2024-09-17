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
    category: Category; // Updated to be an object with name property
    description: string;
    reviews: Review[];
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    createdAt: string; // ISO date string
  }
  