"use client"

import { getSession } from '@/lib/getSession'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'


const links = [
  {
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    title: "All Products",
    path: "/dashboard/products"
  },
  {
    title: "Customers",
    path: "/dashboard/customers"
  },
  {
    title: "Orders",
    path: "/dashboard/orders"
  },
  {
    title: "Settings",
    path: "/dashboard/settings"
  },
  {
    title: "Categories",
    path: "/dashboard/categories"
  },
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <div className='w-[200px]  text-white text-lg pt-6 pl-5  min-h-screen h-full  flex flex-col  bg-gradient-to-r from-purple-600 to-fuchsia-600 font-[900] bottom-0'>
      {links.map((link)=>(
        <Link  key={link.title} href={link.path} className={`${pathname === link.path? "bg-white text-purple-600 rounded-l-2xl": ""}w-full rounded-l-xl p-4`}>{link.title}</Link>
      ))}
    </div>
  )
}
