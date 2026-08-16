import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedinIcon } from '../common/Icons';
import { ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import harshProfile from '../../assets/harsh_profile.jpg';

const initialLinkedInPosts = [
  {
    id: 'post_1',
    title: 'Milestone: Tech Innovation & Applied Systems',
    category: 'Tech & Engineering',
    tag: '#SoftwareEngineering #FullStack',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7490745064512507904?collapsed=1',
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    height: '668',
  },
  {
    id: 'post_2',
    title: 'Developer Journey & Community Building',
    category: 'Community',
    tag: '#Community #WebDev #Growth',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7485343062853009408?collapsed=1',
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    height: '614',
  },
  {
    id: 'post_3',
    title: 'Hackathon Breakthrough & Technical Solutions',
    category: 'Hackathons',
    tag: '#Innovation #Hackathon',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7469060492959940608?collapsed=1',
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    height: '601',
  },
  {
    id: 'post_4',
    title: 'System Design & Deep Dive Project Engineering',
    category: 'Tech & Engineering',
    tag: '#SystemDesign #Architecture',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7466534903359111168',
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    height: '750',
  },
  {
    id: 'post_5',
    title: 'Leadership & Bodh Script Club Highlights',
    category: 'Community',
    tag: '#Leadership #BodhScriptClub',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7432654311710433280',
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    height: '548',
  },
  {
    id: 'post_spectra',
    title: 'Spectra — Tech Innovation & Startup Mindset',
    category: 'Startup & Leadership',
    tag: '#Spectra #TechInnovation #StartupMindset',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7432439584124305409',
    directUrl: 'https://www.linkedin.com/posts/harshbh7_spectra-techinnovation-startupmindset-activity-7432439584124305409-2HaC',
    height: '620',
  },
  {
    id: 'post_sih',
    title: 'Smart India Hackathon (SIH) — AI & EdTech Innovation',
    category: 'Hackathons',
    tag: '#SIH #EdTech #AI',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7377625948457791488',
    directUrl: 'https://www.linkedin.com/posts/harshbh7_sih-edtech-ai-activity-7377625948457791488-ego0',
    height: '620',
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function LinkedInFeed() {
  const [posts, setPosts] = useState(initialLinkedInPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    try {
      const postsRef = ref(db, 'linkedin_posts');
      const unsubscribe = onValue(postsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list = Array.isArray(data) ? data : Object.values(data);
          if (list.length > 0) {
            setPosts(list);
          }
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase linkedin_posts read error:', e);
    }
  }, []);

  // Compute 2 items per page for Desktop carousel
  const itemsPerPage = 2;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const nextPage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = posts.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="linkedin-feed" className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Tag & Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag !bg-blue-50 dark:!bg-blue-950/60 !text-blue-600 dark:!text-blue-400 !border-blue-200/60 dark:!border-blue-800/60">
            <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
            Verified LinkedIn Activity Slider
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Thoughts, Milestones & <span className="text-gradient from-blue-600 to-indigo-600">Tech Stories</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Swipe and slide through live LinkedIn posts on hackathons, system architectures, and community initiatives.
          </p>
        </motion.div>

        {/* Profile Card Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="relative">
              <img
                src={harshProfile}
                alt="Harsh Sharma"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-900 shadow-2xs">
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Harsh Sharma
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
                  @harshbh7
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
                Full-Stack Developer · AI Integrations · Lead @ Bodh Script Club
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/harshbh7/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary !bg-blue-600 hover:!bg-blue-700 !py-3 !px-6 text-sm font-semibold shadow-md shadow-blue-500/20 whitespace-nowrap"
            >
              <LinkedinIcon className="w-4 h-4 text-white" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Carousel Header Controls */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">
              Slide {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(totalPages).padStart(2, '0')}</span>
            <span className="text-slate-400">({posts.length} total posts)</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextPage}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Viewport (2 Posts per Slide) */}
        <div className="relative min-h-[640px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 260, damping: 28 },
                opacity: { duration: 0.25 },
              }}
              className="grid md:grid-cols-2 gap-8 items-start justify-items-center w-full"
            >
              {currentItems.map((post, index) => (
                <div
                  key={post.id || index}
                  className="w-full max-w-[530px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col items-center overflow-hidden card-hover"
                >
                  {/* Header of post */}
                  <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold truncate">
                      <LinkedinIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{post.title || `Post #${index + 1}`}</span>
                    </div>

                    <a
                      href={post.directUrl || 'https://www.linkedin.com/in/harshbh7/recent-activity/all/'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-bold flex-shrink-0 ml-2"
                    >
                      <span>View Post</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* LinkedIn Iframe Container */}
                  <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950/40 p-1 min-h-[480px]">
                    <iframe
                      src={post.embedUrl}
                      height={post.height || '620'}
                      width="100%"
                      style={{
                        maxWidth: '504px',
                        border: 'none',
                        borderRadius: '16px',
                        minHeight: `${Math.min(parseInt(post.height || 620, 10), 750)}px`,
                      }}
                      frameBorder="0"
                      allowFullScreen={true}
                      title={post.title || `LinkedIn Post ${index + 1}`}
                      className="w-full shadow-2xs"
                    />
                  </div>

                  {/* Tag footer */}
                  {post.tag && (
                    <div className="w-full pt-3 mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{post.tag}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-medium">@harshbh7</span>
                    </div>
                  )}
                </div>
              ))}

              {/* If odd number on last slide, show Follow Banner card */}
              {currentItems.length === 1 && (
                <div className="w-full max-w-[530px] h-full min-h-[550px] bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-slate-900/90 dark:to-indigo-950/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/80 dark:border-blue-900/60 shadow-md flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <LinkedinIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                      Stay Updated with My Latest Posts
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-sm">
                      I regularly write about Full-Stack architecture, AI tools, and student community initiatives.
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/harshbh7/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary !bg-blue-600 hover:!bg-blue-700 !py-3.5 !px-8 text-sm font-semibold shadow-md shadow-blue-500/20"
                  >
                    <span>Follow Harsh on LinkedIn</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-blue-600 shadow-xs'
                  : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* View all on LinkedIn Footer Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.linkedin.com/in/harshbh7/recent-activity/all/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-600" />
            <span>Open All Activity on LinkedIn (harshbh7)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
