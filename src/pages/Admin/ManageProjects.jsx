import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Image as ImageIcon } from 'lucide-react';
import { ref, onValue, push, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    techStack: '',
    isVisible: true,
  });

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const projectsRef = ref(db, 'projects');
      const unsubscribe = onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const projectList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setProjects(projectList);
        } else {
          setProjects([]);
        }
        setLoading(false);
      }, (err) => {
        console.warn("ManageProjects load error:", err);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("ManageProjects error:", e);
      setLoading(false);
    }
  }, []);


  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        imageUrl: project.imageUrl || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        techStack: project.techStack ? Object.values(project.techStack).join(', ') : '',
        isVisible: project.isVisible !== false,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', techStack: '', isVisible: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(item => item.trim()).filter(i => i),
      updatedAt: serverTimestamp()
    };

    try {
      if (editingId) {
        await update(ref(db, `projects/${editingId}`), payload);
      } else {
        payload.createdAt = serverTimestamp();
        await push(ref(db, 'projects'), payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await remove(ref(db, `projects/${id}`));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const toggleVisibility = async (id, currentStatus) => {
    try {
      await update(ref(db, `projects/${id}`), { isVisible: !currentStatus });
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Manage Projects</h2>
          <p className="text-gray-400">Add, update, or remove projects from your portfolio.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading projects...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl overflow-hidden border border-gray-700/50 flex flex-col">
              <div className="h-40 relative">
                <img 
                  src={project.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={project.title} 
                  className={`w-full h-full object-cover ${project.isVisible ? '' : 'grayscale opacity-50'}`}
                />
                <button 
                  onClick={() => toggleVisibility(project.id, project.isVisible !== false)}
                  className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                  title={project.isVisible !== false ? "Hide Project" : "Show Project"}
                >
                  {project.isVisible !== false ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{project.description}</p>
                <div className="flex gap-2 justify-end mt-auto border-t border-gray-700/50 pt-4">
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-blue-500/20"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Project Title</label>
                    <input 
                      required type="text" 
                      className="input-field" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="React, Firebase, Tailwind"
                      value={formData.techStack} 
                      onChange={e => setFormData({...formData, techStack: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <textarea 
                    required 
                    className="input-field min-h-[100px]" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" /> Image URL
                  </label>
                  <input 
                    type="url" 
                    className="input-field" 
                    placeholder="https://..."
                    value={formData.imageUrl} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">GitHub URL</label>
                    <input 
                      type="url" 
                      className="input-field" 
                      value={formData.githubUrl} 
                      onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Live URL</label>
                    <input 
                      type="url" 
                      className="input-field" 
                      value={formData.liveUrl} 
                      onChange={e => setFormData({...formData, liveUrl: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <input 
                    type="checkbox" 
                    id="isVisible" 
                    checked={formData.isVisible}
                    onChange={e => setFormData({...formData, isVisible: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="isVisible" className="ml-2 text-sm font-medium text-gray-300">
                    Visible on Public Portfolio
                  </label>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
                  <button type="button" onClick={handleCloseModal} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex items-center">
                    <Save className="w-4 h-4 mr-2" /> Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
