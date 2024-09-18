import React, { useState } from 'react';
import { Product } from '@/types';
import { getSession } from '@/lib/getSession';
import { toast } from 'react-toastify';

interface RevProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  session: any; // Adjust type as necessary
}

const Rev: React.FC<RevProps> = ({ product, setProduct, session }) => {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('You need to be logged in to submit a review.');
      return;
    }

    const id = product._id; // Ensure this matches your Product's id field

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews: [
          ...product.reviews,
          {
            name: session.name,
            rating,
            comment: review,
            user: session.id,
          },
        ],
        numReviews: product.numReviews + 1,
        rating: ((product.rating * product.numReviews) + rating) / (product.numReviews + 1),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setProduct(data.product);
      setReview('');
      setRating(0);
      toast.success("Review added successfully")
    } else {
      toast.error("Failed to submit review:", data.error);
    }
  };

  return (
    <div>
      <h2 className='w-full text-[aqua] font-semibold my-2'>Write a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div className='flex w-full items-center justify-around'>
          <label className='w-full text-[aqua] font-semibold my-2'>
            Rate the car: <br />
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
              className="bg-purple-200 p-2 font-bold text-purple-600 rounded-xl"
            />
          </label>
        <div>
          <label className='w-full text-[aqua] font-semibold my-2'>
            Share your review: <br />
            <textarea className="bg-purple-200 p-2 font-bold text-purple-600 rounded-xl"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
        </div>
        </div>
        <button className='bg-gradient-to-bl rounded-xl my-4 from-purple-600 to-[aqua] w-full p-2 text-white font-extrabold' type="submit">Submit Review</button>
      </form>
      <button className='bg-gradient-to-bl rounded-xl my-4 from-purple-600 to-[aqua] w-full p-2 text-white font-extrabold' type="submit">Add to cart</button>
    </div>
  );
};

export default Rev;
