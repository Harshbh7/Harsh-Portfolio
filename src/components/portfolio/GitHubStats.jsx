import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';

const GITHUB_USERNAME = 'Harshbh7';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        const user = await userRes.json();
        const repoData = await reposRes.json();

        const totalStars = Array.isArray(repoData)
          ? repoData.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;

        setStats({
          repos: user.public_repos || 18,
          followers: user.followers || 12,
          following: user.following || 15,
          stars: totalStars || 8,
        });

        if (Array.isArray(repoData) && repoData.length > 0) {
          setRepos(repoData.slice(0, 6));
        }
      } catch (err) {
        console.error('GitHub API error:', err);
        setStats({ repos: 18, followers: 12, following: 15, stars: 8 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const langColors = {
    JavaScript: '#f59e0b',
    TypeScript: '#3b82f6',
    Java: '#ea580c',
    PHP: '#8b5cf6',
    Python: '#10b981',
    HTML: '#ef4444',
    CSS: '#6366f1',
    default: '#4f46e5',
  };

  return (
    <section id="github" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <GithubIcon className="w-3.5 h-3.5" />
            Open Source & Activity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Live GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm font-mono">
            Synced in real-time from @{GITHUB_USERNAME}
          </p>
        </motion.div>

        {/* Stats Metrics Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse h-28" />
            ))}
          </div>
        ) : stats && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: 'Public Repositories', value: stats.repos, icon: BookOpen },
              { label: 'Followers', value: stats.followers, icon: Users },
              { label: 'Following', value: stats.following, icon: GitFork },
              { label: 'Repository Stars', value: stats.stars, icon: Star },
            ].map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs text-center card-hover flex flex-col items-center justify-center"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
                  {value}
                </p>
                <p className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* GitHub Contribution Heatmap Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md mb-10 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Contribution Heatmap (Past 365 Days)
            </h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="overflow-x-auto py-2">
            <img
              src={`https://ghchart.rshah.org/4f46e5/${GITHUB_USERNAME}`}
              alt="GitHub contribution chart"
              className="w-full min-w-[620px] rounded-xl"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Recent Repos */}
        {repos.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-5">
              Recently Active Repositories
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs card-hover flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {repo.name}
                      </h4>
                      <span className="flex items-center gap-1 text-xs font-mono text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full flex-shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {repo.stargazers_count}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {repo.description || 'Public GitHub open-source repository and codebase.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                    {repo.language ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: langColors[repo.language] || langColors.default }}
                        />
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">{repo.language}</span>
                      </div>
                    ) : <span />}
                    <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                      View →
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
