// ProductPage.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product, Review } from '@/types';
import Loader from '@/components/Loader';
import { AuroraBackground } from '../../../components/ui/aurora-background';
import Rev from '@/components/Review';
import { motion } from 'framer-motion';
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppStore } from '@/store/store'; // Import your store
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const fetchProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

const fetchSession = async () => {
  const res = await fetch('/api/session');
  if (!res.ok) throw new Error('Failed to fetch session');
  const data = await res.json();
  return data.session || null;
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [session, setSession] = useState<any>(null);
  
  // Get the addToCart function from the store
  const addToCart = useAppStore(state => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          const productData = await fetchProduct(id);
          setProduct(productData.product);
        }
        const userSession = await fetchSession();
        setSession(userSession);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (product: Product) => {
    try {
      addToCart(product);
    toast.success(`${product.name} has been added to your cart!`); // Show success toast
    } catch (error:any) {
      toast.error(error)
    }
    
  };

  if (!product) return <Loader />;

  return (
    <AuroraBackground>
      <ToastContainer /> {/* Toast container for rendering notifications */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center text-white rounded-xl  px-10 pb-10 mt-[80px]"
      >
        <div className="w-full p-7">
        <p className='text-2xl font-extrabold bg-gradient-to-bl rounded-xl from-[aqua] to-[lime] bg-clip-text text-transparent inline'>{session?.user.role}</p><br />
        <p className='text-2xl font-extrabold bg-gradient-to-bl rounded-xl from-[aqua] to-[lime] bg-clip-text text-transparent inline'>Email: {session?.user.email}</p>
        </div>
        <div className="flex w-full ">
          <div className="flex flex-col m-5">
            <h1 className="xl:text-5xl lg:text-5xl md:text-4xl mr-6 text-white font-extrabold">
              {product.name} <span className="text-[lime] font-extrabold">{product.category.name}</span>
            </h1>
            <div className="flex w-full items-center ">
              <p className='p-2 text-lg font-semibold mr-7 bg-gradient-to-bl rounded-xl my-4 from-purple-600 to-[aqua] w-[200px]'>Price: ${product.price}</p>
              <p className='font-semibold'>Count In Stock: <span className="text-lg font-bold text-[aqua]">{product.countInStock}</span></p>
            </div>
            
            <p className='mt-3'>Ratings: {Math.floor(product.rating) - 1} </p>
            <div className="flex text-[gold] mb-3">
              <IconStarFilled />
              <IconStarFilled />
              <IconStarFilled />
              <IconStarHalfFilled />
              <IconStar />
            </div>
            <p className='my-2 text-sm font-light bg-gradient-to-bl rounded-xl from-[aqua] to-[lime] bg-clip-text text-transparent '>{product.description}</p>
            <Rev product={product} setProduct={setProduct} session={session} />

            {/* Button to add to cart */}
            <button 
              onClick={() => handleAddToCart(product)} 
              className="mt-4 bg-[lime] text-black px-4 py-2 rounded-lg fint-bold rounded-xl hover:bg-[aqua]"
            >
              <AiOutlineShoppingCart className="inline mr-2" />
              Add to Cart
            </button>
          </div>
          <img src={product.image} alt={product.name} className="h-[400px] rounded-xl " />
        </div>

        <div className='w-full flex flex-col'>
          <h2 className='my-2 text-2xl font-extrabold bg-gradient-to-bl rounded-xl from-[aqua] to-[lime] bg-clip-text text-transparent'>Reviews</h2> <br />
          {product.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className='w-full flex flex-wrap'>
              {product.reviews.map((review: Review) => (
                <li key={review._id} className='w-[300px] flex flex-col p-3 rounded-xl shadow-md shadow-fuchsia-700 m-4 font-bold'>
                  <strong>{review.name}</strong>
                  <p>{review.comment}</p>
                  <p>Ratings: <span className="text-[lime]">{review.rating}</span> </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </motion.div>
    </AuroraBackground>
  );
};

export default ProductPage;
