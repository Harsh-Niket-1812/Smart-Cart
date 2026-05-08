import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Success = () => {
  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-xl w-full text-center space-y-8 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(139,92,246,0.6)] neon-glow-primary mb-12"
        >
          <CheckCircle2 className="w-16 h-16 text-white" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            ORDER <span className="text-primary">SECURED</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Your tech is being porting via our neural logistics network. 
            Estimated arrival: 24 Earth Hours.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="glass-dark p-6 rounded-2xl flex flex-col items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Track Order</span>
          </div>
          <div className="glass-dark p-6 rounded-2xl flex flex-col items-center gap-2">
            <Zap className="w-6 h-6 text-secondary-glow" />
            <span className="text-[10px] font-bold uppercase text-gray-500">AI Support</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <Link to="/products" className="btn-primary py-4 px-12 text-lg font-bold">
            Continue Exploration
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] pt-12">
           Confirmation #NC-8829-XJ2
        </p>
      </div>
    </div>
  );
};

export default Success;
