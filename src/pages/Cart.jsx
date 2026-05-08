import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Zap, Trash2, Plus, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal, getDiscountTotal, getTax, getShipping, getTotal } = useCartStore();

  const recommendations = products.slice(5, 8);

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-40 px-4 text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mx-auto border border-white/5"
        >
          <ShoppingCart className="w-16 h-16 text-gray-700" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black">YOUR CART IS <span className="text-gray-700">EMPTY</span></h1>
          <p className="text-gray-400 max-w-md mx-auto">The future is waiting. Start building your ecosystem today.</p>
        </div>
        <Link to="/products" className="btn-primary py-4 px-12 inline-flex">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">SMART <span className="text-primary">CART</span></h1>
        <p className="text-gray-400">Review your acquisition before neural finalization.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={item.id}
              className="glass-dark p-6 rounded-[2rem] flex flex-col sm:flex-row gap-6 group hover:border-primary/20 transition-all"
            >
              <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-surface flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 mt-6">
                  <div className="flex items-center gap-4 bg-black/40 rounded-xl px-4 py-2 border border-white/5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">Price</p>
                    <p className="text-2xl font-black text-primary-glow">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* AI Bundle Suggestion */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/10 via-accent-purple/5 to-transparent border border-primary/20 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <Sparkles className="text-white w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg">AI Smart Bundle Applied!</h4>
                      <p className="text-sm text-gray-400">You saved an extra $45.00 by reaching the tech tier.</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-primary/20">
                   <Zap className="w-3 h-3" /> System Optimized
                </div>
             </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="glass-dark p-8 rounded-[2.5rem] space-y-6 sticky top-32">
             <h3 className="text-xl font-bold flex items-center gap-2">
                Order Summary
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             </h3>
             
             <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                   <span>Subtotal</span>
                   <span className="text-white font-medium">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                   <span>Estimated Tax (8%)</span>
                   <span className="text-white font-medium">${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                   <span>Shipping</span>
                   <span className={getShipping() === 0 ? "text-green-400 font-bold" : "text-white font-medium"}>
                     {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
                   </span>
                </div>
                {getDiscountTotal() > 0 && (
                  <div className="flex justify-between text-green-400 font-bold bg-green-400/5 p-3 rounded-xl border border-green-400/10">
                     <span className="flex items-center gap-1"><Zap className="w-4 h-4"/> AI Savings</span>
                     <span>-${getDiscountTotal().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                   <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Amount</p>
                      <p className="text-4xl font-black text-primary-glow">${getTotal().toFixed(2)}</p>
                   </div>
                   <div className="text-right text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      Price in USD
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <Link to="/checkout" className="w-full btn-primary py-5 text-xl font-black neon-glow-primary">
                  Begin Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                   <ShieldCheck className="w-3 h-3" />
                   Secured by NeuralVault Encryption
                </div>
             </div>
          </div>
          
          {/* Progress Tracker */}
          <div className="glass-dark p-6 rounded-[2rem] space-y-4">
             <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-gray-400">Free Shipping Progress</span>
                <span className="text-primary-glow">{Math.min(100, (getSubtotal() / 200) * 100).toFixed(0)}%</span>
             </div>
             <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.min(100, (getSubtotal() / 200) * 100)}%` }}
                   className="h-full bg-gradient-to-r from-primary to-secondary-glow"
                />
             </div>
             <p className="text-[10px] text-gray-500 text-center italic">
                {getSubtotal() < 200 ? `Add $${(200 - getSubtotal()).toFixed(2)} more for free delivery.` : 'You qualified for free delivery!'}
             </p>
          </div>
        </div>
      </div>

      {/* Recommended for your ecosystem */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black tracking-tight">ADD TO YOUR <span className="text-primary">ECOSYSTEM</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cart;
