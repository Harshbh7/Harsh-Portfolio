import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, Sparkles, MapPin } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const DEFAULT_EXPERIENCES = [
  {
    id: "exp_01",
    role: "Full-Stack Software Developer & Technical Lead",
    company: "Bodh Script Club / LPU Tech Projects",
    duration: "2024 — Present",
    description: "Led end-to-end development of student platforms, QR attendance engines, and real-time community management dashboards using React, Firebase, and Tailwind CSS.",
  },
  {
    id: "exp_02",
    role: "Frontend & AI Systems Developer",
    company: "Academic & Independent Engineering",
    duration: "2023 — 2024",
    description: "Architected AI-enabled web applications including MindTrack (TensorFlow.js eye tracking) and CargoTrack logistics engine with Java Spring Boot and PostgreSQL.",
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!db) {
      setExperiences(DEFAULT_EXPERIENCES);
      setLoading(false);
      return;
    }

    try {
      const expRef = ref(db, 'experience');
      const unsubscribe = onValue(expRef, (snapshot) => {
        const data = snapshot.val();
        if (data && Object.keys(data).length > 0) {
          const expList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setExperiences(expList.reverse());
        } else {
          setExperiences(DEFAULT_EXPERIENCES);
        }
        setLoading(false);
      }, (error) => {
        console.warn("Firebase experience fetch error:", error);
        setExperiences(DEFAULT_EXPERIENCES);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase experience error:", e);
      setExperiences(DEFAULT_EXPERIENCES);
      setLoading(false);
    }
  }, []);


  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-tag">
            <Briefcase className="w-3.5 h-3.5" />
            Career Milestones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Professional <span className="text-gradient">Journey & Roles</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
            Practical experience engineering production web systems and real-world tech leadership.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-indigo-100 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm relative">
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Full-Stack Software Developer & Technical Lead
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold mt-1 mb-3">
                Bodh Script Club / LPU Tech Projects
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Led end-to-end development of student platforms, QR attendance engines, and real-time community management dashboards using React, Firebase, and Tailwind CSS.
              </p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-8 h-8 rounded-full bg-indigo-50 dark:bg-slate-800 border-2 border-indigo-600 flex items-center justify-center text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md card-hover">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs font-mono font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
