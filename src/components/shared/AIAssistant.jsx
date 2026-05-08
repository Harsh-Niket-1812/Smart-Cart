import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Mic, Zap, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your Smart Cart AI. How can I help you optimize your tech setup today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That's a great question! Based on current trends, the NeuralLink-Pro Headphones would be a perfect addition to your workspace. Would you like me to add them to your cart with a special 15% AI-exclusive discount?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] glass-dark rounded-[2.5rem] shadow-2xl border border-primary/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-primary/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-glow-primary">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Smart AI</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">System Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white/5 border border-white/10 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestions Bar */}
            <div className="px-6 py-2 bg-black/20 flex gap-2 overflow-x-auto no-scrollbar">
              {['Specs?', 'Compare', 'Discount'].map((tag) => (
                <button 
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] whitespace-nowrap hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-surface border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-50" />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-glow transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] neon-glow-primary group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent-purple to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Bot className="text-white w-8 h-8 relative z-10" />
      </motion.button>
    </div>
  );
};

export default AIAssistant;
