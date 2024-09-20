"use client";

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/store'; // Import your store
import { AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const CartPage = () => {
  const { products, total, removeFromCart, reset } = useAppStore();
  console.log(products);
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const res = await fetch('/api/session');
    if (!res.ok) throw new Error('Failed to fetch session');
    const data = await res.json();
    return data.session || null;
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await fetchSession();
        setSession(userSession);
      } catch (error:any) {
        toast.error(error.message)
      }
        
    };
    fetchData();
  }, []);

  return (
    <div className='bg-gray-200 w-full min-h-screen mt-[80px]'>
      <div className="w-full p-3 flex mt-10 ">
        <div className="flex flex-col">
        <p className="main-title text-2xl font-extrabold p-2 bg-gradient-to-r from-fuchsia-700 to-blue-600 bg-clip-text text-transparent">{session?.user.role}</p>
        <p className="main-title text-2xl font-extrabold p-2 bg-gradient-to-r from-fuchsia-700 to-blue-600 bg-clip-text text-transparent">{session?.user.email}</p>
        </div>
        <h1 className="main-title text-4xl font-extrabold p-2 bg-gradient-to-r from-fuchsia-700 to-blue-600 bg-clip-text text-transparent">Welcome to your cart</h1>
      </div>
      <div className="flex flex-col mx-10">
        {products?.map((product) => (
          <div key={product._id} className="w-full p-3 my-2 rounded-xl shadow-lg font-bold flex items-center gap-4 bg-white">
            <img src={product.image} alt="" className='h-[100px] object-cover mx-3 rounded-xl' />
            <div className="flex flex-col mx-1">
              <p className="text-2xl text-purple-700 font-extrabold">{product.name}</p>
              <p className="text-xl text-purple-500">Model: {product.model}</p>
            </div>
            <div className="flex flex-col mx-1 text-purple-500">
              <p className="text-xl">Quantity: {product.quantity}</p>
              <p className="text-xl">Price: {product.price}</p>
            </div>
            <p className="lg:w-[30%] text-sm xl:w-[35%] text-gray-500">{product.description}</p>
            <button onClick={() => handleRemove(product._id)} className="ml-auto p-2 text-red-500 hover:text-red-700">
              <AiOutlineDelete size={24} />
            </button>
          </div>
        ))}     
      </div>
    </div>
  );
};

export default CartPage;
