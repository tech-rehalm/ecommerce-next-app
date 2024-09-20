"use client"

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Loader from '@/components/Loader';
import Link from 'next/link';

interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await res.json();
        setOrders(data.orders);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader/>
  if (error) return <div className='w-full min-h-screen flex items-center justify-center text-3xl font-extrabold text-purple-700'>Error: {error}</div>;

  return (
    <AdminLayout>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        {orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <table className="min-w-full border border-gray-300 bg-gray-100">
            <thead>
              <tr className="bg-gray-200 font-extrabold text-purple-700">
                <th className="p-2">Order ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Shipping Address</th>
                <th className="p-2">Status</th>
                <th className="p-2">Order Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className='text-gray-500'>
                  <td className="p-2 bg-gray-200 "><Link href={`/dashboard/orders/${order._id}`}>{order._id}</Link></td>
                  <td className="p-2 bg-gray-200 ">{order.user.name} ({order.user.email})</td>
                  <td className="p-2 bg-gray-200 ">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-2 bg-gray-200 ">
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </td>
                  <td className="p-2 bg-gray-200 ">{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                  <td className="p-2 bg-gray-200 ">
                    <ul>
                      {order.orderItems.map(item => (
                        <li key={item.product.name}>
                          {item.quantity} x {item.product.name} (${(item.product.price * item.quantity).toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
