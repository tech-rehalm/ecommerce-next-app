"use client"

import AdminLayout from '@/components/AdminLayout';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Category {
  _id: string;
  name: string;
}

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formMode, setFormMode] = useState<'edit' | 'create'>('create');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    const url = formMode === 'create' ? '/api/category' : `/api/category`;
    const method = formMode === 'create' ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: activeCategory?._id, name }),
    });

    if (response.ok) {
      toast.success(`${formMode === 'create' ? 'Category created' : 'Category updated'} successfully`);
      setActiveCategory(null);
      setFormMode('create');
      fetchCategories();
    } else {
      toast.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} category`);
    }
  };

  const handleDelete = async () => {
    if (activeCategory) {
      const response = await fetch(`/api/category`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: activeCategory._id }),
      });

      if (response.ok) {
        toast.success("Category deleted successfully");
        setActiveCategory(null);
        setFormMode('create');
        fetchCategories();
      } else {
        toast.error("Error deleting category");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories as Category[]);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout className='mt-[80px]'>
      <div className="w-full min-h-screen p-10">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text inline text-transparent">
          {formMode === 'create' ? 'Create Categories' : 'Edit Category'}
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
          <label htmlFor="name" className='bg-gradient-to-r text-xl from-purple-600 to-fuchsia-600 bg-clip-text inline text-transparent'>
            Category name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className='rounded-xl text-fuchsia-600 w-[300px] focus:outline-purple-600 border-none bg-purple-200 font-bold p-2'
            placeholder='category'
            required
            defaultValue={activeCategory?.name || ''}
          />
          <button type='submit' className="p-[3px] relative w-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-purple-600 font-bold hover:bg-transparent hover:text-white">
              {formMode === 'create' ? 'Create category' : 'Update category'}
            </div>
          </button>
          {formMode === 'edit' && (
            <button
              type='button'
              onClick={handleDelete}
              className="p-[3px] relative w-[300px] bg-red-500 text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-red-600 font-bold hover:bg-transparent hover:text-white">
                Delete category
              </div>
            </button>
          )}
        </form>

        <div className='border border-fuchsia-600 my-6 '></div>
        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text inline text-transparent">
          All Categories
        </div>
        <div className="flex w-full mt-4">
          {categories.map((category) => (
            <div key={category._id}>
              <button
                onClick={() => {
                  setActiveCategory(category);
                  setFormMode('edit');
                }}
                className="p-3 text-purple-600 border-none font-bold rounded-xl m-3 shadow-md shadow-purple-600 min-w-[100px] text-center"
              >
                {category.name}
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setActiveCategory(null);
              setFormMode('create');
            }}
            className="p-3 text-green-600 border-none font-bold rounded-xl m-3 shadow-md shadow-green-600 min-w-[100px] text-center"
          >
            Add New
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
