import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/ProductModel';
import { Category } from '@/models/CategoryModel';

// Utility function to get id from URL
const getIdFromUrl = (url: string | URL): string | null => {
  const parsedUrl = new URL(url instanceof URL ? url.href : url, `http://dummy`);
  return parsedUrl.pathname.split('/').pop() || null;
};

// Handle GET request for a specific product by ID
export async function GET(req: Request) {
  const id = getIdFromUrl(req.url);
  
  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await connectDB();
    const product = await Product.findById(id).populate('category');
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

// Handle PUT request to update a specific product by ID
export async function PUT(req: Request) {
  const id = getIdFromUrl(req.url);
  
  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const updateData = await req.json();
    await connectDB();
    
    // Check if the category exists
    if (updateData.category) {
      const existingCategory = await Category.findById(updateData.category);
      if (!existingCategory) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

// Handle DELETE request to delete a specific product by ID
export async function DELETE(req: Request) {
  const id = getIdFromUrl(req.url);
  
  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
