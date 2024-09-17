"use client";

import AdminLayout from '@/components/AdminLayout';
import { Promo } from '@/components/Promo';
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
    <div className='flex flex-col bg-gray-200'>
      <Promo/>
      <div className="relative w-full min-h-screen  p-10 font-bold">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent">
          Products by Category
        </div>

        {categories.map(category => (
          <section key={category._id} className="mb-8">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4">
              {category.name}
            </div>
            <div className="flex flex-wrap gap-5">
              {productsByCategory[category._id]?.map(product => (
                <div key={product._id} className="p-3 border m-3 rounded-xl shadow-md w-[250px] bg-white">
                  <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover rounded-t-xl" />
                  <div className="p-2">
                    <div className="text-lg font-bold">{product.name}</div>
                    <div className="text-sm">{product.model}</div>
                    <div className="text-sm">Price: ${product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
