"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use useParams from next/navigation
import AdminLayout from '@/components/AdminLayout';

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

const OrderDetailPage = () => {
  const { id } = useParams(); // Get the id from useParams
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return; // Avoid fetching if id is not available

      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await res.json();
        setOrder(data.order);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AdminLayout>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div className="border p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Order ID: {order?._id}</h2>
          <p><strong>User:</strong> {order?.user.name} ({order?.user.email})</p>
          <p><strong>Total Price:</strong> ${order?.totalPrice.toFixed(2)}</p>
          <p><strong>Shipping Address:</strong></p>
          <p>{order?.shippingAddress.address}</p>
          <p>{order?.shippingAddress.city}, {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}</p>
          <p><strong>Status:</strong> {order?.isPaid ? 'Paid' : 'Not Paid'}</p>
        </div>
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <ul className="list-disc pl-5">
          {order?.orderItems.map(item => (
            <li key={item.product.name}>
              {item.quantity} x {item.product.name} - ${item.product.price.toFixed(2)} each
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default OrderDetailPage;
