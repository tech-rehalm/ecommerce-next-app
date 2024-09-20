"use client";

import AdminLayout from '@/components/AdminLayout';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  model: string;
  category: Category;
  description: string;
  reviews: any[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products as Product[]);
      categorizeProducts(data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const categorizeProducts = (products: Product[]) => {
    const categorized: { [key: string]: Product[] } = {};
    products.forEach(product => {
      const categoryId = product.category._id;
      if (!categorized[categoryId]) {
        categorized[categoryId] = [];
      }
      categorized[categoryId].push(product);
    });
    setProductsByCategory(categorized);
  };

  return (
    <AdminLayout className='mt-[80px]'>
      Hello there
    </AdminLayout>
  );
}
