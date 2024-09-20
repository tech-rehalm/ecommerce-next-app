import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Order from "@/models/orderModel"; // Adjust the import as needed

// Handle GET request to retrieve a single order by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const orderId = params.id;

    // Fetch the order by ID and populate relevant fields
    const order = await Order.findById(orderId).populate('user orderItems.product');
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
      const { paymentResults, isPaid } = await req.json();
  
      const order = await Order.findByIdAndUpdate(
        params.id,
        {
          paymentResults,
          isPaid,
          paidAt: isPaid ? new Date() : null, // Set paidAt if isPaid is true
        },
        { new: true }
      );
  
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
  
      return NextResponse.json({ order }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }