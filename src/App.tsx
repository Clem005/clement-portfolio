import { useRef, useState, type ComponentType } from 'react';
import { flushSync } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Download } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AudienceQuestion from './components/AudienceQuestion';
import Skills from './components/Skills';
import About from './components/About';
import Journey from './components/Journey';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin'; // <-- Import Admin Page
import { CV_FILENAME, CV_URL, prefersReducedMotion, readInitialView, rememberView, type View } from './lib/view';

type SectionKey = 'about' | 'projects' | 'journey' | 'skills' | 'experience' | 'contact';

const sections: Record<SectionKey, ComponentType> = {
  about: About,
  projects: Projects,
  journey: Journey,
  skills: Skills,
  experience: Experience,
  contact: Contact,
};

// Section order per audience. Every section appears in both; only order differs.
const viewOrder: Record<View, SectionKey[]> = {
  business: ['about', 'projects', 'journey', 'skills', 'experience', 'contact'],
  cv: ['experience', 'skills', 'projects', 'journey', 'about', 'contact'],
};

function Portfolio() {
  // Read once, synchronously, so the very first render is in the right order.
  const [initial] = useState(readInitialView);
  const [view, setView] = useState<View>(initial.view);
  const [chosen, setChosen] = useState(initial.chosen);
  // DOM order is fixed at load to match the initial view. Later switches only change
  // CSS `order`: physically moving the nodes would cancel any scroll-in animation
  // that is mid-flight and leave that element stuck invisible.
  const [domOrder] = useState(() => viewOrder[initial.view]);
  const viewRef = useRef<HTMLDivElement>(null);

  const chooseView = (next: View) => {
    const changed = next !== view;
    rememberView(next);

    // Commit the new order before fading/scrolling so both act on the final layout.
    flushSync(() => {
      setView(next);
      setChosen(true);
    });

    const el = viewRef.current;
    if (!el) return;
    const reduceMotion = prefersReducedMotion();
    if (changed && !reduceMotion) {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
    }
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-black">
      <Navbar view={view} onViewChange={chooseView} />
      <Hero />
      <AudienceQuestion view={view} chosen={chosen} collapsed={initial.chosen} onChoose={chooseView} />

      {/* Everything that depends on the view lives below the question. Switching view
          only re-orders these wrappers visually: nothing remounts or refetches. */}
      <div ref={viewRef} className="flex flex-col w-full">
        {view === 'cv' && (
          <div className="-order-1 w-full flex justify-center px-4 pt-28">
            <a
              href={CV_URL}
              download={CV_FILENAME}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-white text-black hover:bg-white/80 transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
          </div>
        )}
        {domOrder.map((key) => {
          const Section = sections[key];
          return (
            <div key={key} className="w-full" style={{ order: viewOrder[view].indexOf(key) }}>
              <Section />
            </div>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} /> {/* <-- Add Admin Route */}
      </Routes>
    </Router>
  );
}

export default App;
