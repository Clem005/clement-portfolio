import { motion } from 'framer-motion';

const timelineData = [
  { year: "1 March", text: "Born in Johannesburg, South Africa" },
  { year: "2010", text: "Started primary school at Sir Edmund Hillary Primary School" },
  { year: "2018", text: "Earned my place at Jeppe High School for Boys" },
  { year: "2020", text: "Wrote my first line of code and never looked back" },
  { year: "2021", text: "Took gold at a public speaking competition" },
  { year: "2022", text: "Matriculated from Jeppe High School for Boys" },
  { year: "2023", text: "Moved to Cape Town" },
  { year: "2023", text: "Began my BCom in Information Systems at UWC" },
  { year: "2024", text: "Landed my first client and built an ecommerce store using WordPress" },
  { year: "2025", text: "Delivered my first full stack project" },
  { year: "2025", text: "Built an n8n automation and ERP system for a client" },
  { year: "2025", text: "Completed my BCom in Information Systems" },
  { year: "2026", text: "Completed my BCom Honours in Information Systems" },
  { year: "2026", text: "Stepped into the world as an IT Professional" },
];

export default function Journey() {
  return (
    <section id="journey" className="w-full py-24 bg-black flex flex-col items-center px-6 md:px-8 overflow-hidden">
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" as const }} // FIXED HERE
        className="text-4xl md:text-5xl font-serif text-white mb-16 text-center tracking-wide"
      >
        My Timeline
      </motion.h2>

      <div className="relative max-w-5xl w-full">
        
        {/* The Central Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>

        <div className="flex flex-col gap-8 md:gap-0">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20, x: isEven ? -15 : 15 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" as const }} // FIXED HERE
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full md:py-3 ${
                  isEven ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                
                {/* The Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 mt-3 md:mt-0 shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10"></div>

                {/* Content Box */}
                <div 
                  className={`w-full md:w-[46%] pl-10 md:pl-0 ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}
                >
                  <div className={`glass-card p-5 md:p-6 rounded-2xl flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:border-white/20 ${
                    isEven ? 'md:items-end' : 'md:items-start'
                  }`}>
                    <span className="text-xl md:text-2xl font-serif text-white mb-2 tracking-widest">
                      {item.year}
                    </span>
                    <p className="text-[13px] md:text-sm text-white/70 font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}