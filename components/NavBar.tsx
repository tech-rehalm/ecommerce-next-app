"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  IconShoppingCart,
  IconHome,
  IconShoppingBagCheck,
} from "@tabler/icons-react"
import { toast } from 'react-toastify';
import { logOut } from '@/action/user';
import { useAppStore } from '@/store/store';


export default function NavBar() {
  const [session, setSession] = useState<any>(null);
  const { products} = useAppStore();
  const fetchSession = async () => {
    const res = await fetch('/api/session');
    if (!res.ok) throw new Error('Failed to fetch session');
    const data = await res.json();
    return data.session || null;
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
  const links = [
    {
      title: "Home",
      href: "/",
    },
 
    {
      title: "Shop",
      href: "/shop",
    },
  
  ];
  return (
    <div className='w-full h-[80px] flex items-center justify-center  shadow-xl font-bold fixed top-0 z-50 p-3 text-purple-600'>
      <div className="w-full h-full  bg-gray-200 rounded-2xl flex items-center justify-between">
        <div className="flex items-center  w-[300px]">
            <img src="/logo.svg" alt="logo" />
            <h1 className="font-bold text-2xl ">Envy Car Sales</h1>
        </div>
        <div className="flex items-center justify-evenly ">
            <div className="flex items-center">
              {links.map((link)=>(
                <Link href={link.href} key={link.href} className="text-lg transition duration-500 hover:scale-125 py-2 px-4 mx-2">{link.title}</Link>
              ))}
              <Link href="/cart" className='text-lg relative w-[50px] h-[40px] ' >
                <IconShoppingCart className='font-bold transition duration-500 hover:scale-125 mt-2' />
                <p className="text-sm font-semibold absolute top-0 rounded-full  right-1 text-purple-900  text-center border w-5 border-purple-600">{products?.length}</p>
              </Link>
            </div>
            <div className="flex items-center">
              
              {session?.user.role === "admin" &&(
                <div className="flex items-center">
                  <Link className='py-2 transition duration-500 hover:scale-125 text-lg px-3 mx-3'  href="/dashboard">Dashboard</Link>
                </div>
              )}
              {session?.user &&(
                <div className='flex items-center'>
                  <Link className='py-2 transition duration-500 hover:scale-125 text-lg px-3 mx-3' href={`/profile/${session?.user._id}`}>Profile</Link>
                </div>
              )}
              {!session?.user &&(
                <div className="flex items-center">
                <Link className='py-2 transition duration-500 hover:scale-125 text-lg px-3 mx-3'  href="/register">Register</Link>
                <Link className='py-2 transition duration-500 hover:scale-125 text-lg px-3 mx-3'  href="/login">Login</Link>
              </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}
