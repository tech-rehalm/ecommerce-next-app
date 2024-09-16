"use client"

import React from "react";
import { FloatingDock } from "@/components/ui/floating-nav";
import {
    IconBrandFacebook,
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconShoppingBagCheck,
  IconShoppingCart,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export const  Nav=() =>{
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-purple-600" />
      ),
      href: "/",
    },

    {
      title: "Shopping",
      icon: (
        <IconShoppingBagCheck className="h-full w-full text-purple-600" />
      ),
      href: "/shop",
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
    (<div className="flex items-center justify-center absolute right-5 mt-5  p-6 w-full">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-10"
        items={links} />
    </div>)
  );
}
