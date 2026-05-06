import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;
    
    if (clickCount.current >= 10) {
      setShowAdminModal(true); // ← only change from previous version
      clickCount.current = 0;
    }

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* Nav height driven by logo — py-1.5 wraps it tightly */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[90%] mx-auto flex justify-between items-center py-1.5">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-white/70 transition-transform duration-300 hover:scale-110 z-50"
          >
            {isOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>

          <div className="flex justify-end cursor-pointer z-50" onClick={handleLogoClick}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105 origin-right"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x150/transparent/white?text=LOGO' }}
            />
          </div>

        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 md:gap-12">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                  className="text-3xl md:text-6xl font-serif tracking-[0.1em] text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin modal — triggered by 10x logo clicks */}
      <AdminLoginModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />
    </>
  );
}