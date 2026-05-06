import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } // FIXED HERE
  };

  const backImageVariants = {
    hidden: { opacity: 0, x: 20, rotate: 0 },
    visible: { 
      opacity: 0.7, x: 0, y: 0, rotate: -6, scale: 1,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" } 
    },
    hover: { 
      opacity: 1, x: "-15%", y: "-5%", rotate: -12, scale: 1.05,
      transition: { duration: 0.5, ease: "easeOut" } // FIXED HERE
    }
  };

  const frontImageVariants = {
    hidden: { opacity: 0, x: 50, y: 30, rotate: 0 },
    visible: { 
      opacity: 1, x: 0, y: 0, rotate: 4, 
      transition: { duration: 1, delay: 0.4, ease: "easeOut" } 
    },
    hover: { 
      x: "15%", y: "10%", rotate: 12, 
      transition: { duration: 0.5, ease: "easeOut" } // FIXED HERE
    }
  };

  return (
    <section id="about" className="w-full py-24 bg-black flex justify-center px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card max-w-[1200px] w-full rounded-2xl md:rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
      >
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 flex flex-col z-10 w-full"
        >
          <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-serif text-white mb-8">
            About
          </motion.h2>
          
          <div className="flex flex-col gap-5 text-[13px] md:text-sm text-white/70 leading-[1.8] font-light pr-0 lg:pr-8">
            <motion.p variants={textVariants}>
              <strong className="text-white font-medium">Hi, I'm Clement Ibeneche</strong>, a Software Developer, Systems Analyst, and depending on the day, a Business Analyst or Data Analyst. But more than any title, I'm someone who sits comfortably at the intersection of technology and business.
            </motion.p>
            <motion.p variants={textVariants}>
              From an early age, I wasn't just asking <em>"how does this work?"</em> I was asking <em>"how can this solve a real problem?"</em> That question followed me through high school and into university, and it's what led me to study Information Systems at the University of the Western Cape, where I went on to complete my BCom Honours in Information Systems.
            </motion.p>
            <motion.p variants={textVariants}>
              Before that, I attended Jeppe High School for Boys, and I wasn't your typical tech student. Yes, I wrote code in IT class, but I also found myself drawn to other disciplines. Jeppe pushed me toward public speaking, critical thinking, and stepping outside the expected. More than anything, it taught me to raise my hand, take on the challenge, and lead, not because I was told to, but because I believed something could be done better.
            </motion.p>
            <motion.p variants={textVariants}>
              So if you ever see me with a mic, don't be surprised. People who know me would call me a creative problem-solver, unconventional, and not afraid to take a calculated risk.
            </motion.p>
            <motion.p variants={textVariants} className="text-white/90 font-medium mt-2">
              As for where I see myself in the next five years? Not climbing a corporate ladder. I want to be in a space where I can lead meaningful change, tackling the kinds of problems businesses face on a global scale, in an environment that gives room for real innovation.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          className="flex-1 w-full h-[500px] lg:h-[550px] relative z-10 mt-12 lg:mt-0 cursor-pointer"
        >
          <motion.img 
            variants={backImageVariants}
            src="/about-back.jpg" 
            alt="Background Memory"
            className="absolute top-[10%] right-[15%] md:right-[20%] w-[70%] h-[75%] object-cover rounded-2xl border border-white/10 shadow-2xl"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop' }}
          />
          <motion.img 
            variants={frontImageVariants}
            src="/about-front.jpg" 
            alt="Foreground Action"
            className="absolute top-[5%] right-0 w-[75%] h-[85%] object-cover rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}