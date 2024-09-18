import React from 'react'

export default function Loader() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-300">
      <section className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-4 p-5">
          <div className="bg-purple-600 w-8 h-8 rounded-full animate-load" style={{ animationDelay: '0.3s' }}></div>
          <div className="bg-purple-600 w-8 h-8 rounded-full animate-load" style={{ animationDelay: '0.4s' }}></div>
          <div className="bg-purple-600 w-8 h-8 rounded-full animate-load" style={{ animationDelay: '0.5s' }}></div>
          <div className="bg-purple-600 w-8 h-8 rounded-full animate-load" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </section>
    </div>
  )
}
