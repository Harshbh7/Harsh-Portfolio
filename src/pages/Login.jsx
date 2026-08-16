import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, KeyRound, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('harshbh20102@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    navigate('/admin/dashboard');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back, Harsh! 🚀');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid Admin credentials.');
      toast.error('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Back to Website button */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-all shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Portfolio</span>
      </Link>

      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Admin Access
          </h2>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            Harsh Sharma Portfolio CMS
          </p>
        </div>

        {/* Error message banner */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Single Clean Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Admin ID / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harshbh20102@gmail.com"
                required
                className="input-field pl-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="input-field pl-11"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-indigo-500/25 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Logging In...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Single Master Admin Secured</span>
        </div>
      </div>
    </div>
  );
}
