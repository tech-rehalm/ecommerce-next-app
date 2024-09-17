import React from 'react'
import {
    IconHome,
    IconShoppingBagCheck,
    IconShoppingCart,
    IconShoppingBagDiscount,
    IconHeart
  } from "@tabler/icons-react";
import { getSession } from '@/lib/getSession';

export default async function NavLinks() {
    const session = await getSession();
    const user = session?.user;
    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-purple-600" />
          ),
          href: "/",
        },
    
        {
          title: "Shop",
          icon: (
            <IconShoppingBagCheck className="h-full w-full text-purple-600" />
          ),
          href: "/shop",
        },
        {
          title: "Promotion",
          icon: (
            <IconShoppingBagDiscount className="h-full w-full text-purple-600" />
          ),
          href: "/promotion",
        },
        {
          title: "Favourites",
          icon: (
            <IconHeart className="h-full w-full text-purple-600" />
          ),
          href: "/favourites",
        },
        {
          title: "Cart",
          icon: (
            <IconShoppingCart className="h-full w-full text-purple-600" />
          ),
          href: "/cart",
        }
        
      ];
  return (
    <div>
      
    </div>
  )
}
