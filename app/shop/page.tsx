"use client"

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types'; // Adjust the import path as needed
import Loader from '@/components/Loader';

interface Category {
  _id: string;
  name: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const handleCategoryFilter = async (id: string) => {
    setSelectedCategory(id); // Set the selected category
    if (id) {
      // Filter products based on the selected category ID
      const filtered = products.filter(product => product.category._id === id);
      setFilteredProducts(filtered); // Update the filtered products
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  const allProducts = () => {
    setSelectedCategory(null); // Clear selected category
    setFilteredProducts(products); // Show all products
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initialize filtered products with all products
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    fetchProducts();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="fixed left-0 top-0 bottom-0 w-[130px] bg-gradient-to-r from-blue-500 to-fuchsia-600 flex flex-col gap-5 items-center pt-16">
        <button
          onClick={allProducts}
          className="text-xl font-bold text-white w-[100px] text-start p-2 border rounded-xl"
        >
          All
        </button>
        {categories?.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryFilter(category._id)}
            className="text-xl font-bold text-white w-[100px] text-start p-2 border rounded-xl"
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="fixed left-0 top-0 bottom-0 w-full h-[90px]  bg-gradient-to-r from-blue-500 to-fuchsia-600 flex  gap-5 items-center pl-16 ml-[130px]">
      <div className="flex items-center  px-8 py-4 shadow-lg bg-gray-200 rounded-xl">
        <img src="/logo.svg" alt="logo" />
        <h1 className="text-xl font-bold text-purple-600">Envy Car Sales</h1>
      </div>
      </div>
      <div className="w-full flex-x-5 my-2">
        <h1 className="text-2xl flex items-center"></h1>
      </div>
      <div className="grid ml-[130px]  mt-[100px]  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
