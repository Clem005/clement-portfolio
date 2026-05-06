export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-black flex flex-col md:flex-row justify-center md:justify-between items-center px-8 text-xs text-white/40 tracking-wider">
      <p>© {currentYear} Clement Ibeneche. All rights reserved.</p>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-4 md:mt-0 hover:text-white transition-colors uppercase tracking-[0.2em]"
      >
        Back to top ↑
      </button>
    </footer>
  );
}