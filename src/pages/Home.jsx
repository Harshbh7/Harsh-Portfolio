import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { initAllGSAP } from '../utils/gsapAnimations';

// Clean Modern UI Background
import ModernBackground from '../components/common/ModernBackground';

// Utilities
import Navbar from '../components/common/Navbar';
import ScrollProgress from '../components/common/ScrollProgress';
import BackToTop from '../components/common/BackToTop';
import SEO from '../components/common/SEO';

// Portfolio Sections
import Hero from '../components/portfolio/Hero';
import StatsCounter from '../components/portfolio/StatsCounter';
import About from '../components/portfolio/About';
import Education from '../components/portfolio/Education';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import AIProjects from '../components/portfolio/AIProjects';
import GitHubStats from '../components/portfolio/GitHubStats';
import LinkedInFeed from '../components/portfolio/LinkedInFeed';
import Experience from '../components/portfolio/Experience';
import Certifications from '../components/portfolio/Certifications';
import Contact from '../components/portfolio/Contact';
import AIChatbot from '../components/portfolio/AIChatbot';

export default function Home() {
  useEffect(() => {
    const cleanup = initAllGSAP();
    return cleanup;
  }, []);

  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen text-[var(--text-primary)] font-body mesh-bg transition-colors duration-300 relative selection:bg-indigo-500/20 selection:text-indigo-900">
        {/* ── Ultra-Modern Clean UI Aurora & Dot Matrix Background ── */}
        <ModernBackground />

        {/* ── UI Enhancements ── */}
        <ScrollProgress />
        <BackToTop />
        <AIChatbot />
        <Toaster position="bottom-left" />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <StatsCounter />
          <About />
          <Skills />
          <Projects />
          <AIProjects />
          <GitHubStats />
          <LinkedInFeed />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        {/* ── Footer ── */}
        <footer className="py-12 px-6 text-center border-t border-slate-200/80 dark:border-slate-800/80 relative z-10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <p>
              © {new Date().getFullYear()} <span className="font-bold text-slate-800 dark:text-white">Harsh Sharma</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
              <a href="#linkedin-feed" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
              <a href="/admin/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Admin Portal</a>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
