import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { Category } from "../../../models/CategoryModel";

// Create a new category
export async function POST(req) {
  try {
    const { name } = await req.json();
    await connectDB();
    const category = new Category({ name });
    await category.save();
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all categories
export async function GET(req) {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a category
export async function PUT(req) {
  try {
    const { id, name } = await req.json();
    await connectDB();
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a category
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectDB();
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
