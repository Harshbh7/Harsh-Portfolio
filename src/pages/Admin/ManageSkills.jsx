import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ref, onValue, push, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const emptyForm = { name: '', level: 80, category: 'Frontend' };

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'AI & Tools', 'Other'];

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
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
      const dataRef = ref(db, 'skills');
      const unsubscribe = onValue(dataRef, (snap) => {
        const data = snap.val();
        setSkills(data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : []);
        setLoading(false);
      }, (err) => {
        console.warn("Skills load error:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Skills error:", e);
      setLoading(false);
    }
  }, []);


  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  const openModal = (skill = null) => {
    setEditingId(skill?.id || null);
    setFormData(skill ? { name: skill.name, level: skill.level, category: skill.category } : emptyForm);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, level: Number(formData.level), updatedAt: serverTimestamp() };
    try {
      if (editingId) await update(ref(db, `skills/${editingId}`), payload);
      else await push(ref(db, 'skills'), { ...payload, createdAt: serverTimestamp() });
      setIsModalOpen(false);
    } catch { alert('Error saving skill'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) await remove(ref(db, `skills/${id}`));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Manage Skills</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage skill proficiency levels shown in portfolio.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {loading ? (
        <p className="text-[var(--text-muted)] text-sm">Loading...</p>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => grouped[cat]?.length > 0 && (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">{cat}</h3>
              <div className="space-y-3">
                {grouped[cat].map((skill) => (
                  <div key={skill.id} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
                        <span className="text-sm text-[var(--text-muted)]">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openModal(skill)} className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg border border-blue-500/20 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center text-[var(--text-muted)]">No skills added yet.</div>
          )}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Skill</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Skill Name</label>
                  <input required className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g., React.js" />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Category</label>
                  <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">
                    Proficiency Level: <span className="text-blue-400">{formData.level}%</span>
                  </label>
                  <input type="range" min={10} max={100} step={5} className="w-full accent-blue-500" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-800 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary text-sm">Cancel</button>
                  <button type="submit" className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4" /><span>Save Skill</span></button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
