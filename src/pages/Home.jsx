import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Rocket, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const trendingProducts = products.slice(0, 4);
  const aiPicks = products.filter(p => p.tags.includes('AI Pick')).slice(0, 3);

  return (
    <div className="pt-20 space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold uppercase tracking-widest text-primary-glow"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Shopping Experience
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
          >
            THE FUTURE OF <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-purple to-secondary-glow">
              COMMERCE IS HERE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl"
          >
            Experience the next generation of shopping with our AI-driven Smart Cart. 
            Personalized recommendations, lightning-fast checkout, and futuristic tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/products" className="btn-primary py-4 px-10 text-lg font-bold neon-glow-primary">
              Explore Tech
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="glass py-4 px-10 text-lg font-bold rounded-full hover:bg-white/10 transition-colors">
              How it works
            </button>
          </motion.div>
        </div>

        {/* Floating Product Preview */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 hidden lg:block"
        >
          <div className="glass-dark rounded-[3rem] p-8 border-t border-white/20 shadow-2xl backdrop-blur-3xl">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <Zap className="text-primary w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="font-bold">Neural Audio System</h3>
                      <p className="text-sm text-gray-400">Trending in Audio</p>
                   </div>
                </div>
                <div className="text-2xl font-black text-primary-glow">$349.99</div>
             </div>
             <div className="h-48 rounded-2xl bg-gradient-to-r from-primary/10 via-accent-purple/5 to-transparent overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                   <span className="text-gray-500 font-mono text-xs opacity-20 uppercase tracking-[2rem]">AI-OPTIMIZED</span>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Instant Processing', desc: 'Quantum-speed transactions and real-time inventory updates.' },
            { icon: Shield, title: 'Neural Security', desc: 'Your data is protected by decentralized blockchain encryption.' },
            { icon: Rocket, title: 'Hyperspace Delivery', desc: 'Predictive logistics ensure your tech arrives before you need it.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-[2rem] bg-surface border border-white/5 space-y-4 group transition-all"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">TRENDING <span className="text-primary">TECH</span></h2>
            <p className="text-gray-400">Our community\'s most anticipated gadgets and gear.</p>
          </div>
          <Link to="/products" className="btn-outline">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Recommendations CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center space-y-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent-purple/20 to-secondary/40 blur-3xl -z-10" />
          <div className="absolute inset-0 glass-dark -z-20 border border-white/10" />
          
          <Sparkles className="w-12 h-12 text-primary mx-auto animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">AI-PERSONALIZED SHOPPING</h2>
          <p className="max-w-xl mx-auto text-gray-300 text-lg">
            Let our neural engine curate the perfect collection based on your unique digital footprint.
          </p>
          <button className="btn-primary py-4 px-12 text-lg font-bold shadow-2xl">
            Activate Smart Engine
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
