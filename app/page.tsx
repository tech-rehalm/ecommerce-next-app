"use client";

import AdminLayout from '@/components/AdminLayout';
import { Promo } from '@/components/Promo';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';

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
  const [newproducts, setNewProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [top, setTop] = useState<Product[]>([]);

  useEffect(() => {
    fetchTopProducts();
    fetchNewproducts();
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await fetch('/api/top');
      const data = await response.json();
      setTop(data);
      console.log(data);
      
    } catch (error) {
      toast.error("Failed to fetch top");
    }
  };
  const fetchNewproducts = async () => {
    try {
      const response = await fetch('/api/new');
      const data = await response.json();
      setNewProducts(data);

    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  

  return (
    <div className='flex flex-col bg-gray-200'>
      <div className="flex items-center w-full pl-8 py-4 shadow-lg shadow-gray-400">
        <img src="/logo.svg" alt="logo" />
        
        <h1 className="text-xl font-bold text-blue-600">Envy Car Sales</h1>
      </div>

      <div className="flex  bg-gray-100 m-10 items-center justify-between rounded-xl shadow-lg">
      <div className="text-xl flex flex-col pl-5">
        <div className="text-transparent bg-gradient-to-br from-purple-600 to-[aqua] bg-clip-text text-[100px] py-12 font-extrabold p-2 ">Envy</div>
        <h1 className="text-transparent bg-gradient-to-br from-purple-600 to-[aqua] bg-clip-text text-5xl my-5 font-extrabold main-title">Get your fancy car now</h1>
        <h1 className="text-transparent bg-gradient-to-br from-purple-600 to-[aqua] bg-clip-text text-2xl font-extrabold main-title">Order now and get 5% discount on your car</h1>
        <Link href="/shop" className='bg-gradient-to-br from-purple-600 to-[aqua]  w-[200px] text-white font-extrabold border-none p-2 rounded-xl my-3'>Go to shop</Link>
      </div>
      
        <Promo/>
      </div>
      
      <div className="relative w-full min-h-screen  p-10 font-bold">

        <div className="text-6xl  font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text mb-2 py-3 text-transparent main-title inline">
          Our new Products
        </div>

        <div className="w-full flex flex-wrap p-6 gap-5 items-center justify-evenly mx-auto ">
          {newproducts?.map((product) => (
            <div key={product._id} className='bg-purple-300 flex flex-col w-[270px] p-3 rounded-xl'>
              <div className=' overflow-hidden h-[160px]'>
                <img src={product.image} alt={product.name}  className='rounded-xl h-full'/>
              </div>
              <h1
                className=" text-purple-600 border-none font-bold rounded-xl my-3  "
              >
                {product.name}
              </h1>
              <h1 className="text-sm font-bold text-gray-700">5 star rated</h1><br />
              <div className=" w-full flex gap-2 font-bold my-1 text-[gold]">
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarHalfFilled/>
              </div>
              <Link href={`/product/${product._id}`} className="w-full text-white p-2 rounded-xl text-sm bg-gradient-to-br font-extrabold text-center from-purple-600 to-[aqua]">View product</Link>
            </div>
          ))}
        </div>

        <div className="text-6xl  font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text mb-2 py-3 text-transparent main-title inline">
          Our top Products
        </div>

        <div className="w-full flex flex-wrap p-6 gap-5 items-center justify-evenly mx-auto ">
          {top?.map((product) => (
            <div key={product._id} className='bg-purple-300 flex flex-col w-[270px] p-3 rounded-xl'>
              <div className=' overflow-hidden h-[160px]'>
                <img src={product.image} alt={product.name}  className='rounded-xl h-full'/>
              </div>
              <h1
                className=" text-purple-600 border-none font-bold rounded-xl my-3  "
              >
                {product.name}
              </h1>
              <h1 className="text-sm font-bold text-gray-700">5 star rated</h1><br />
              <div className=" w-full flex gap-2 font-bold my-1 text-[gold]">
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarFilled/>
                <IconStarHalfFilled/>
              </div>
              <Link href={`/product/${product._id}`} className="w-full text-white p-2 rounded-xl text-sm bg-gradient-to-br font-extrabold text-center from-purple-600 to-[aqua]">View product</Link>
            </div>
          ))}
        </div>


        

        
      </div>
    </div>
  );
}
