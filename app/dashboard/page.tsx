import React from 'react'
import { getSession } from "@/lib/getSession";
import {Nav} from "@/components/Nav"
import AdminLayout from "@/components/AdminLayout"
import { redirect } from 'next/navigation';
export default async function page() {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/login");
  console.log(user);

  return (
    <AdminLayout className='w-full min-h-screen '>
      <div className="text-blue-500">Hello </div>
    </AdminLayout>
  )
}
