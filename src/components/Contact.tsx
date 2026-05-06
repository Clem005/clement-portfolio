import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

const GitHubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedInLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' }); 
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Network error. Make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="contact" className="w-full py-32 bg-black flex justify-center px-4 md:px-8 border-t border-white/5">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl w-full flex flex-col md:flex-row gap-16 md:gap-24"
      >
        
        <div className="flex-1 flex flex-col">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-white mb-6">
            Let's Connect
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-12 max-w-md">
            Whether you have a project in mind, need a custom automation solution, or just want to discuss the intersection of business and technology—my inbox is always open.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4">
            <a 
              href="mailto:clemchuksthabo@gmail.com" 
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/clementibeneche"
              target="_blank" rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#0A66C2]/20 hover:border-[#0A66C2] transition-all duration-300"
            >
              <LinkedInLogo />
            </a>
            <a 
              href="https://github.com/clementibeneche"
              target="_blank" rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <GitHubLogo />
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex-1 w-full">
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden">
            
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 rounded-[2rem]"
                >
                  <CheckCircle2 size={48} className="text-green-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-white mb-2">Message Sent</h3>
                  <p className="text-sm text-white/70">I will get back to you as soon as possible.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="name" className="block text-[10px] tracking-widest text-white/50 uppercase mb-2 ml-2">Name</label>
              <input 
                type="text" id="name" required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] tracking-widest text-white/50 uppercase mb-2 ml-2">Email</label>
              <input 
                type="email" id="email" required
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] tracking-widest text-white/50 uppercase mb-2 ml-2">Message</label>
              <textarea 
                id="message" required rows={4}
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-2 w-full bg-white text-black font-semibold tracking-widest uppercase text-xs py-4 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" as const }} className="w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>

      </motion.div>
    </section>
  );
}