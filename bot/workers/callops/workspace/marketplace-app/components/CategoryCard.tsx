import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  slug: string;
  productCount?: number;
}

const categoryEmojis: Record<string, string> = {
  smartphones: '📱',
  laptops: '💻',
  audio: '🎧',
  accessories: '⌚',
};

export default function CategoryCard({ name, slug, productCount }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${slug}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group">
        <div className="text-5xl mb-3">{categoryEmojis[slug] || '📦'}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">{name}</h3>
        {productCount !== undefined && (
          <p className="text-sm text-gray-500 mt-1">{productCount} products</p>
        )}
      </div>
    </Link>
  );
}
