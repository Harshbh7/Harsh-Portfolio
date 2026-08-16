import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Award } from 'lucide-react';
import { ref, onValue, push, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const ICONS = ['🏆', '🎓', '📜', '⚛️', '🔥', '☕', '🐘', '🤖', '🌐', '🏅', '💡', '🛡️'];
const COLORS = [
  'from-blue-600 to-cyan-400',
  'from-purple-600 to-pink-500',
  'from-green-500 to-emerald-400',
  'from-orange-500 to-yellow-400',
  'from-red-500 to-orange-400',
  'from-indigo-500 to-purple-500',
];
const empty = { title: '', issuer: '', date: '', url: '', icon: '🏆', color: 'from-blue-600 to-cyan-400' };

export default function ManageCertifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(empty);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const unsubscribe = onValue(ref(db, 'certifications'), (snap) => {
        const data = snap.val();
        setCerts(data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : []);
        setLoading(false);
      }, (err) => {
        console.warn("Certifications load error:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Certifications error:", e);
      setLoading(false);
    }
  }, []);


  const openModal = (cert = null) => {
    setEditingId(cert?.id || null);
    setFormData(cert ? { title: cert.title, issuer: cert.issuer, date: cert.date, url: cert.url || '', icon: cert.icon || '🏆', color: cert.color || 'from-blue-600 to-cyan-400' } : empty);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await update(ref(db, `certifications/${editingId}`), { ...formData, updatedAt: serverTimestamp() });
      else await push(ref(db, 'certifications'), { ...formData, createdAt: serverTimestamp() });
      setIsModalOpen(false);
    } catch { alert('Error saving'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete certification?')) await remove(ref(db, `certifications/${id}`));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Certifications</h2>
          <p className="text-[var(--text-muted)] text-sm">Add your course completions and badges.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {loading ? <p className="text-[var(--text-muted)] text-sm">Loading...</p> :
        certs.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-[var(--text-muted)]">No certifications yet. Add your first one!</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {certs.map(cert => (
              <div key={cert.id} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${cert.color || 'from-blue-600 to-cyan-400'} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {cert.icon || '🏆'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate">{cert.title}</h4>
                  <p className="text-blue-400 text-xs">{cert.issuer} · {cert.date}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openModal(cert)} className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Certification</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Certificate Title</label>
                    <input required className="input-field" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="React – The Complete Guide" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Issuing Platform</label>
                    <input required className="input-field" value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} placeholder="Udemy / Coursera / Google" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Year</label>
                    <input required className="input-field" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="2024" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Certificate URL (optional)</label>
                    <input className="input-field" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} placeholder="https://coursera.org/..." />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-2 block">Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map(icon => (
                      <button key={icon} type="button" onClick={() => setFormData({ ...formData, icon })}
                        className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border-2 transition-colors ${formData.icon === icon ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}>
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-2 block">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(color => (
                      <button key={color} type="button" onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} border-2 transition-all ${formData.color === color ? 'border-white scale-110' : 'border-transparent'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary text-sm">Cancel</button>
                  <button type="submit" className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4" /><span>Save</span></button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
