import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const defaultCerts = [
  { title: 'Full Stack Web Development', issuer: 'Coursera / Meta', date: '2024', icon: '🌐', color: 'from-blue-600 to-indigo-600', url: '#' },
  { title: 'React & Redux Architecture', issuer: 'Udemy Specialization', date: '2024', icon: '⚛️', color: 'from-cyan-500 to-blue-600', url: '#' },
  { title: 'Firebase Cloud & Realtime Database', issuer: 'Google Developers', date: '2023', icon: '🔥', color: 'from-amber-500 to-orange-500', url: '#' },
  { title: 'Java Programming & Spring Boot Masterclass', issuer: 'Udemy', date: '2023', icon: '☕', color: 'from-red-500 to-rose-600', url: '#' },
  { title: 'Applied Machine Learning & AI APIs', issuer: 'Udemy / Coursera', date: '2024', icon: '🤖', color: 'from-purple-600 to-pink-500', url: '#' },
  { title: 'PHP, MySQL & Backend Architecture', issuer: 'Udemy', date: '2023', icon: '🐘', color: 'from-indigo-600 to-purple-500', url: '#' },
];

export default function Certifications() {
  const [certs, setCerts] = useState(defaultCerts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!db) {
      setCerts(defaultCerts);
      setLoading(false);
      return;
    }

    try {
      const certsRef = ref(db, 'certifications');
      const unsubscribe = onValue(certsRef, (snap) => {
        const data = snap.val();
        if (data && Object.keys(data).length > 0) {
          setCerts(Object.keys(data).map(k => ({ id: k, ...data[k] })));
        } else {
          setCerts(defaultCerts);
        }
        setLoading(false);
      }, (error) => {
        console.warn("Firebase certs fetch error:", error);
        setCerts(defaultCerts);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase certs error:", e);
      setCerts(defaultCerts);
      setLoading(false);
    }
  }, []);


  return (
    <section id="certifications" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Award className="w-3.5 h-3.5" />
            Verified Credentials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Certifications <span className="text-gradient">& Accreditations</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
            Industry credentials and validated competencies in web development, AI, and systems engineering.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(loading ? [...Array(6)] : certs).map((cert, i) => (
            loading ? (
              <div key={i} className="bg-white/80 dark:bg-slate-900/80 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            ) : (
              <motion.div
                key={cert.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm card-hover flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${cert.color || 'from-indigo-600 to-purple-600'} text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {cert.icon || '🏅'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {cert.title}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold mt-0.5">
                      {cert.issuer}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 font-mono text-[11px] mt-0.5">
                      Issued: {cert.date}
                    </p>
                  </div>
                </div>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-all flex-shrink-0"
                    title="View Credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
