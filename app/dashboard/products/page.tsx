"use client"

import AdminLayout from '@/components/AdminLayout';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  model: string;
  category: Category;
  description: string;
  reviews: any[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formMode, setFormMode] = useState<'edit' | 'create'>('create');
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products as Product[]);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get('name'),
      image: imagePreview,
      model: formData.get('model'),
      category: formData.get('category'),
      description: formData.get('description'),
      rating: Number(formData.get('rating')),
      numReviews: Number(formData.get('numReviews')),
      price: Number(formData.get('price')),
      countInStock: Number(formData.get('countInStock'))
    };

    const url = formMode === 'create' ? '/api/products' : `/api/products/${activeProduct?._id}`;
    const method = formMode === 'create' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success(`${formMode === 'create' ? 'Product created' : 'Product updated'} successfully`);
        setActiveProduct(null);
        setFormMode('create');
        fetchProducts();
      } else {
        throw new Error('Failed to process the request');
      }
    } catch (error) {
      toast.error(`${formMode === 'create' ? 'Creating' : 'Updating'} product failed`);
    }
  };

  const handleDelete = async () => {
    if (activeProduct) {
      try {
        const response = await fetch(`/api/products/${activeProduct._id}`, { method: 'DELETE' });
        if (response.ok) {
          toast.success("Product deleted successfully");
          setActiveProduct(null);
          setFormMode('create');
          fetchProducts();
        } else {
          throw new Error('Failed to delete the product');
        }
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full min-h-screen p-10 font-bold">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent">
          {formMode === 'create' ? 'Create Product' : 'Edit Product'}
        </div>

        <form onSubmit={handleSubmit} className='flex flex-wrap gap-5 mt-5'>
          <div>
          <label htmlFor="name" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Product Name'
            required
            defaultValue={activeProduct?.name || ''}
          />
          </div>
          <div>
          <label htmlFor="image" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Product Image
          </label>
          <input
          name='image'
          id='image'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className='rounded-xl text-fuchsia-600 w-[300px] border-none bg-purple-200 font-bold p-2'
          />
          {imagePreview && <img src={imagePreview as string} alt="Preview" className='w-[300px] h-auto mt-2 rounded-md' />}
          </div>
<div>
          <label htmlFor="model" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Model
          </label>
          <input
            type="text"
            name="model"
            id="model"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='model'
            required
            defaultValue={activeProduct?.model || ''}
          />
          </div>
<div>
          <label htmlFor="category" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Category
          </label>
          <select
            name="category"
            id="category"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            required
            defaultValue={activeProduct?.category?._id || ''}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          </div>
<div>
          <label htmlFor="description" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className='rounded-xl text-fuchsia-600 w-[300px] h-[100px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Description'
            required
            defaultValue={activeProduct?.description || ''}
          />
          </div>
<div>
          <label htmlFor="rating" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Rating'
            required
            defaultValue={activeProduct?.rating || ''}
          />
          </div>
<div>
          <label htmlFor="numReviews" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Number of Reviews
          </label>
          <input
            type="number"
            name="numReviews"
            id="numReviews"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Number of Reviews'
            required
            defaultValue={activeProduct?.numReviews || ''}
          />
          </div>
<div>
          <label htmlFor="price" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Price
          </label>
          <input
            type="number"
           
            name="price"
            id="price"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Price'
            required
            defaultValue={activeProduct?.price || ''}
          />
          </div>
<div>
          <label htmlFor="countInStock" className='bg-gradient-to-r text-xl block from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent'>
            Count in Stock
          </label>
          <input
            type="number"
            name="countInStock"
            id="countInStock"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='Count in Stock'
            required
            defaultValue={activeProduct?.countInStock || ''}
          />
</div>
          <button type='submit' className="p-[3px] relative w-[300px] mt-5">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-purple-600 font-bold hover:bg-transparent hover:text-white">
              {formMode === 'create' ? 'Create Product' : 'Update Product'}
            </div>
          </button>
        </form>

        {activeProduct && (
          <button
            onClick={handleDelete}
            className="mt-5 p-[3px] relative w-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-red-600 font-bold hover:bg-transparent hover:text-white">
              Delete Product
            </div>
          </button>
        )}

        <div className='border border-fuchsia-600 my-6'></div>
        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text mb-2 text-transparent">
          All Products
        </div>
        <div className="flex w-full mt-4 flex-wrap">
          {products.map((product) => (
            <div key={product._id} className="p-3  border m-3 rounded-xl shadow-md w-[250px]">
              <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover rounded-t-xl" />
              <div className="p-2">
                <div className="text-lg font-bold ">{product.name}</div>
                <div className="text-sm">{product.model}</div>
                <div className="text-sm">Price: ${product.price}</div>
                <button
                  onClick={() => {
                    setActiveProduct(product);
                    setFormMode('edit');
                  }}
                  className="mt-2 p-2 bg-purple-600 text-white w-full rounded-xl font-extrabold"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
