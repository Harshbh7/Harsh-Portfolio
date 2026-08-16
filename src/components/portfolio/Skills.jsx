import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Database, Sparkles, Terminal, Code } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend & UI Architecture',
    icon: Layers,
    color: 'from-blue-500 to-indigo-600',
    skills: [
      { name: 'React.js & React 19', level: 92 },
      { name: 'Next.js & Server Components', level: 85 },
      { name: 'TypeScript / Modern JS (ES6+)', level: 88 },
      { name: 'Tailwind CSS & Design Systems', level: 95 },
      { name: 'Framer Motion & GSAP Animation', level: 82 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend, APIs & Databases',
    icon: Database,
    color: 'from-indigo-600 to-purple-600',
    skills: [
      { name: 'Java & Spring Boot', level: 84 },
      { name: 'Node.js & Express / RESTful APIs', level: 80 },
      { name: 'Firebase (Realtime DB, Auth, Storage)', level: 90 },
      { name: 'PostgreSQL & MySQL', level: 82 },
      { name: 'PHP & Modern MVC Frameworks', level: 78 },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Engineering & Developer Tools',
    icon: Sparkles,
    color: 'from-cyan-500 to-emerald-500',
    skills: [
      { name: 'Gemini API & OpenAI Integrations', level: 88 },
      { name: 'TensorFlow.js & MediaPipe Vision', level: 80 },
      { name: 'Git, GitHub Actions & CI/CD', level: 86 },
      { name: 'Three.js & 3D Interactive Web', level: 75 },
      { name: 'Algorithms & Problem Solving', level: 90 },
    ],
  },
];

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div className="mb-4 last:mb-0" ref={ref}>
      <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{name}</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filteredCategories = filter === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === filter);

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <Code className="w-3.5 h-3.5" />
            Core Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Technical <span className="text-gradient">Mastery & Tooling</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Modern full-stack technologies and AI frameworks I leverage to ship reliable, high-speed software.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'frontend', label: 'Frontend & UI' },
            { id: 'backend', label: 'Backend & Databases' },
            { id: 'ai-tools', label: 'AI & Tools' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                filter === id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {filteredCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/90 dark:border-slate-800 shadow-md card-hover"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Cloud Pills */}
        <div className="mt-14 p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-4">
            Full Ecosystem Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              'React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Java', 'Spring Boot', 'Python',
              'PHP', 'Firebase Realtime DB', 'PostgreSQL', 'MySQL', 'Tailwind CSS', 'Framer Motion',
              'Three.js', 'GSAP', 'TensorFlow.js', 'MediaPipe', 'Gemini AI API', 'OpenAI API',
              'Git & GitHub', 'REST APIs', 'Vite', 'Postman', 'Docker Basics', 'Linux'
            ].map(tech => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-2xs hover:scale-105 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
