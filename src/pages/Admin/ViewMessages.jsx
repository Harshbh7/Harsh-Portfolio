import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { Mail, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const msgRef = ref(db, 'contacts');
      const unsubscribe = onValue(msgRef, (snap) => {
        const data = snap.val();
        if (data) {
          const list = Object.keys(data).map(k => ({ id: k, ...data[k] }));
          list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          setMessages(list);
        } else {
          setMessages([]);
        }
        setLoading(false);
      }, (err) => {
        console.warn("Messages load error:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Messages error:", e);
      setLoading(false);
    }
  }, []);


  const toggleRead = async (id, current) => {
    await update(ref(db, `contacts/${id}`), { read: !current });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Contact Messages</h2>
          <p className="text-[var(--text-muted)] text-sm">
            {unreadCount > 0
              ? <span className="text-blue-400 font-medium">{unreadCount} unread</span>
              : 'All messages read'}
            {' '}— {messages.length} total
          </p>
        </div>
        <div className="w-10 h-10 bg-blue-500/15 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      {loading ? (
        <p className="text-[var(--text-muted)] text-sm">Loading...</p>
      ) : messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-[var(--text-muted)]">No messages yet!</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-xl overflow-hidden border transition-colors ${!msg.read ? 'border-blue-500/30' : 'border-[var(--border)]'}`}
            >
              <div
                className="p-5 cursor-pointer flex items-start gap-4"
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              >
                {/* Unread dot */}
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${!msg.read ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-gray-600'}`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-[var(--text-primary)]">{msg.name}</span>
                    <span className="text-[var(--text-muted)] text-sm">·</span>
                    <span className="text-[var(--text-muted)] text-sm">{msg.email}</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 border border-blue-500/25 rounded-full text-xs">New</span>
                    )}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-1">{msg.message}</p>
                  {msg.timestamp && (
                    <p className="text-[var(--text-muted)] text-xs mt-1">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleRead(msg.id, msg.read); }}
                  className="p-1.5 text-[var(--text-muted)] hover:text-blue-400 transition-colors flex-shrink-0"
                  title={msg.read ? 'Mark unread' : 'Mark read'}
                >
                  {msg.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded message */}
              {expanded === msg.id && (
                <div className="px-5 pb-5 pt-0 bg-white/2 border-t border-[var(--border)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4 whitespace-pre-wrap">{msg.message}</p>
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your message&body=Hi ${msg.name},%0A%0A`}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
                  >
                    <Mail className="w-4 h-4" /> Reply via Email
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
