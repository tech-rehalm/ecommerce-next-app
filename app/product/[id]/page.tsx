// app/products/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSession } from '@/lib/getSession'
import { Product, Review } from '@/types';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [session, setSession] = useState<any>(null);
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data.product);
        } else {
          console.error("Failed to fetch product:", data.error);
        }
      }
    };

    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    fetchProduct();
    fetchSession();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('You need to be logged in to submit a review.');
      return;
    }

    if (!product) return;

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews: [
          ...product.reviews,
          {
            name: session.user.name,
            rating,
            comment: review,
            user: session.user.id,
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
    } else {
      console.error("Failed to submit review:", data.error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>In Stock: {product.countInStock}</p>
      <p>Rating: {product.rating} ({product.numReviews} reviews)</p>

      <div>
        <h2>Reviews</h2>
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {product.reviews.map((review: Review) => (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {session && (
        <div>
          <h2>Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div>
              <label>
                Rating:
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Review:
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
