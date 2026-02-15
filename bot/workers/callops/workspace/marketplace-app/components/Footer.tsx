export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">⚡ ElectroMart</h3>
            <p className="text-sm">Your one-stop shop for premium electronics at the best prices.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-white">All Products</a></li>
              <li><a href="/products?category=smartphones" className="hover:text-white">Smartphones</a></li>
              <li><a href="/products?category=laptops" className="hover:text-white">Laptops</a></li>
              <li><a href="/products?category=audio" className="hover:text-white">Audio</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@electromart.com</li>
              <li>1-800-ELECTRO</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          © 2024 ElectroMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
