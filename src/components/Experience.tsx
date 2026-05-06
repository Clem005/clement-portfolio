import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface ExperienceType {
  id: string;
  role: string;
  organization: string;
  dateRange: string;
  summary: string;
  responsibilities: string[];
}

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveExperiences = async () => {
      try {
        const res = await fetch('/api/experience');
        const data = await res.json();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveExperiences();
  }, []);

  useEffect(() => {
    if (selectedExp) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedExp]);

  return (
    <section id="experience" className="w-full py-32 bg-black flex justify-center px-4 md:px-8">
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }} // FIXED HERE
          className="text-4xl md:text-5xl font-serif text-white mb-20 text-center tracking-wide"
        >
          Experience
        </motion.h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            {/* FIXED HERE ("linear" as const) */}
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" as const }} className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full" />
            <p className="text-white/50 tracking-widest text-xs uppercase">Loading Database...</p>
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-white/30 text-sm py-20">No experience found. Add some from the Admin Panel!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" as const }} // FIXED HERE
                onClick={() => setSelectedExp(exp)}
                className="glass-card p-8 rounded-2xl cursor-pointer group hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-white transition-colors pr-8">
                      {exp.role}
                    </h3>
                    <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors absolute top-8 right-8" size={24} />
                  </div>
                  <h4 className="text-sm tracking-widest text-white/50 uppercase mb-4">{exp.organization}</h4>
                  <p className="text-sm text-white/70 font-light leading-relaxed">{exp.summary}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs tracking-widest text-white/40">READ MORE</span>
                  <span className="text-xs tracking-widest text-white/40">{exp.dateRange}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} 
              className="glass-card w-full md:max-w-3xl bg-black border-t md:border border-white/10 rounded-t-[2rem] md:rounded-[2rem] p-8 md:p-12 max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-2"
              >
                <X size={24} />
              </button>
              <div className="mb-10 pr-12">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">{selectedExp.role}</h3>
                <p className="text-sm tracking-widest text-white/50 uppercase">{selectedExp.organization} • {selectedExp.dateRange}</p>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-sm tracking-widest text-white/50 uppercase mb-4">Summary</h4>
                  <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{selectedExp.summary}</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest text-white/50 uppercase mb-4">Responsibilities</h4>
                  <ul className="flex flex-col gap-3">
                    {selectedExp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm md:text-base text-white/80 font-light leading-relaxed flex items-start gap-3">
                        <span className="text-white/40 mt-1.5 text-[10px]">■</span>{resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}