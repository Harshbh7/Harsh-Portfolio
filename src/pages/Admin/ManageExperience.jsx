import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Briefcase, Calendar } from 'lucide-react';
import { ref, onValue, push, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const emptyForm = { role: '', company: '', duration: '', description: '', type: 'Internship' };

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const dataRef = ref(db, 'experience');
      const unsubscribe = onValue(dataRef, (snap) => {
        const data = snap.val();
        setItems(data ? Object.keys(data).map(k => ({ id: k, ...data[k] })).reverse() : []);
        setLoading(false);
      }, (err) => {
        console.warn("Experience load error:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Experience error:", e);
      setLoading(false);
    }
  }, []);


  const openModal = (item = null) => {
    setEditingId(item?.id || null);
    setFormData(item ? { role: item.role, company: item.company, duration: item.duration, description: item.description, type: item.type || 'Internship' } : emptyForm);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, updatedAt: serverTimestamp() };
    try {
      if (editingId) await update(ref(db, `experience/${editingId}`), payload);
      else await push(ref(db, 'experience'), { ...payload, createdAt: serverTimestamp() });
      setIsModalOpen(false);
    } catch (err) { alert('Error saving'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this entry?')) await remove(ref(db, `experience/${id}`));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Manage Experience</h2>
          <p className="text-[var(--text-muted)] text-sm">Add internships and work experiences.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </div>

      {loading ? (
        <div className="text-[var(--text-muted)] text-sm">Loading...</div>
      ) : items.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-[var(--text-muted)]">No experience entries yet. Add your first one!</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-500/15 rounded-xl flex items-center justify-center flex-shrink-0"><Briefcase className="w-5 h-5 text-blue-400" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-[var(--text-primary)]">{item.role}</h3>
                  <span className="text-xs px-2 py-0.5 bg-purple-500/15 text-purple-400 border border-purple-500/25 rounded-full">{item.type}</span>
                </div>
                <p className="text-blue-400 text-sm font-medium">{item.company}</p>
                <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs mt-1">
                  <Calendar className="w-3 h-3" />{item.duration}
                </div>
                <p className="text-[var(--text-secondary)] text-sm mt-2 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg border border-blue-500/20 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Experience</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Role / Title</label>
                    <input required className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="Full Stack Developer Intern" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Company</label>
                    <input required className="input-field" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="ABC Tech Pvt. Ltd." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Duration</label>
                    <input required className="input-field" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="Jan 2024 – Apr 2024" />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Type</label>
                    <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Description</label>
                  <textarea required className="input-field min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe what you did..." />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-800 mt-4">
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
