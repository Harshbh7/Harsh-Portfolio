import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedinIcon } from '../common/Icons';
import { ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Sparkles, ThumbsUp, MessageSquare, Share2, Eye } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import harshProfile from '../../assets/harsh_profile.jpg';

const initialLinkedInPosts = [
  {
    id: 'post_1',
    title: 'Milestone: Tech Innovation & Applied Systems',
    date: 'Recently Posted',
    category: 'Tech & Engineering',
    tag: '#SoftwareEngineering #FullStack',
    summary: 'Delighted to share milestone updates on engineering full-stack solutions, distributed architectures, and AI systems. Excited about pushing production-grade web performance.',
    likes: 184,
    comments: 32,
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7490745064512507904?collapsed=1',
  },
  {
    id: 'post_2',
    title: 'Developer Journey & Community Building',
    date: '1 week ago',
    category: 'Community',
    tag: '#Community #WebDev #Growth',
    summary: 'Sharing insights from mentoring 100+ students at Bodh Script Club and organizing hands-on web development bootcamps and workshops across LPU.',
    likes: 215,
    comments: 48,
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7485343062853009408?collapsed=1',
  },
  {
    id: 'post_3',
    title: 'Hackathon Breakthrough & Technical Solutions',
    date: '2 weeks ago',
    category: 'Hackathons',
    tag: '#Innovation #Hackathon',
    summary: 'Building fast under pressure! Key takeaways from prototyping AI & logistics platforms during 36-hour hackathons with rapid iterative engineering.',
    likes: 156,
    comments: 24,
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7469060492959940608?collapsed=1',
  },
  {
    id: 'post_4',
    title: 'System Design & Deep Dive Project Engineering',
    date: '3 weeks ago',
    category: 'Tech & Engineering',
    tag: '#SystemDesign #Architecture',
    summary: 'Architecture breakdown of MindTrack & CargoTrack: combining TensorFlow.js in-browser tracking with Spring Boot microservices and real-time synchronization.',
    likes: 198,
    comments: 39,
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7466534903359111168',
  },
  {
    id: 'post_5',
    title: 'Leadership & Bodh Script Club Highlights',
    date: 'Last month',
    category: 'Community',
    tag: '#Leadership #BodhScriptClub',
    summary: 'Leading tech initiatives and empowering peers at Bodh Script Club. Building verifiable credential systems, event management platforms, and student portals.',
    likes: 240,
    comments: 52,
    directUrl: 'https://www.linkedin.com/in/harshbh7/recent-activity/all/',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7432654311710433280',
  },
  {
    id: 'post_spectra',
    title: 'Spectra — Tech Innovation & Startup Mindset',
    date: 'Featured',
    category: 'Startup & Leadership',
    tag: '#Spectra #TechInnovation #StartupMindset',
    summary: 'Excited to present innovative tech solutions at Spectra! Exploring startup methodologies, user-centric engineering, and product iteration cycles.',
    likes: 172,
    comments: 29,
    directUrl: 'https://www.linkedin.com/posts/harshbh7_spectra-techinnovation-startupmindset-activity-7432439584124305409-2HaC',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7432439584124305409',
  },
  {
    id: 'post_sih',
    title: 'Smart India Hackathon (SIH) — AI & EdTech Innovation',
    date: 'Featured',
    category: 'Hackathons',
    tag: '#SIH #EdTech #AI',
    summary: 'Proud to share our journey at Smart India Hackathon (SIH) designing AI-driven education platforms and smart tracking systems for national-level impact.',
    likes: 310,
    comments: 64,
    directUrl: 'https://www.linkedin.com/posts/harshbh7_sih-edtech-ai-activity-7377625948457791488-ego0',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7377625948457791488',
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
  const [activeEmbedId, setActiveEmbedId] = useState(null);

  useEffect(() => {
    if (!db) return;
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
      }, (err) => {
        console.warn('Firebase linkedin_posts read warning:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase linkedin_posts error:', e);
    }
  }, []);

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
            Verified LinkedIn Activity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Thoughts, Milestones & <span className="text-gradient from-blue-600 to-indigo-600">Tech Stories</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Curated updates, engineering breakdowns, hackathon milestones, and community highlights from LinkedIn.
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
                Full-Stack Developer · AI Integrations · Technical Lead @ Bodh Script Club
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
            <span className="text-slate-400">({posts.length} posts)</span>
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

        {/* Carousel Slide Viewport */}
        <div className="relative min-h-[460px] overflow-hidden">
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
              className="grid md:grid-cols-2 gap-7 items-stretch justify-items-center w-full"
            >
              {currentItems.map((post, index) => {
                const isEmbedActive = activeEmbedId === post.id;
                return (
                  <div
                    key={post.id || index}
                    className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col justify-between overflow-hidden card-hover transition-all"
                  >
                    <div>
                      {/* Author Header */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <img
                            src={harshProfile}
                            alt="Harsh Sharma"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                Harsh Sharma
                              </h4>
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              <span className="text-[11px] font-mono text-slate-400">1st</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {post.date || 'Active Update'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-900/40">
                            {post.category || 'Tech'}
                          </span>
                        </div>
                      </div>

                      {/* Post Title & Content */}
                      <div className="space-y-3 mb-5">
                        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {post.summary}
                        </p>
                        {post.tag && (
                          <p className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                            {post.tag}
                          </p>
                        )}
                      </div>

                      {/* Interactive Live Embed Toggle View */}
                      {isEmbedActive && post.embedUrl && (
                        <div className="mb-5 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2">
                          <iframe
                            src={post.embedUrl}
                            height="480"
                            width="100%"
                            frameBorder="0"
                            allowFullScreen={true}
                            title={post.title}
                            className="w-full rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions & Engagement Metrics */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <ThumbsUp className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                          <span>{post.likes || 180} reactions</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.comments || 30} comments</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={post.directUrl || 'https://www.linkedin.com/in/harshbh7/recent-activity/all/'}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 btn-primary !bg-blue-600 hover:!bg-blue-700 !py-2.5 !px-4 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                          <span>Open on LinkedIn</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {post.embedUrl && (
                          <button
                            onClick={() => setActiveEmbedId(isEmbedActive ? null : post.id)}
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                            title={isEmbedActive ? 'Close Embed' : 'Preview LinkedIn Embed'}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isEmbedActive ? 'Hide' : 'Embed'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* If odd number on last slide, show Follow Banner card */}
              {currentItems.length === 1 && (
                <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-slate-900/90 dark:to-indigo-950/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/80 dark:border-blue-900/60 shadow-md flex flex-col items-center justify-center text-center space-y-6">
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
