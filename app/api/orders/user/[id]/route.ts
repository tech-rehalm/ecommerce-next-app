import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/orderModel";
import { ObjectId } from "mongodb"; // Import ObjectId for type checking

// Handle GET request to retrieve all orders for a specific user
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    // Validate the user ID
    const userId = params.id

    // Find orders associated with the user ID
    // const orders = await Order.find({ user: userId }).populate('user orderItems.product');
    const order = await Order.find({ user: userId }).populate('user orderItems.product').sort({ createdAt: -1 }).limit(1)

    // If no orders found, return a message
    if (order.length === 0) {
      return NextResponse.json({ message: "No orders found for this user." }, { status: 404 });
    }

    return NextResponse.json({ order}, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
