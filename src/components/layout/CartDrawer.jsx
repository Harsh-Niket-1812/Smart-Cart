import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Zap } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const CartDrawer = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getTotal, getSubtotal, getDiscountTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass-dark z-[70] shadow-2xl border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Smart Cart</h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center opacity-50">
                    <Zap className="w-10 h-10" />
                  </div>
                  <p className="text-gray-400">Your cart is empty.<br/>Add some futuristic tech!</p>
                  <Link
                    to="/products"
                    onClick={toggleCart}
                    className="btn-primary"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-primary-glow font-bold text-sm">${item.price}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-surface/80 border-t border-white/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscountTotal() > 0 && (
                    <div className="flex justify-between text-sm text-green-400">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3"/> AI Savings</span>
                      <span>-${getDiscountTotal().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-white/5 pt-2">
                    <span>Total</span>
                    <span className="text-primary-glow">${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="w-full btn-primary py-4 text-lg font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  Checkout Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                  Secure encrypted checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
