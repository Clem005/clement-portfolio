import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const GitHubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

// --- THE IMAGE LINK FIXER ---
// This safely transforms standard Google Drive and GitHub URLs into raw image links
const formatImageUrl = (url: string) => {
  if (!url) return '';
  
  try {
    // 1. Convert Google Drive share links
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    }
    
    // 2. Convert GitHub blob links to raw user content links
    if (url.includes('github.com') && url.includes('/blob/')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    
    // If it's already a direct link, just return it
    return url;
  } catch (e) {
    return url;
  }
};

interface ProjectType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  outcomes: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects from backend:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } 
  };

  return (
    <section id="projects" className="w-full py-32 bg-black flex justify-center px-4 md:px-8">
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-white mb-20 text-center tracking-wide"
        >
          Selected Projects
        </motion.h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" as const }} className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full" />
            <p className="text-white/50 tracking-widest text-xs uppercase">Loading Database...</p>
          </div>
        ) : projects.length === 0 ? (
          <p className="text-white/30 text-sm py-20">No projects found. Add some from the Admin Panel!</p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
                // Fixed Height Container so it never shrinks or grows weirdly
                className="group relative h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
              >
                {/* Process the image URL to fix Drive/GitHub links automatically */}
                <img 
                  src={formatImageUrl(project.imageUrl)} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { 
                    e.currentTarget.src = `https://placehold.co/600x800/111111/ffffff?text=${encodeURIComponent(project.title)}` 
                  }}
                />
                
                {/* Unbreakable Slide-Up Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* The Unbreakable Text Box */}
                {/* It sits slightly lower, then slides up to its natural position on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 drop-shadow-md">
                    {project.title}
                  </h3>
                  
                  {/* The Description & Tags wrapper fades in on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {/* Strict line clamping guarantees it NEVER pushes past the card height */}
                    <p className="text-[13px] md:text-sm text-white/80 mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-[10px] tracking-wider uppercase text-white/90 bg-white/10 border border-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Slide-Up Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full md:max-w-4xl bg-black border-t md:border border-white/10 rounded-t-[2rem] md:rounded-[2rem] p-8 md:p-12 max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8 md:gap-12"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-2 z-10"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2">
                <img 
                  src={formatImageUrl(selectedProject.imageUrl)} 
                  alt={selectedProject.title} 
                  className="w-full h-[250px] md:h-full object-cover rounded-xl border border-white/10"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x800/111111/ffffff?text=${encodeURIComponent(selectedProject.title)}` }}
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 pr-8">{selectedProject.title}</h3>
                <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-6">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs tracking-wider uppercase text-white/80 bg-white/10 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>

                <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-[10px] tracking-widest text-white/50 uppercase mb-2">Key Outcome</h4>
                  <p className="text-sm text-white/90 font-medium">{selectedProject.outcomes}</p>
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase bg-white text-black hover:bg-white/80 transition-colors rounded-lg">
                      <ExternalLink size={16} /> Live Site
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase bg-transparent text-white border border-white/20 hover:bg-white/10 transition-colors rounded-lg">
                      <GitHubLogo /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}