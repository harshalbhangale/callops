import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    orderBy: { rating: 'desc' },
    include: { category: true },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Premium Electronics,<br />Unbeatable Prices
            </h1>
            <p className="text-lg text-indigo-100 mb-8">
              Discover the latest smartphones, laptops, audio gear, and accessories from top brands.
            </p>
            <a
              href="/products"
              className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Shop Now →
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              slug={cat.slug}
              productCount={cat._count.products}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              brand={product.brand}
              rating={product.rating}
              images={product.images}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
