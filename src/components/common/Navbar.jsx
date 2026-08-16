import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import harshProfile from '../../assets/harsh_profile.jpg';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Work', href: '#ai-projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-400 w-full max-w-5xl rounded-2xl sm:rounded-full px-4 sm:px-7 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-panel shadow-lg border-[var(--border)] scale-[0.98]'
            : 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-sm'
        }`}
      >
        {/* Profile Avatar & Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <img
              src={harshProfile}
              alt="Harsh Sharma"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600/30 group-hover:border-indigo-600 transition-all shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
              Harsh Sharma
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Full-Stack & AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 transition-all"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-slate-200 dark:border-slate-700 cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Admin Link */}
          <Link
            to="/admin/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>Admin</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden fixed top-20 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 z-50"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <img
                src={harshProfile}
                alt="Harsh Sharma"
                className="w-10 h-10 rounded-full object-cover border border-indigo-500"
              />
              <div>
                <p className="font-display font-bold text-sm text-slate-900 dark:text-white">Harsh Sharma</p>
                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Available for Opportunities</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all flex items-center justify-between"
                >
                  <span>{label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
