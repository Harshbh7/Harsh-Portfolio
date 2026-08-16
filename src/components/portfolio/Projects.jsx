import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Filter, X, Sparkles, Code2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const ALL_TAGS = ['All', 'React', 'TypeScript', 'JavaScript', 'Java', 'PHP', 'Python', 'Firebase', 'AI', 'Full Stack'];

const DEFAULT_PROJECTS = [
  {
    id: "proj_01",
    title: "MindTrack",
    description: "AI-powered study & attention tracking platform with in-browser eye & head-pose tracking using TensorFlow.js and MediaPipe. Features spaced repetition (SRS) flashcards, productivity streaks, and analytics.",
    techStack: ["React", "TypeScript", "TensorFlow.js", "MediaPipe", "Firebase"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/MindTrack",
    liveUrl: "https://mind-track-flax.vercel.app/",
    imageUrl: "/projects/mindtrack.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_02",
    title: "CargoTrack",
    description: "Full-stack cargo & freight shipment tracker with live GPS status, customer tracking portal, admin driver dispatch, and Razorpay payment integration.",
    techStack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Razorpay"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/CargoTrack_Backend",
    liveUrl: "https://cargo-track-ui.vercel.app/",
    imageUrl: "/projects/cargotrack.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_03",
    title: "Bodh Script Club",
    description: "Official tech community platform for Bodh Script Club at LPU. Features member registration, event ticketing with QR codes, certificate generator & verification, and admin dashboard.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS", "GSAP"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/Bodh_Script_Club",
    liveUrl: "https://bodh-script-club-three.vercel.app/",
    imageUrl: "/projects/bodh_script_club.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_04",
    title: "Flipkart Clone Frontend",
    description: "Modern, responsive e-commerce web interface inspired by Flipkart. Includes rich product catalog, category filters, interactive cart flow, and sleek responsive design.",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    category: "Frontend",
    githubUrl: "https://github.com/Harshbh7/FlipKart",
    liveUrl: "https://flip-kart-frontend-three.vercel.app",
    imageUrl: "/projects/flipkart.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_05",
    title: "Truth Layer",
    description: "Intelligent fact-checking and news verification platform utilizing natural language processing to detect media bias, fact discrepancies, and misinformation in real time.",
    techStack: ["React", "TypeScript", "AI / NLP", "Tailwind CSS"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/Truth_Layer",
    liveUrl: "https://truth-layer-plum.vercel.app/",
    imageUrl: "/projects/truth_layer.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_06",
    title: "Code Mentor",
    description: "AI-assisted programming mentor and interactive code tutoring environment. Provides real-time code reviews, bug suggestions, and guided programming exercises.",
    techStack: ["React", "TypeScript", "OpenAI / Gemini API", "Node.js"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/CodeMentor",
    liveUrl: "https://code-mentor-frontend-five.vercel.app/",
    imageUrl: "/projects/code_mentor.png",
    isVisible: true,
    featured: true,
  },
  {
    id: "proj_07",
    title: "CodeMate / CodeEdito",
    description: "In-browser collaborative code editor with real-time syntax highlighting, multiple language support, and live split-screen preview for frontend development.",
    techStack: ["React", "TypeScript", "Monaco Editor", "Tailwind CSS"],
    category: "Tool",
    githubUrl: "https://github.com/Harshbh7/CodeEdito",
    liveUrl: "https://code-edito-two.vercel.app/",
    imageUrl: "/projects/code_edito.png",
    isVisible: true,
    featured: false,
  },
  {
    id: "proj_08",
    title: "College Portal",
    description: "Comprehensive university and college student-faculty portal. Includes course management, timetable scheduling, academic notices, and student profile tracking.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/College_Portal",
    liveUrl: "https://college-lemon.vercel.app/",
    imageUrl: "/projects/college.png",
    isVisible: true,
    featured: false,
  },
  {
    id: "proj_09",
    title: "YourShop",
    description: "Full-featured online shopping application with customer cart flow, categorized merchandise, discount codes, and seamless checkout experience.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    category: "Web App",
    githubUrl: "https://github.com/Harshbh7/YourShop",
    liveUrl: "https://your-shop-three.vercel.app/",
    imageUrl: "/projects/yourshop.png",
    isVisible: true,
    featured: false,
  },
  {
    id: "proj_10",
    title: "EPraman",
    description: "Digital document and certificate authentication platform with cryptographic QR verification, automated stamp rendering, and tamper-evident audit history.",
    techStack: ["React", "JavaScript", "Firebase", "Crypto / QR"],
    category: "Tool",
    githubUrl: "https://github.com/Harshbh7/EPraman",
    liveUrl: "https://praman-mu.vercel.app/",
    imageUrl: "/projects/epraman.png",
    isVisible: true,
    featured: false,
  },
  {
    id: "proj_11",
    title: "Hospital OPD Management",
    description: "Outpatient department (OPD) medical management system with patient records, doctor scheduling, appointment queues, and prescription tracking.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "AJAX"],
    category: "Backend",
    githubUrl: "https://github.com/Harshbh7/Hospital_Management",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    isVisible: true,
    featured: false,
  },
  {
    id: "proj_12",
    title: "BillMeUp",
    description: "Restaurant point-of-sale (POS) and automated invoice billing platform. Features menu item management, fast order tallying, bill printing, and sales reporting.",
    techStack: ["Java", "Swing", "MySQL", "JDBC"],
    category: "Desktop",
    githubUrl: "https://github.com/Harshbh7/BillMeUp",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    isVisible: true,
    featured: false,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!db) {
      setProjects(DEFAULT_PROJECTS);
      setLoading(false);
      return;
    }

    try {
      const projectsRef = ref(db, 'projects');
      const unsubscribe = onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data && Object.keys(data).length > 0) {
          const projectList = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter(p => p.isVisible !== false);
          setProjects(projectList);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
        setLoading(false);
      }, (error) => {
        console.warn("Firebase projects fetch error, using default projects:", error);
        setProjects(DEFAULT_PROJECTS);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase projects error:", e);
      setProjects(DEFAULT_PROJECTS);
      setLoading(false);
    }
  }, []);


  const filtered = projects.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const techArr = Array.isArray(p.techStack) ? p.techStack : Object.values(p.techStack || {});
    const matchFilter = activeFilter === 'All' ||
      techArr.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
      p.category?.toLowerCase().includes(activeFilter.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Selected Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Featured <span className="text-gradient">Creations & Systems</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Engineered across web, AI integrations, desktop systems, and distributed platforms.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 space-y-4"
        >
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects by name, tech or keywords..."
              className="input-field pl-11 pr-10 bg-white/90 dark:bg-slate-900/90 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeFilter === tag
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Counter */}
        {!loading && (
          <p className="text-center text-xs font-mono text-slate-500 dark:text-slate-400 mb-8">
            SHOWING <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filtered.length}</span> OF {projects.length} PROJECTS
          </p>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
                <div className="space-y-3 px-2">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              No matching projects found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try searching for a different keyword or reset active filters.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveFilter('All'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence>
              {filtered.map((project, index) => {
                const techArr = Array.isArray(project.techStack)
                  ? project.techStack
                  : Object.values(project.techStack || {});
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    onClick={() => setSelectedProject(project)}
                    className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-md card-hover cursor-pointer flex flex-col justify-between"
                  >
                    {/* Media Thumbnail */}
                    <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-indigo-600/90 text-white text-[11px] font-mono font-bold rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
                            ⭐ FEATURED
                          </span>
                        </div>
                      )}

                      {/* External Quick Action Links */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-slate-900/80 text-white hover:bg-indigo-600 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                            title="View Source Code"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {techArr.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200/60 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {techArr.length > 4 && (
                          <span className="text-[11px] font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-md font-semibold">
                            +{techArr.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Cover Image */}
              <div className="h-60 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.category && (
                      <span className="inline-block mt-1.5 text-xs font-mono font-semibold px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
                        {selectedProject.category}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary !py-2 !px-4 text-xs font-mono flex items-center gap-1.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary !py-2 !px-4 text-xs font-mono flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                    Overview & Architecture
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-3">
                    Technologies & Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedProject.techStack)
                      ? selectedProject.techStack
                      : Object.values(selectedProject.techStack || {})
                    ).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
