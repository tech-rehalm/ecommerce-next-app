"use client"

import AdminLayout from '@/components/AdminLayout'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const [products, setProducts] = useState<Product[]>([]);
    interface Product {
        _id: string;
        name: string;
        image: string;
        model: string;
        description: string;
        reviews: any[];
        rating: number;
        numReviews: number;
        price: number;
        countInStock: number;
      }

    const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          const data = await response.json();
          setProducts(data.products as Product[]);
        } catch (error) {
          toast.error("Failed to fetch products");
        }
      };

      useEffect(() => {
        fetchProducts();
      }, []);

  return (
    <AdminLayout>
        <div className='flex flex-wrap'>
        {products.map((product) => (
            <div key={product._id} className="p-3  border m-3 rounded-xl shadow-md w-[250px]">
              <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover rounded-t-xl" />
              <div className="p-2">
                <div className="text-lg font-bold ">{product.name}</div>
                <div className="text-sm">{product.model}</div>
                <div className="text-sm">Price: ${product.price}</div>
                <button
                  className="mt-2 p-2 bg-purple-600 text-white w-full rounded-xl font-extrabold"
                >
                  Promote
                </button>
              </div>
            </div>
          ))}
        </div>
    </AdminLayout>
  )
}
