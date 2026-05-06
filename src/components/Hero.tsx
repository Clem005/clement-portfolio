import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      
      {/* 1. Background Banner Image - z-0 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/banner.png" 
          alt="Banner" 
          className="w-full h-full object-cover"
          // If banner.jpg isn't in your public folder yet, use this sunset placeholder:
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' }}
        />
        {/* Very subtle, short top shadow so the menu icon is visible, but face stays bright */}
        <div className="absolute top-0 inset-x-0 h-[20vh] bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
      </div>

      {/* 2. Big Background Text - z-10 */}
      <div className="absolute inset-0 z-10 flex justify-center items-center pointer-events-none -mt-32">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[6vw] md:text-[5vw] lg:text-[6.5vw] font-serif text-[#EAEAEA] tracking-[0.15em] uppercase drop-shadow-lg whitespace-nowrap"
        >
          Clement Ibeneche
        </motion.h1>
      </div>

      {/* 3. Foreground Subject (The Cutout) - z-20 */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 z-20 w-full flex justify-center pointer-events-none"
      >
        
      </motion.div>

      {/* 4. Bottom Shadow Fade to Black Content - z-30 */}
      <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-black via-black/90 to-transparent z-30 pointer-events-none"></div>

      {/* 5. Scroll Down Chevron - z-40 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 z-40 flex flex-col items-center animate-bounce cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={36} className="text-white/60 hover:text-white transition-colors" strokeWidth={1.5} />
      </motion.div>

    </section>
  );
}