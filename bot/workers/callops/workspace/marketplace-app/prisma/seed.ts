import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Categories
  const smartphones = await prisma.category.create({
    data: { name: 'Smartphones', slug: 'smartphones', image: '/categories/smartphones.jpg' },
  });
  const laptops = await prisma.category.create({
    data: { name: 'Laptops', slug: 'laptops', image: '/categories/laptops.jpg' },
  });
  const audio = await prisma.category.create({
    data: { name: 'Audio', slug: 'audio', image: '/categories/audio.jpg' },
  });
  const accessories = await prisma.category.create({
    data: { name: 'Accessories', slug: 'accessories', image: '/categories/accessories.jpg' },
  });

  // Products
  const products = [
    { name: 'iPhone 15 Pro Max', description: 'Apple iPhone 15 Pro Max with A17 Pro chip, 256GB storage, titanium design, 48MP camera system.', price: 159900, brand: 'Apple', images: JSON.stringify(['/products/iphone15.jpg']), stock: 25, rating: 4.8, categoryId: smartphones.id },
    { name: 'Samsung Galaxy S24 Ultra', description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, S Pen, 6.8" Dynamic AMOLED.', price: 134999, brand: 'Samsung', images: JSON.stringify(['/products/s24ultra.jpg']), stock: 30, rating: 4.7, categoryId: smartphones.id },
    { name: 'OnePlus 12', description: 'OnePlus 12 with Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC charging.', price: 64999, brand: 'OnePlus', images: JSON.stringify(['/products/oneplus12.jpg']), stock: 40, rating: 4.5, categoryId: smartphones.id },
    { name: 'MacBook Air M3', description: 'Apple MacBook Air 15" with M3 chip, 8GB RAM, 256GB SSD, Liquid Retina display.', price: 134900, brand: 'Apple', images: JSON.stringify(['/products/macbookair.jpg']), stock: 15, rating: 4.9, categoryId: laptops.id },
    { name: 'Dell XPS 15', description: 'Dell XPS 15 with Intel Core i7-13700H, 16GB RAM, 512GB SSD, OLED 3.5K display.', price: 149990, brand: 'Dell', images: JSON.stringify(['/products/dellxps.jpg']), stock: 12, rating: 4.6, categoryId: laptops.id },
    { name: 'ASUS ROG Strix G16', description: 'ASUS ROG Strix G16 gaming laptop with RTX 4060, Intel i7, 16GB RAM, 165Hz display.', price: 119990, brand: 'ASUS', images: JSON.stringify(['/products/rogstrix.jpg']), stock: 18, rating: 4.4, categoryId: laptops.id },
    { name: 'Sony WH-1000XM5', description: 'Sony premium wireless noise-cancelling headphones with 30-hour battery, LDAC codec.', price: 29990, brand: 'Sony', images: JSON.stringify(['/products/sonyxm5.jpg']), stock: 50, rating: 4.8, categoryId: audio.id },
    { name: 'Apple AirPods Pro 2', description: 'Apple AirPods Pro 2nd gen with USB-C, adaptive audio, active noise cancellation.', price: 24900, brand: 'Apple', images: JSON.stringify(['/products/airpodspro.jpg']), stock: 60, rating: 4.7, categoryId: audio.id },
    { name: 'Samsung 25W Travel Adapter', description: 'Samsung 25W USB-C super fast charging travel adapter, compact design.', price: 1499, brand: 'Samsung', images: JSON.stringify(['/products/samcharger.jpg']), stock: 100, rating: 4.3, categoryId: accessories.id },
    { name: 'Apple Watch Ultra 2', description: 'Apple Watch Ultra 2 with S9 chip, precision dual-frequency GPS, 36-hour battery.', price: 89900, brand: 'Apple', images: JSON.stringify(['/products/watchultra.jpg']), stock: 20, rating: 4.8, categoryId: accessories.id },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  // Admin user
  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@marketplace.com', password: 'admin123', role: 'ADMIN' },
  });

  console.log('Seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
