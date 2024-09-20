"use client";

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/store'; // Import your store
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useRouter } from 'next/navigation';


const PlaceOrderPage = () => {
  const { products, total, reset } = useAppStore();
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const fetchSession = async () => {
    const res = await fetch('/api/session');
    if (!res.ok) throw new Error('Failed to fetch session');
    const data = await res.json();
    return data.session || null;
  };

  const handlePlaceOrder = async () => {
    if (!session) {
      toast.error("User session not found!");
      return;
    }

    const orderDetails = {
      user: session.user.id,
      orderItems: products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        product: product._id,
      })),
      paymentResults:{
        status: "not paid"
      },
      shippingAddress: {
        address: "123 Example St", // Replace with real shipping details
        city: "Sample City",
        postalCode: "12345",
        country: "Sample Country",
      },
      itemsPrice: total,
      shippingPrice: 5.0, // Set shipping price as needed
      totalPrice: total + 5.0, // Adjust total based on shipping
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        toast.error(error.message)
      }

      const data = await res.json();
      toast.success("Order placed successfully!");
      router.push('/checkout'); // Redirect to home or another page
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const amount = total

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await fetchSession();
        setSession(userSession);
      } catch (error:any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='bg-gray-200 w-full min-h-screen flex flex-col items-center mt-[80px]'>
      <ToastContainer />
      <h1 className="text-4xl font-extrabold p-4 mt-10 bg-gradient-to-r from-fuchsia-700 to-blue-600 bg-clip-text text-transparent">
        Review Your Order
      </h1>
      <div className="w-full max-w-2xl p-5 mt-5 bg-white rounded-xl shadow-lg">
        {products.map(product => (
          <div key={product._id} className="flex justify-between items-center p-3 border-b">
            <div>
              <p className="text-xl font-bold text-purple-700">{product.name}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
            </div>
            <p className="text-lg text-purple-500">${(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center p-3 border-t mt-4">
          <h2 className="text-2xl font-bold">Total</h2>
          <p className="text-2xl text-purple-700">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-5 w-full p-3 bg-gradient-to-r from-fuchsia-700 to-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
      
    </div>
  );
};

export default PlaceOrderPage;
