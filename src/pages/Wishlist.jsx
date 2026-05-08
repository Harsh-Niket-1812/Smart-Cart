import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';

const Wishlist = () => {
  const { items, clearWishlist, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-40 px-4 text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mx-auto border border-white/5"
        >
          <Heart className="w-16 h-16 text-gray-700" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">WISHLIST IS <span className="text-gray-700">VOID</span></h1>
          <p className="text-gray-400 max-w-md mx-auto">No tech saved in your neural buffer. Explore the collection to start saving.</p>
        </div>
        <Link to="/products" className="btn-primary py-4 px-12 inline-flex">
          Browse Tech
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">NEURAL <span className="text-accent-pink">BUFFER</span></h1>
          <p className="text-gray-400">Your curated selection of future acquisitions.</p>
        </div>
        <button 
          onClick={clearWishlist}
          className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Purge Buffer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((product) => (
          <div key={product.id} className="relative group">
             <ProductCard product={product} />
             <div className="absolute inset-x-6 bottom-32 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-20">
                <button
                  onClick={() => addItem(product)}
                  className="w-full btn-primary bg-accent-pink border-none shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                >
                   <ShoppingCart className="w-4 h-4" />
                   Move to Cart
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
