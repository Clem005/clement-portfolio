import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { revealItem, useReveal } from '../lib/motion';
import TiltCard from './TiltCard';

const venturesData = [
  {
    id: "verplex",
    title: "Verplex Solutions",
    subtitle: "Tech Consultancy Firm",
    description: "At Verplex Solutions, we operate as a strategic technology partner for businesses looking to scale. Rather than just writing code, we architect end-to-end digital solutions—from enterprise automation to complex web infrastructure. Our primary focus is on eliminating operational bottlenecks and delivering custom software that drives measurable ROI and long-term efficiency.",
    link: null, // Add link here later if Verplex gets a website
    frontImage: "/verplex-front.jpg",
    backImage: "/verplex-back.jpg",
  },
  {
    id: "gradxp",
    title: "GradXP",
    subtitle: "Freelancer Platform",
    description: "GradXP bridges the gap between top-tier emerging talent and businesses in need of specialized technical execution. As a platform, it empowers skilled freelancers to deliver high-impact projects—ranging from custom AI integrations to full-stack web development—while providing clients with a reliable pipeline of vetted, project-ready professionals.",
    link: "https://gradxp.co.za",
    frontImage: "/gradxp-front.jpg",
    backImage: "/gradxp-back.jpg",
  }
];

// Venture photo that degrades to a plain on-brand panel when the file is missing,
// keeping the same footprint (no layout shift, no third-party placeholder request).
function VentureImage({ src, alt, label, variants, className }: {
  src: string;
  alt: string;
  label: string;
  variants: Variants;
  className: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <motion.div
        variants={variants}
        aria-hidden="true"
        className={`${className} bg-neutral-950 flex items-center justify-center p-6 text-center`}
      >
        <span className="font-serif text-xl md:text-2xl tracking-wide text-white/25">{label}</span>
      </motion.div>
    );
  }

  return (
    <motion.img
      variants={variants}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function Journey() {
  const reveal = useReveal();

  // Dual Image Hover Animations
  const backImageVariants = {
    hidden: { opacity: 0.7, x: 0, y: 0, rotate: -6, scale: 1 },
    hover: { opacity: 1, x: "-10%", y: "-5%", rotate: -10, scale: 1.05, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const frontImageVariants = {
    hidden: { opacity: 1, x: 0, y: 0, rotate: 4 },
    hover: { x: "10%", y: "5%", rotate: 8, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section id="journey" className="w-full py-16 lg:py-24 bg-black flex flex-col items-center px-4 md:px-8 overflow-hidden">
      
      <motion.h2
        variants={revealItem}
        {...reveal}
        className="text-4xl md:text-5xl font-serif text-white mb-12 lg:mb-20 text-center tracking-wide"
      >
        Professional Ventures
      </motion.h2>

      <div className="max-w-[1200px] w-full flex flex-col gap-12 lg:gap-16">
        {venturesData.map((item, index) => {
          // Alternate image left/right on desktop
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              variants={revealItem}
              {...reveal}
            >
            <TiltCard
              className={`glass-card w-full rounded-2xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col gap-10 lg:gap-16 group cursor-pointer ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* TEXT SIDE */}
              <div className="flex-1 flex flex-col justify-center w-full z-10">
                <h4 className="text-[10px] md:text-xs tracking-[0.2em] text-white/50 uppercase mb-3">
                  {item.subtitle}
                </h4>
                {/* Parallax: title sits slightly in front of the body text, images slightly behind */}
                <h3 className="parallax-front text-3xl md:text-4xl font-serif text-white mb-6">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light mb-8">
                  {item.description}
                </p>

                {item.link && (
                  <div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <ExternalLink size={16} /> Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* IMAGE SIDE (Interactive Dual Images) */}
              <motion.div 
                initial="hidden"
                animate="hidden"
                whileHover="hover"
                className="parallax-back flex-none lg:flex-1 w-full h-[350px] md:h-[400px] lg:h-[450px] relative z-10 mt-2 lg:mt-0"
              >
                {/* Back Image */}
                <VentureImage
                  variants={backImageVariants}
                  src={item.backImage}
                  alt={`${item.title} background`}
                  label={item.title}
                  className="absolute top-[10%] right-[15%] md:right-[20%] w-[65%] h-[80%] object-cover rounded-xl border border-white/10 shadow-2xl"
                />

                {/* Front Image */}
                <VentureImage
                  variants={frontImageVariants}
                  src={item.frontImage}
                  alt={`${item.title} foreground`}
                  label={item.title}
                  className="absolute top-[5%] right-0 md:right-[5%] w-[70%] h-[90%] object-cover rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10"
                />
              </motion.div>

            </TiltCard>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}