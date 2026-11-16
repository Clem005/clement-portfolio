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
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const backImageVariants = {
    hidden: { opacity: 0, x: 20, rotate: 0 },
    visible: { 
      opacity: 0.7, x: 0, y: 0, rotate: -6, scale: 1,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" as const } 
    },
    hover: { 
      opacity: 1, x: "-15%", y: "-5%", rotate: -12, scale: 1.05,
      transition: { duration: 0.5, ease: "easeOut" as const } 
    }
  };

  const frontImageVariants = {
    hidden: { opacity: 0, x: 50, y: 30, rotate: 0 },
    visible: { 
      opacity: 1, x: 0, y: 0, rotate: 4, 
      transition: { duration: 1, delay: 0.4, ease: "easeOut" as const } 
    },
    hover: { 
      x: "15%", y: "10%", rotate: 12, 
      transition: { duration: 0.5, ease: "easeOut" as const } 
    }
  };

  return (
    <section id="about" className="w-full py-24 bg-black flex justify-center px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="glass-card max-w-[1200px] w-full rounded-2xl md:rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
      >
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 flex flex-col z-10 w-full"
        >
          <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-serif text-white mb-8">
            The Approach
          </motion.h2>
          
          {/* Business-Focused Story Paragraphs */}
          <div className="flex flex-col gap-5 text-[13px] md:text-sm text-white/70 leading-[1.8] font-light pr-0 lg:pr-8">
            <motion.p variants={textVariants}>
              In today’s landscape, most businesses aren't struggling with a lack of technology—they are struggling with integration. You are likely dealing with disconnected systems, repetitive manual tasks that eat up your team's valuable time, and data silos that prevent actionable insights.
            </motion.p>
            
            <motion.p variants={textVariants}>
              Technology should never be a cost center; it should be a growth engine. I look at software development and systems analysis through a purely business-first lens. The goal isn't just to write code—it's to architect digital solutions that directly solve operational bottlenecks and increase your bottom line.
            </motion.p>

            <motion.p variants={textVariants}>
              Whether that means building a custom RAG AI chatbot to instantly retrieve internal company knowledge, developing a full-stack web application, or orchestrating complex APIs to automate your financial ledgers—the objective remains the same: mapping complex business logic to scalable, seamless digital experiences.
            </motion.p>

            <motion.p variants={textVariants} className="text-white/90 font-medium mt-4">
              I'm Clement Ibeneche. I sit comfortably at the intersection of business strategy and software development. I am a creative problem-solver driven by one core philosophy: build technology that drives tangible, real-world impact.
            </motion.p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Dual Overlapping Images */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          className="flex-none lg:flex-1 w-full h-[500px] lg:h-[550px] relative z-10 mt-12 lg:mt-0 cursor-pointer"
        >
          <motion.img 
            variants={backImageVariants}
            src="/about-back.jpg" 
            alt="Strategic Planning"
            className="absolute top-[10%] right-[15%] md:right-[20%] w-[70%] h-[75%] object-cover rounded-2xl border border-white/10 shadow-2xl"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop' }}
          />
          <motion.img 
            variants={frontImageVariants}
            src="/about-front.jpeg" 
            alt="Development & Execution"
            className="absolute top-[5%] right-0 w-[75%] h-[85%] object-cover rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}