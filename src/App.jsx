import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/layout/CartDrawer';
import AIAssistant from './components/shared/AIAssistant';
import ScrollToTop from './components/shared/ScrollToTop';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Wishlist from './pages/Wishlist';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-gray-100 flex flex-col selection:bg-primary/30 selection:text-primary-glow">
        <Navbar />
        <CartDrawer />
        <AIAssistant />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="py-20 border-t border-white/5 px-4 bg-surface/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="text-2xl font-black tracking-tighter text-primary">SMART CART</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Defining the future of digital commerce through neural optimization and quantum-speed logistics.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Ecosystem</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Neural Network</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Quantum Pay</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Teleport Logistics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Portal</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Stay Synced</h4>
              <div className="flex gap-2">
                <input 
                   type="email" 
                   placeholder="Enter neural ID..." 
                   className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
                />
                <button className="p-2 bg-primary rounded-xl text-white hover:bg-primary-glow transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
             <p>© 2026 SMART CART CORP. ALL SYSTEMS OPERATIONAL.</p>
             <div className="flex gap-8">
                <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
                <a href="#" className="hover:text-primary transition-colors">Service Terms</a>
             </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Simple ArrowRight for Footer
const ArrowRight = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default App;
