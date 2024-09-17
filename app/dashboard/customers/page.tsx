import { fetchAllUsers } from '@/action/user'
import AdminLayout from '@/components/AdminLayout'
import React from 'react'
import {FaUser} from "react-icons/fa"

export default async function page() {
    const users = await fetchAllUsers()
  return (
    <AdminLayout >
      <div className="flex flex-col w-full p-10">
      <div className="text-4xl m-3 p-3 font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text inline my-6 text-transparent">
          All Customers
        </div>
        <div className="w-ful min-h-screen flex flex-wrap">
        {users?.map((user)=>(
          <div className='flex flex-col w-[250px] text-purple-600 items-center justify-center   bg-purple-200 p-3 shadow-lg shadow-purple-300 rounded-xl h-[300px] m-3'>
            <FaUser className='w-[60px] h-[60px] bg-gradient-to-br from-blue-600 to-fuchsia-600 items-center  rounded-[50%] p-5 my-5 text-white shadow-purple-400 shadow-lg'/>
            <div className="text-xl font-extrabold bg-gradient-to-br from-blue-600 to-fuchsia-600 bg-clip-text text-transparent  w-full">Username : {user.firstName}{" "}{user.lastName}</div>
            <div className="text-xl font-extrabold bg-gradient-to-br from-blue-600 to-fuchsia-600 bg-clip-text text-transparent  w-full">User Email:{user.email}</div>
            <div className="text-xl font-extrabold bg-gradient-to-br from-blue-600 to-fuchsia-600 bg-clip-text text-transparent  w-full">User Role  :{user.role}</div>
            </div>
        ))}
      </div>
      </div>
      
    </AdminLayout>
  )
}
