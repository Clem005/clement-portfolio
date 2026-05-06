import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Target, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Handshake 
} from 'lucide-react';

const technicalSkills = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }, 
  { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" }, 
  { name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup/7B68EE" }, 
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA4343" }, 
  { name: "Make", icon: "https://cdn.simpleicons.org/make/512DA8" }, 
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier/FF4A00" }, 
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" }, 
  { name: "Claude", icon: "https://cdn.simpleicons.org/anthropic/D97757" }, 
];

const professionalSkills = [
  { title: "Teaching & Tutoring", subtitle: "IFS 140 Tutor, SQL Boot Camp Organizer", icon: GraduationCap },
  { title: "Leadership", subtitle: "Team leadership and strategic direction", icon: Target },
  { title: "Team Management", subtitle: "Football Coach, Team coordination", icon: Users },
  { title: "Project Management", subtitle: "End-to-end project delivery", icon: ClipboardList },
  { title: "Communication", subtitle: "Client relations and presentations", icon: MessageSquare },
  { title: "Mentorship", subtitle: "Peer guidance and skill development", icon: Handshake }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } // FIXED HERE
  };

  return (
    <section id="skills" className="w-full py-32 bg-black flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full px-6 flex flex-col items-center">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }} // FIXED HERE
          className="text-5xl md:text-6xl font-serif text-white mb-20 text-center tracking-wide"
        >
          Skills & Expertise
        </motion.h1>

        <div className="w-full flex flex-col items-center mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-serif text-white mb-12"
          >
            Technical Skills
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-12 max-w-[800px]"
          >
            {technicalSkills.map((skill, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="flex flex-col items-center gap-4 cursor-pointer group w-[25%] md:w-[15%]"
              >
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-14 h-14 md:w-16 md:h-16 object-contain saturate-[0.6] opacity-80 transition-all duration-300 group-hover:saturate-100 group-hover:opacity-100 group-hover:scale-110"
                />
                <span className="text-[11px] md:text-xs text-white/60 font-medium tracking-wide whitespace-nowrap group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-serif text-white mb-12"
          >
            Professional Skills
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
          >
            {professionalSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="glass-card flex items-center gap-5 p-5 rounded-xl cursor-pointer hover:border-white/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                    <Icon size={20} className="text-white/70" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white/90 tracking-wide mb-1">
                      {skill.title}
                    </span>
                    <span className="text-xs text-white/40 leading-snug">
                      {skill.subtitle}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}