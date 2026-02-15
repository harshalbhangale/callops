import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  brand: string;
  rating: number;
  images: string;
}

export default function ProductCard({ id, name, price, brand, rating, images }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl p-8">
          📱
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
          <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(rating))}</span>
            <span className="text-xs text-gray-500">({rating})</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-indigo-600">{formatPrice(price)}</span>
            <button className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
