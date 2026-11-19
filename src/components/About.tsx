import { motion, type Variants } from 'framer-motion';
import { revealGroup, revealItem, useReveal } from '../lib/motion';

const REVEAL_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

// The images rest at a slight tilt; they fade up into that tilt, then fan out on hover.
const backImageVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 14, rotate: -6, scale: 1 },
  visible: { opacity: 0.7, x: 0, y: 0, rotate: -6, scale: 1, transition: REVEAL_TRANSITION },
  hover: {
    opacity: 1, x: "-15%", y: "-5%", rotate: -12, scale: 1.05,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const frontImageVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 14, rotate: 4 },
  visible: { opacity: 1, x: 0, y: 0, rotate: 4, transition: REVEAL_TRANSITION },
  hover: {
    x: "15%", y: "10%", rotate: 12,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export default function About() {
  const reveal = useReveal();

  return (
    <section id="about" className="w-full py-16 lg:py-24 bg-black flex justify-center px-4 md:px-8">
      <motion.div
        variants={revealItem}
        {...reveal}
        className="glass-card max-w-[1200px] w-full rounded-2xl md:rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative"
      >

        {/* LEFT SIDE: Text Content */}
        <motion.div
          variants={revealGroup}
          {...reveal}
          className="flex-1 flex flex-col z-10 w-full"
        >
          {/* Parallax: heading slightly in front of the body text, images slightly behind */}
          <motion.h2 variants={revealItem} className="parallax-front text-4xl md:text-5xl font-serif text-white mb-8">
            The Approach
          </motion.h2>

          {/* Business-Focused Story Paragraphs */}
          <div className="flex flex-col gap-5 text-[13px] md:text-sm text-white/70 leading-[1.8] font-light pr-0 lg:pr-8">
            <motion.p variants={revealItem}>
              Most businesses don't have a technology problem. They have a fragmentation problem. Sales lives in one tool, operations in another, finance in a third, and your people spend their days carrying information between them. Every handover is a delay, a possible error, and a decision made on yesterday's numbers.
            </motion.p>

            <motion.p variants={revealItem}>
              Technology should never be a cost centre; it should be the engine the business runs on. Off-the-shelf software asks you to work the way it was designed. A central operations platform is designed around the way you work: one place where every client, job, task and rand is visible, built for your process and owned by you.
            </motion.p>

            <motion.p variants={revealItem}>
              Whether that means a single portal that carries a job from first enquiry to final invoice, live dashboards that show the state of the business at a glance, or workflows that move work between departments without anyone chasing it, the objective remains the same: a business that can take on more work without taking on more complexity.
            </motion.p>

            <motion.p variants={revealItem} className="text-white/90 font-medium mt-4">
              I'm Clement Ibeneche. I work at the intersection of business strategy and software development. I study how your business really runs, then build the system it should have been running on from the start.
            </motion.p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Dual Overlapping Images */}
        <motion.div
          variants={revealGroup}
          {...reveal}
          whileHover="hover"
          className="parallax-back flex-none lg:flex-1 w-full h-[500px] lg:h-[550px] relative z-10 mt-12 lg:mt-0 cursor-pointer"
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
