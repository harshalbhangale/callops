import prisma from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        {' / '}
        <Link href="/products" className="hover:text-indigo-600">Products</Link>
        {' / '}
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-indigo-600">
          {product.category.name}
        </Link>
        {' / '}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center text-8xl">
          📱
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-indigo-600 font-medium uppercase tracking-wide">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
            <span className="text-sm text-gray-500">({product.rating} rating)</span>
          </div>

          <p className="text-4xl font-bold text-indigo-600 mt-6">{formatPrice(product.price)}</p>

          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product.category.name}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Availability</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              ♥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
