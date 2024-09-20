import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Order from "@/models/orderModel"
import Product from "../../../models/ProductModel"; // Ensure Product model is imported
import { ObjectId } from "mongodb"; // Import ObjectId for type checking

// Handle GET request to retrieve all orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().populate('user orderItems.product');
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle POST request to create a new order
export async function POST(req: Request) {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentResults,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    await connectDB();

    // Validate orderItems
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.quantity < item.quantity) {
        return NextResponse.json({ error: "Product not found or insufficient quantity" }, { status: 400 });
      }
    }

    const order = new Order({
      user: new ObjectId(user), // Ensure user ID is a valid ObjectId
      orderItems,
      shippingAddress,
      paymentResults,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: false, // Assuming new orders are not paid yet
    });

    await order.save();
    return NextResponse.json({ order }, { status: 201 });
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
