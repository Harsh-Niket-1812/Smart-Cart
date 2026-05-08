import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  Loader2,
  Lock
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../utils/cn';

const Checkout = () => {
  const navigate = useNavigate();
  const { getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/success');
    }, 3000);
  };

  return (
    <div className="pt-32 pb-32 max-w-5xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Form */}
        <div className="space-y-8">
          <div className="space-y-2">
             <h1 className="text-4xl font-black tracking-tight">CHECKOUT</h1>
             <p className="text-gray-400 font-medium">Finalize your neural acquisition.</p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-4">
             {[1, 2].map((s) => (
               <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all",
                    step >= s ? "bg-primary text-white neon-glow-primary" : "bg-white/5 text-gray-500"
                  )}>
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s === 1 && <div className={cn("w-12 h-0.5 rounded-full", step > 1 ? "bg-primary" : "bg-white/5")} />}
               </div>
             ))}
          </div>

          <form onSubmit={handleCheckout} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Delivery Matrix
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" required className="bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                      <input type="text" placeholder="Last Name" required className="bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                    </div>
                    <input type="email" placeholder="Email Address" required className="w-full bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                    <input type="text" placeholder="Address" required className="w-full bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" placeholder="City" required className="bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                      <input type="text" placeholder="Postal Code" required className="bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                      <input type="text" placeholder="Country" required className="bg-surface border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none" />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="w-full btn-primary py-4"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Protocol
                    </h3>
                    <div className="glass-dark p-6 rounded-2xl border-primary/20 bg-primary/5 relative overflow-hidden">
                       <div className="flex justify-between items-start mb-8 relative z-10">
                          <Cpu className="w-10 h-10 text-primary opacity-50" />
                          <div className="text-right">
                             <p className="text-[10px] font-black uppercase text-gray-500">Neural Pay</p>
                          </div>
                       </div>
                       <input type="text" placeholder="•••• •••• •••• ••••" required className="w-full bg-transparent border-none p-0 text-2xl font-mono tracking-[0.2em] focus:ring-0 placeholder:text-gray-800" />
                       <div className="flex gap-8 mt-8">
                          <div className="flex-1">
                             <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Holder</p>
                             <input type="text" placeholder="NEURAL ENTITY" required className="w-full bg-transparent border-none p-0 text-xs font-bold focus:ring-0 uppercase" />
                          </div>
                          <div className="w-20">
                             <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Expiry</p>
                             <input type="text" placeholder="MM/YY" required className="w-full bg-transparent border-none p-0 text-xs font-bold focus:ring-0" />
                          </div>
                          <div className="w-20">
                             <p className="text-[8px] font-black uppercase text-gray-500 mb-1">CVC</p>
                             <input type="password" placeholder="•••" required className="w-full bg-transparent border-none p-0 text-xs font-bold focus:ring-0" />
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="flex-1 glass py-4 rounded-xl font-bold hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="flex-[2] btn-primary py-4 neon-glow-primary relative overflow-hidden"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Pay ${getTotal().toFixed(2)}
                          <ShieldCheck className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right: Summary Box */}
        <div className="space-y-6">
           <div className="glass-dark p-8 rounded-[2.5rem] border-primary/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 Acquisition Summary
                 <Lock className="w-4 h-4 text-gray-500" />
              </h3>
              
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-gray-400">
                    <span>Neural Credits</span>
                    <span className="text-white">${getTotal().toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-gray-400">
                    <span>Priority Porting</span>
                    <span className="text-green-400 font-bold">FREE</span>
                 </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                 <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Total Transmission</p>
                 <p className="text-5xl font-black text-primary-glow">${getTotal().toFixed(2)}</p>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                 <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                    Awaiting authorization...
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
