import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, FolderGit2, Sparkles, Layers } from 'lucide-react';

function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [triggered, setTriggered] = useState(false);

  const trigger = () => setTriggered(true);

  useEffect(() => {
    if (!triggered) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, end, duration, start]);

  return { count, trigger };
}

function StatCard({ value, label, icon: Icon, suffix, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { count, trigger } = useCountUp(value);

  useEffect(() => {
    if (inView) trigger();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 sm:p-8 relative group"
    >
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
        <Icon className="w-5 h-5" />
      </div>

      <div className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
        {count}<span className="text-indigo-600 dark:text-indigo-400">{suffix}</span>
      </div>

      <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 14, label: 'Projects Completed', icon: FolderGit2, suffix: '+' },
  { value: 1, label: 'Years Production Exp.', icon: Layers, suffix: '+' },
  { value: 100, label: 'DSA & Code Solutions', icon: Code2, suffix: '+' },
  { value: 6, label: 'AI Integrations & Tools', icon: Sparkles, suffix: '+' },
];

export default function StatsCounter() {
  return (
    <section className="py-10 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-lg shadow-indigo-500/5 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
          {stats.map(({ value, label, icon, suffix }, i) => (
            <StatCard
              key={label}
              value={value}
              label={label}
              icon={icon}
              suffix={suffix}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
