import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen, School } from 'lucide-react';

const education = [
  {
    degree: 'MCA — Master of Computer Applications',
    institution: 'Lovely Professional University (LPU)',
    duration: '2025 – 2027',
    location: 'Punjab, India',
    icon: GraduationCap,
    color: 'from-blue-600 to-indigo-600',
    highlight: true,
    description: 'Advanced curriculum focusing on distributed systems, AI & intelligent computing, cloud architectures, and scalable full-stack engineering.',
  },
  {
    degree: 'BCA — Bachelor of Computer Applications',
    institution: 'Agra College, Agra',
    duration: '2022 – 2025',
    location: 'Agra, Uttar Pradesh',
    icon: BookOpen,
    color: 'from-indigo-600 to-purple-600',
    highlight: false,
    description: 'Foundational computer science, data structures & algorithms, OOP in Java, database management (RDBMS/SQL), and web application development.',
  },
  {
    degree: '12th (Senior Secondary) — Science (PCM + CS)',
    institution: 'Agra Vanasthali Vidhyalaya',
    duration: '2021 – 2022',
    location: 'Agra, Uttar Pradesh',
    icon: School,
    color: 'from-cyan-500 to-emerald-500',
    highlight: false,
    description: 'Physics, Chemistry, Mathematics with specialized coursework in Computer Science fundamentals and introductory programming.',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Foundations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Education <span className="text-gradient">& Degrees</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
            My academic progression in computer science, software engineering, and applied sciences.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="space-y-8">
          {education.map((edu, i) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border shadow-md card-hover relative overflow-hidden ${
                  edu.highlight
                    ? 'border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/15'
                    : 'border-slate-200/90 dark:border-slate-800'
                }`}
              >
                {edu.highlight && (
                  <div className="absolute top-0 right-0">
                    <span className="px-4 py-1 bg-gradient-to-l from-indigo-600 to-indigo-700 text-white font-mono text-[10px] font-bold uppercase rounded-bl-2xl shadow-sm">
                      CURRENT DEGREE
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                      {edu.institution}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {edu.description}
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
