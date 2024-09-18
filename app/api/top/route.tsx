import connectDB from "@/lib/db";
import Product from "@/models/ProductModel"
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB()
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4)
        return NextResponse.json(products)
        
      } catch (error) {
        return new NextResponse("failed to fetch products")
        
      }
}