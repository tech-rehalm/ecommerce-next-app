import Link from 'next/link'
import React from 'react'

export default function notfound() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center gap-5  bg-gray-200 '>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-[aqua] bg-clip-text text-transparent p-4">
        The page you're looking for is not available
      </h1>
      <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-[aqua] bg-clip-text text-transparent underline p-3 shadow-md rounded-xl shadow-purple-600">Go back to home page</Link>
    </div>
  )
}
