import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, Briefcase, Award, Code2, Mail, Menu, X, BookMarked } from 'lucide-react';
import ManageProjects from './ManageProjects';
import ManageExperience from './ManageExperience';
import ManageSkills from './ManageSkills';
import ViewMessages from './ViewMessages';
import ManageCertifications from './ManageCertifications';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const navItems = [
  { label: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Projects', path: '/admin/projects', icon: <Code2 className="w-5 h-5" /> },
  { label: 'Experience', path: '/admin/experience', icon: <Briefcase className="w-5 h-5" /> },
  { label: 'Skills', path: '/admin/skills', icon: <Award className="w-5 h-5" /> },
  { label: 'Certifications', path: '/admin/certifications', icon: <BookMarked className="w-5 h-5" /> },
  { label: 'Messages', path: '/admin/messages', icon: <Mail className="w-5 h-5" />, badge: true },
];

function OverviewPage() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0, experience: 0 });

  useEffect(() => {
    if (!db) return;
    try {
      const listeners = [
        ['projects', (d) => setStats(s => ({ ...s, projects: d ? Object.keys(d).length : 0 }))],
        ['contacts', (d) => {
          if (!d) return;
          const all = Object.values(d);
          setStats(s => ({ ...s, messages: all.length, unread: all.filter(m => !m.read).length }));
        }],
        ['experience', (d) => setStats(s => ({ ...s, experience: d ? Object.keys(d).length : 0 }))],
      ];

      const unsubs = listeners.map(([path, cb]) =>
        onValue(ref(db, path), snap => cb(snap.val()), err => console.warn(err))
      );
      return () => unsubs.forEach(u => typeof u === "function" && u());
    } catch (e) {
      console.warn("Admin stats error:", e);
    }
  }, []);


  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: <Code2 className="w-6 h-6" />, color: 'from-blue-600 to-cyan-500', path: '/admin/projects' },
    { label: 'Experience', value: stats.experience, icon: <Briefcase className="w-6 h-6" />, color: 'from-purple-600 to-pink-500', path: '/admin/experience' },
    { label: 'Messages', value: stats.messages, icon: <Mail className="w-6 h-6" />, color: 'from-green-600 to-emerald-400', path: '/admin/messages' },
    { label: 'Unread Messages', value: stats.unread, icon: <Mail className="w-6 h-6" />, color: 'from-orange-500 to-red-500', path: '/admin/messages' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold mb-2">Welcome back, Admin 👋</h2>
        <p className="text-[var(--text-muted)] text-sm">Here's a snapshot of your portfolio dashboard.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon, color, path }) => (
          <Link to={path} key={label} className="glass rounded-2xl p-5 card-hover flex flex-col gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              {icon}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">{value}</p>
              <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="glass rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/projects" className="btn-primary text-sm flex items-center gap-2"><Code2 className="w-4 h-4" /><span>Add Project</span></Link>
          <Link to="/admin/experience" className="btn-secondary text-sm flex items-center gap-2"><Briefcase className="w-4 h-4" /> Add Experience</Link>
          <Link to="/admin/messages" className="btn-secondary text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> View Messages</Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'contacts'), (snap) => {
      const data = snap.val();
      setUnread(data ? Object.values(data).filter(m => !m.read).length : 0);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 glass border-r border-[var(--border)] flex flex-col z-20 min-h-screen`}>
        {/* Logo */}
        <div className="p-5 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/" className="font-mono text-lg font-bold">
              <span className="text-blue-500">&lt;</span>Admin<span className="text-blue-500">/&gt;</span>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-white ml-auto">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div className="px-5 pb-5 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm border border-blue-500/30">H</div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">Harsh Sharma</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ label, path, icon, badge }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium relative ${
                isActive(path) ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
              }`}
              title={!sidebarOpen ? label : undefined}
            >
              {icon}
              {sidebarOpen && <span className="text-sm">{label}</span>}
              {badge && unread > 0 && sidebarOpen && (
                <span className="ml-auto px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full font-bold">{unread}</span>
              )}
              {badge && unread > 0 && !sidebarOpen && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 pb-6">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium ${!sidebarOpen ? 'justify-center' : ''}`}
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="dashboard" element={<OverviewPage />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="messages" element={<ViewMessages />} />
            <Route path="certifications" element={<ManageCertifications />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
