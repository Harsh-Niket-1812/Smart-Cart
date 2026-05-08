import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Zap, 
  ChevronLeft, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Check
} from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import ProductCard from '../components/product/ProductCard';
import { cn } from '../utils/cn';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [activeTab, setActiveTab] = useState('specs');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 space-y-24">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to collection
      </button>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden bg-surface border border-white/5 relative group"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <button
              onClick={() => toggleWishlist(product)}
              className={cn(
                "absolute top-8 right-8 p-4 rounded-2xl backdrop-blur-md transition-all shadow-xl",
                isInWishlist(product.id) ? "bg-accent-pink text-white" : "bg-black/60 text-white hover:bg-white/20"
              )}
            >
              <Heart className={cn("w-6 h-6", isInWishlist(product.id) && "fill-current")} />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map((i) => (
               <div key={i} className="aspect-square rounded-2xl bg-surface border border-white/5 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors opacity-50 hover:opacity-100">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                   <Star className="w-4 h-4 fill-current" />
                   <span className="text-sm font-bold">{product.rating}</span>
                   <span className="text-gray-500 text-xs font-medium">({product.reviews} reviews)</span>
                </div>
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight">{product.name}</h1>
             <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-4xl font-black text-primary-glow">${product.price}</span>
             {product.discount > 0 && (
               <span className="text-xl text-gray-500 line-through">
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
               </span>
             )}
             <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-bold">
                -{product.discount}% AI SAVINGS
             </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 py-4 text-lg font-bold rounded-2xl transition-all flex items-center justify-center gap-3",
                isAdded ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-primary text-white neon-glow-primary"
              )}
             >
                {isAdded ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                {isAdded ? 'Added to Cart' : 'Acquire Tech'}
             </button>
             <button className="p-4 rounded-2xl bg-surface border border-white/5 hover:border-white/20 transition-colors">
                <Share2 className="w-6 h-6" />
             </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8">
             {[
               { icon: Truck, text: 'Instant Teleport' },
               { icon: ShieldCheck, text: 'Neural Security' },
               { icon: RefreshCcw, text: 'Quantum Return' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-white/5">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-[10px] font-bold uppercase text-gray-500">{item.text}</span>
               </div>
             ))}
          </div>

          {/* Tabs */}
          <div className="space-y-6 pt-8">
             <div className="flex border-b border-white/5">
                {['specs', 'features', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative",
                      activeTab === tab ? "text-primary" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
             </div>
             
             <div className="min-h-[100px] text-sm text-gray-400 leading-relaxed">
                {activeTab === 'specs' && (
                  <ul className="grid grid-cols-2 gap-4">
                    {Object.entries(product.features || {}).map(([key, val]) => (
                      <li key={key} className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-600 uppercase font-black">{key}</span>
                        <span className="text-white font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'features' && (
                   <ul className="space-y-3">
                      {product.features?.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                           <div className="w-1 h-1 bg-primary rounded-full" />
                           {f}
                        </li>
                      ))}
                   </ul>
                )}
                {activeTab === 'shipping' && (
                  <p>Global neural logistics network ensures delivery within 24 standard earth hours.</p>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-12">
           <h2 className="text-3xl font-black tracking-tight">YOU MAY ALSO <span className="text-primary">NEED</span></h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
           </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
