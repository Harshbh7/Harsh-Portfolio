import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Brain, GraduationCap, MapPin, Sparkles, CheckCircle2, Heart, Award, Users } from 'lucide-react';
import harshProfile from '../../assets/harsh_profile.jpg';

const pillars = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Clean Modular Architecture',
    description: 'Developing maintainable, testable codebases with reusable components, microservice separation, and predictable state.',
    color: 'from-blue-500 to-indigo-600',
    tag: 'Engineering',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI & Real-Time Intelligence',
    description: 'Integrating LLMs (Gemini/OpenAI), computer vision (TensorFlow/MediaPipe), and smart automation into web systems.',
    color: 'from-indigo-600 to-purple-600',
    tag: 'AI First',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Humanized UX & Product Craft',
    description: 'Obsessed with fluid micro-interactions, responsive grids, and delightful typography that makes software a joy to use.',
    color: 'from-cyan-500 to-blue-600',
    tag: 'Design & UX',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Human Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Engineering with <span className="text-gradient">Precision & Empathy</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card with Photo Header (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Profile Intro Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={harshProfile}
                  alt="Harsh Sharma"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-sm"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    Harsh Sharma
                  </h3>
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    MCA Student @ Lovely Professional University
                  </p>
                </div>
              </div>

              <h4 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                I believe software should be fast, thoughtful, and human-first.
              </h4>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                Currently pursuing my <strong className="text-slate-900 dark:text-white font-semibold">Master of Computer Applications (MCA) at LPU</strong> after completing my BCA at Agra College. My journey started with a curiosity for building real things that solve real daily struggles.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Whether it's building <strong className="text-indigo-600 dark:text-indigo-400">MindTrack</strong> to help students overcome focus fatigue using in-browser computer vision, or engineering <strong className="text-indigo-600 dark:text-indigo-400">CargoTrack</strong> to streamline logistics with Java Spring Boot and React, I take pride in every line of code.
              </p>

              {/* Key Capabilities */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Full-Stack React & Next.js',
                  'AI Integrations (Gemini & TensorFlow)',
                  'Java & Spring Boot APIs',
                  'Firebase & PostgreSQL Databases',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Badge */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Education</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">MCA (2025–2027) · BCA (2022–2025)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Pillars (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm card-hover flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-sm`}>
                    {p.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5">
                  {p.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
