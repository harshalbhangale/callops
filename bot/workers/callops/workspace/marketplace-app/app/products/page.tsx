import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, search, sort } = params;

  const categories = await prisma.category.findMany();

  const where: Record<string, unknown> = {};
  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) where.categoryId = cat.id;
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { brand: { contains: search } },
    ];
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  else if (sort === 'price-desc') orderBy = { price: 'desc' };
  else if (sort === 'rating') orderBy = { rating: 'desc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category ? categories.find((c) => c.slug === category)?.name || 'Products' : 'All Products'}
        {search && <span className="text-lg font-normal text-gray-500 ml-2">— &quot;{search}&quot;</span>}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className={`text-sm ${!category ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  All
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}${sort ? `&sort=${sort}` : ''}`}
                    className={`text-sm ${category === cat.slug ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <ul className="space-y-2">
              {[
                { value: '', label: 'Newest' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Top Rated' },
              ].map((opt) => (
                <li key={opt.value}>
                  <Link
                    href={`/products?${category ? `category=${category}&` : ''}${opt.value ? `sort=${opt.value}` : ''}`}
                    className={`text-sm ${(sort || '') === opt.value ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                  >
                    {opt.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
}
