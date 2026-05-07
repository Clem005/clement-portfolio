import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Trash2, Plus, LayoutDashboard, Briefcase, FolderGit2 } from 'lucide-react';

interface Project {
  id: string; title: string; description: string; imageUrl: string; tags: string[]; outcomes: string; liveUrl?: string; githubUrl?: string;
}

interface Experience {
  id: string; role: string; organization: string; dateRange: string; summary: string; responsibilities: string[];
}

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  const [isLoading, setIsLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [projectForm, setProjectForm] = useState({ title: '', description: '', imageUrl: '', tags: '', outcomes: '', liveUrl: '', githubUrl: '' });
  const [expForm, setExpForm] = useState({ role: '', organization: '', dateRange: '', summary: '', responsibilities: '' });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/'); return; }
    fetchProjects();
    fetchExperiences();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects'); // REMOVED LOCALHOST
      setProjects(await res.json());
    } catch (e) { console.error(e); } 
    finally { setIsLoading(false); }
  };

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience'); // REMOVED LOCALHOST
      setExperiences(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const newProject = {
      ...projectForm,
      tags: projectForm.tags.split(',').map(tag => tag.trim()).filter(t => t !== ''),
      liveUrl: projectForm.liveUrl || null, githubUrl: projectForm.githubUrl || null,
    };

    const res = await fetch('/api/projects', { // REMOVED LOCALHOST
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newProject)
    });

    if (res.ok) { setProjectForm({ title: '', description: '', imageUrl: '', tags: '', outcomes: '', liveUrl: '', githubUrl: '' }); fetchProjects(); }
    else alert("Failed to add project.");
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const newExp = {
      ...expForm,
      responsibilities: expForm.responsibilities.split('\n').map(res => res.trim()).filter(r => r !== '')
    };

    const res = await fetch('/api/experience', { // REMOVED LOCALHOST
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newExp)
    });

    if (res.ok) { setExpForm({ role: '', organization: '', dateRange: '', summary: '', responsibilities: '' }); fetchExperiences(); }
    else alert("Failed to add experience.");
  };

  const handleDelete = async (id: string, type: 'projects' | 'experience') => {
    const token = localStorage.getItem('admin_token');
    if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;

    const res = await fetch(`/api/${type}/${id}`, { // REMOVED LOCALHOST
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) { type === 'projects' ? fetchProjects() : fetchExperiences(); }
    else alert(`Failed to delete ${type.slice(0, -1)}.`);
  };

  const handleLogout = () => { localStorage.removeItem('admin_token'); navigate('/'); };

  return (
    <div className="w-full min-h-screen bg-black flex text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-8 flex flex-col justify-between fixed h-screen bg-black z-20">
        <div>
          <h1 className="text-xl font-serif tracking-widest uppercase mb-12 flex items-center gap-3">
            <LayoutDashboard size={20} /> Admin
          </h1>
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`text-left text-sm tracking-widest uppercase px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'projects' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              <FolderGit2 size={16} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('experience')}
              className={`text-left text-sm tracking-widest uppercase px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'experience' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              <Briefcase size={16} /> Experience
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="ml-64 p-12 flex-1 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            
            {/* --- PROJECTS TAB --- */}
            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3"><FolderGit2 /> Manage Projects</h2>
                
                {/* Form */}
                <div className="glass-card p-8 rounded-2xl mb-12">
                  <h3 className="text-sm tracking-widest uppercase text-white/50 mb-6 flex items-center gap-2"><Plus size={16} /> Add New</h3>
                  <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                      <input type="text" required placeholder="Image URL" value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    </div>
                    <input type="text" required placeholder="Tags (comma separated: React, Python)" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    <textarea required rows={2} placeholder="Short Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" />
                    <input type="text" required placeholder="Key Outcomes (e.g., Increased sales by 20%)" value={projectForm.outcomes} onChange={e => setProjectForm({...projectForm, outcomes: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Live URL (Optional)" value={projectForm.liveUrl} onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                      <input type="text" placeholder="GitHub URL (Optional)" value={projectForm.githubUrl} onChange={e => setProjectForm({...projectForm, githubUrl: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    </div>
                    <button type="submit" className="mt-4 bg-white text-black font-semibold tracking-widest uppercase text-xs py-4 rounded-xl hover:bg-white/80 transition-colors">Save Project</button>
                  </form>
                </div>

                {/* List */}
                <h3 className="text-sm tracking-widest uppercase text-white/50 mb-6">Database Entries</h3>
                {isLoading ? <p className="animate-pulse text-white/50">Loading...</p> : projects.length === 0 ? <p className="text-white/30 text-sm">No projects found.</p> : (
                  <div className="flex flex-col gap-4">
                    {projects.map((p) => (
                      <div key={p.id} className="glass-card p-6 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <img src={p.imageUrl} className="w-12 h-12 rounded object-cover" />
                          <div><h4 className="text-lg font-serif">{p.title}</h4></div>
                        </div>
                        <button onClick={() => handleDelete(p.id, 'projects')} className="p-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* --- EXPERIENCE TAB --- */}
            {activeTab === 'experience' && (
              <motion.div key="experience" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3"><Briefcase /> Manage Experience</h2>
                
                {/* Form */}
                <div className="glass-card p-8 rounded-2xl mb-12">
                  <h3 className="text-sm tracking-widest uppercase text-white/50 mb-6 flex items-center gap-2"><Plus size={16} /> Add New</h3>
                  <form onSubmit={handleAddExperience} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="Role (e.g. Frontend Dev)" value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                      <input type="text" required placeholder="Organization" value={expForm.organization} onChange={e => setExpForm({...expForm, organization: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="Date Range (e.g. 2023 - Present)" value={expForm.dateRange} onChange={e => setExpForm({...expForm, dateRange: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                      <input type="text" required placeholder="Short Summary" value={expForm.summary} onChange={e => setExpForm({...expForm, summary: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm" />
                    </div>
                    {/* Responsibilities Field - Explain to user to use new lines */}
                    <textarea required rows={4} placeholder="Responsibilities (Put each responsibility on a new line. Do not use bullet points, just hit enter.)" value={expForm.responsibilities} onChange={e => setExpForm({...expForm, responsibilities: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" />
                    
                    <button type="submit" className="mt-4 bg-white text-black font-semibold tracking-widest uppercase text-xs py-4 rounded-xl hover:bg-white/80 transition-colors">Save Experience</button>
                  </form>
                </div>

                {/* List */}
                <h3 className="text-sm tracking-widest uppercase text-white/50 mb-6">Database Entries</h3>
                {isLoading ? <p className="animate-pulse text-white/50">Loading...</p> : experiences.length === 0 ? <p className="text-white/30 text-sm">No experience found.</p> : (
                  <div className="flex flex-col gap-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="glass-card p-6 rounded-xl flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-serif">{exp.role}</h4>
                          <p className="text-xs text-white/50">{exp.organization}</p>
                        </div>
                        <button onClick={() => handleDelete(exp.id, 'experience')} className="p-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}