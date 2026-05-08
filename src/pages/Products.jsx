import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid2X2, List, X, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { cn } from '../utils/cn';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 space-y-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">THE <span className="text-primary">COLLECTION</span></h1>
          <p className="text-gray-400">Discover the next wave of technological evolution.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search the future..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
            />
          </div>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "p-4 rounded-2xl border transition-all flex items-center gap-2",
              isFilterOpen ? "bg-primary border-primary text-white" : "bg-surface border-white/5 text-gray-300"
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-bold text-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all border",
              selectedCategory === cat 
                ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]" 
                : "bg-surface border-white/5 text-gray-400 hover:border-white/20"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sorting & Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500 font-medium">
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
        </p>
        
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-gray-400 font-medium">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none focus:ring-0 font-bold text-white cursor-pointer hover:text-primary transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <X className="w-12 h-12 text-gray-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-300">No tech found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
            className="btn-outline mx-auto"
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
