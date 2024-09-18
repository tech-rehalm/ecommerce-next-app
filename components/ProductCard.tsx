// components/ProductCard.tsx

import Link from 'next/link';
import { Product } from '@/types'; // Ensure this path is correct
import { formatDistanceToNow } from 'date-fns'; // You may need to install date-fns
import { IconStarFilled, IconStarHalfFilled , IconStar} from '@tabler/icons-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4  shadow-md bg-white rounded-xl">
      <Link href={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
          />
          <div className="flex w-full items-center justify-between text-purple-600">
            <h2 className="text-xl  font-bold mb-2">{product.name}</h2>
          <p className=" mb-2">{product.model}</p>
          </div>
          
          <div className="flex w-full items-center justify-between">
            <p className="p-1 text-sm rounded-xl bg-purple-600 text-white  mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">{product.numReviews} reviews</p>         
          </div>
          <div className="flex text-[gold] gap-3">
          <p className="text-gray-600 font-bold mb-2 mr-5"> Ratings</p>
            <IconStarFilled/>
            <IconStarFilled/>
            <IconStarHalfFilled/>
            <IconStar/>
          </div>
          
          <p className="text-gray-500 mb-2 line-clamp-1">{product.description}</p>
          {/* <p className="text-gray-600">Created: {formatDistanceToNow(new Date(product.createdAt))} ago</p> */}
          
      </Link>
    </div>
  );
};

export default ProductCard;