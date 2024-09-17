// components/ProductCard.tsx

import Link from 'next/link';
import { Product } from '@/types'; // Ensure this path is correct

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Link href={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
          />
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">Model: {product.model}</p>
          <p className="text-gray-600 mb-2">Price: ${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">Category: {product.category.name}</p>
          <p className="text-gray-600 mb-2">Rating: {product.rating} ({product.numReviews} reviews)</p>
          <p className="text-gray-600 mb-2">Description: {product.description}</p>
          <p className="text-gray-600">Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
