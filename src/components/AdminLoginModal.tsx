import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token securely in localStorage
        localStorage.setItem('admin_token', data.access_token);
        onClose(); // Close the modal
        navigate('/admin'); // Redirect to the secret admin dashboard
      } else {
        setError(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-md p-8 rounded-[2rem] relative border border-white/10"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20">
                <Lock size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Admin Access</h2>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <input 
                  type="email" required placeholder="Admin Email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="password" required placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <button 
                type="submit" disabled={isLoading}
                className="mt-4 w-full bg-white text-black font-semibold tracking-widest uppercase text-xs py-4 rounded-xl hover:bg-white/80 transition-colors"
              >
                {isLoading ? 'Authenticating...' : 'Login'}
              </button>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}