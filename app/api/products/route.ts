import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Product from "../../../models/ProductModel";
import { Category } from "../../../models/CategoryModel";

// Handle GET request to retrieve all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().populate('category');
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle POST request to create a new product
export async function POST(req: Request) {
  try {
    const { name, image, model, quantity, category, description, reviews, rating, numReviews, price, countInStock } = await req.json();
    
    await connectDB();

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const product = new Product({
      name, image, model, quantity, category, description, reviews, rating, numReviews, price, countInStock
    });

    await product.save();
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
