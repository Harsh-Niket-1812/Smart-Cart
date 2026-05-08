import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-surface border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
              tag === 'AI Pick' ? "bg-primary text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-black/60 text-gray-300 backdrop-blur-md"
            )}
          >
            {tag === 'AI Pick' && <Zap className="w-3 h-3" />}
            {tag}
          </span>
        ))}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={cn(
          "absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300",
          isFavorite ? "bg-accent-pink text-white" : "bg-black/60 text-white hover:bg-white/20"
        )}
      >
        <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
      </button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-gray-900">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
           <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-full btn-primary neon-glow-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-primary-glow font-medium mb-1">{product.category}</p>
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black">${product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${(product.price * (1 + product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded",
            product.stock < 10 ? "text-orange-400 bg-orange-400/10" : "text-green-400 bg-green-400/10"
          )}>
            {product.stock < 10 ? 'Low Stock' : 'In Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
