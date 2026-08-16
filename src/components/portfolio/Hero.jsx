import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { 
  ArrowRight, 
  Download, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  Brain,
  Code2,
  Terminal,
  Quote
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import toast from 'react-hot-toast';
import harshProfile from '../../assets/harsh_profile.jpg';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = 'harshbh20102@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard! 📋', {
      duration: 3000,
      style: {
        background: '#ffffff',
        color: '#0f172a',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, sans-serif',
      },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      id="home" 
      className="min-h-[92vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl w-full z-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

        {/* ── Left Column: Cool Typography & Bio (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

          {/* Status Badge */}
          <div className="hero-tag">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                Available for Full-Time Roles & Projects
              </span>
            </div>
          </div>

          {/* Main Display Headline with Lobster Two */}
          <div className="space-y-1 hero-title">
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <span className="font-lobster text-3xl sm:text-4xl lg:text-5xl text-indigo-600 dark:text-indigo-400 font-normal tracking-wide">
                Hi, I'm
              </span>
              <h1 className="font-lobster text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-[1.12]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 underline decoration-indigo-200 dark:decoration-indigo-900 underline-offset-8">
                  Harsh Sharma
                </span>
              </h1>
            </div>

            <p className="font-lobster font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-800 dark:text-slate-100 tracking-wide pt-1">
              Full-Stack Developer
            </p>
          </div>

          {/* Animated Specialized-In Badge with Lobster Two */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs hero-subtitle">
            <span className="font-lobster text-base sm:text-lg text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 font-normal tracking-wide">
              <Terminal className="w-4 h-4" />
              Specialized in:
            </span>
            <TypeAnimation
              sequence={[
                'Real-Time AI & Computer Vision', 2500,
                'React 19 & Next.js Ecosystem', 2000,
                'Java & Spring Boot Backends', 2000,
                'Scalable Cloud & Firebase Apps', 2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              className="font-lobster text-base sm:text-lg font-bold text-indigo-950 dark:text-indigo-100 tracking-wide"
            />
          </div>

          {/* Styled Quote Card featuring Lobster Two font */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-sm border-l-4 border-l-indigo-600 dark:border-l-indigo-500 space-y-2.5 max-w-xl hero-desc">
            <p className="font-lobster text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-relaxed tracking-wide">
              “I build modern web applications that are practical, responsive, and enjoyable to use.”
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800/80">
              Currently pursuing my <strong className="text-slate-900 dark:text-white font-semibold">MCA at Lovely Professional University (LPU)</strong>, passionate about clean component architecture, real-time data, and intelligent AI tools.
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto hero-cta">
            <a
              href="#projects"
              className="btn-primary shadow-lg shadow-indigo-500/25 group w-full sm:w-auto text-center"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              <span>Let's Connect</span>
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-white/90 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Download className="w-4 h-4 text-indigo-500" />
              <span>Resume</span>
            </a>
          </div>

          {/* Verified Social Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 hero-socials">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mr-1">
              Links:
            </span>

            <a
              href="https://github.com/Harshbh7"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/harshbh7/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>harshbh20102@gmail.com</span>
                </>
              )}
            </button>
          </div>


        </div>

        {/* ── Right Column: Interactive Profile Mockup Card (5 cols) ── */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md">
            
            {/* Ambient radiant card glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-purple-500/20 rounded-[32px] blur-xl opacity-75 -z-10" />

            {/* MacOS Window Frame */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
              
              {/* Window Titlebar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  harsh-sharma.dev
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Harsh Real Portrait Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-inner group">
                <img
                  src={harshProfile}
                  alt="Harsh Sharma"
                  className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating overlay tag on photo */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-lg">
                  <p className="font-display font-bold text-sm">Harsh Sharma</p>
                  <p className="text-[11px] font-mono text-slate-300">📍 LPU, Punjab & Agra, UP</p>
                </div>
              </div>

              {/* Quick Tech Pill Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[11px] font-mono text-slate-400">Frontend</p>
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5">React 19 / Next</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[11px] font-mono text-slate-400">Backend</p>
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5">Java / Spring</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[11px] font-mono text-slate-400">AI / Vision</p>
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5">TensorFlow.js</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
