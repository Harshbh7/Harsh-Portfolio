import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, Cpu, Eye, Bot, Network, ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/Icons';

const aiProjects = [
  {
    title: 'MindTrack — AI Focus & Attention Tracker',
    description: 'Real-time eye and head-pose attention tracking using TensorFlow.js and MediaPipe inside the browser. Triggers smart alerts during study sessions and includes spaced-repetition flashcards.',
    tags: ['TensorFlow.js', 'MediaPipe', 'React 19', 'WebRTC', 'Firebase'],
    icon: <Eye className="w-6 h-6" />,
    gradient: 'from-blue-600 to-cyan-500',
    stat: '98% Client Accuracy',
    liveUrl: 'https://mind-track-flax.vercel.app/',
    githubUrl: 'https://github.com/Harshbh7/MindTrack',
  },
  {
    title: 'Truth Layer — AI Media & Fact Verifier',
    description: 'Real-time media bias and misinformation detection engine using natural language processing to cross-reference multiple sources and score claim credibility.',
    tags: ['React', 'TypeScript', 'NLP / AI', 'Tailwind CSS'],
    icon: <Bot className="w-6 h-6" />,
    gradient: 'from-indigo-600 to-purple-600',
    stat: 'Real-Time Inference',
    liveUrl: 'https://truth-layer-plum.vercel.app/',
    githubUrl: 'https://github.com/Harshbh7/Truth_Layer',
  },
  {
    title: 'Code Mentor — AI Programming Tutor',
    description: 'Interactive code tutoring environment with AI-powered bug analysis, algorithmic optimization hints, and automated real-time test case generation.',
    tags: ['React', 'TypeScript', 'Gemini / OpenAI', 'Node.js'],
    icon: <Cpu className="w-6 h-6" />,
    gradient: 'from-purple-600 to-pink-500',
    stat: 'Interactive IDE',
    liveUrl: 'https://code-mentor-frontend-five.vercel.app/',
    githubUrl: 'https://github.com/Harshbh7/CodeMentor',
  },
];

export default function AIProjects() {
  return (
    <section id="ai-projects" className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Soft radiant ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Brain className="w-3.5 h-3.5" />
            Applied Machine Intelligence
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            AI & Smart <span className="text-gradient">Systems Engineering</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Where classical software engineering meets generative models, computer vision, and autonomous pipelines.
          </p>
        </motion.div>

        {/* AI Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {aiProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-md card-hover relative overflow-hidden flex flex-col justify-between"
            >
              {/* Accent top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.gradient}`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${project.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {project.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                    {project.stat}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 pb-4 border-t border-slate-100 dark:border-slate-800">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200/60 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 flex-shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Interested in building custom AI features or workflows?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                I integrate multimodal models, local browser vision, and agentic pipelines into web applications.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="btn-primary !py-3 !px-6 text-sm whitespace-nowrap shadow-md"
          >
            <span>Discuss AI Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
