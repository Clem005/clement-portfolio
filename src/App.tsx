import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Journey from './components/Journey';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin'; // <-- Import Admin Page

function Portfolio() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Journey />
      <Experience />
      <Projects />
      <Contact />
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