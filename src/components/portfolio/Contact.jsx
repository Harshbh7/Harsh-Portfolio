import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail as MailIcon, Sparkles, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import toast from 'react-hot-toast';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'harshbh20102@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Firebase Realtime Database
      try {
        const messagesRef = ref(db, 'contacts');
        await push(messagesRef, {
          ...formData,
          timestamp: serverTimestamp(),
          read: false,
        });
      } catch (dbErr) {
        console.warn('Firebase DB warning:', dbErr);
      }

      // 2. Dispatch via SMTP API endpoint
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (!res.ok) {
          console.warn('SMTP API response error:', result);
        }
      } catch (apiErr) {
        console.warn('SMTP fetch error:', apiErr);
      }

      toast.success('Message received! An email notification has been sent 🚀', {
        duration: 5000,
        style: {
          background: '#ffffff',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -10px rgba(79,70,229,0.15)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
        },
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      toast.error('Could not send message. Please email me directly at ' + CONTACT_EMAIL, {
        style: {
          background: '#ffffff',
          color: '#991b1b',
          border: '1px solid #fecaca',
          borderRadius: '16px',
          fontFamily: 'Inter, sans-serif',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <MessageSquare className="w-3.5 h-3.5" />
            Let's Collaborate
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Have a project in mind, an engineering opportunity, or just want to connect? Let's build something remarkable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Cards */}
            {[
              {
                icon: <LinkedinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                label: 'LinkedIn Profile',
                value: 'linkedin.com/in/harshbh7',
                href: 'https://www.linkedin.com/in/harshbh7/',
              },
              {
                icon: <MailIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
                label: 'Direct Email',
                value: CONTACT_EMAIL,
                href: `mailto:${CONTACT_EMAIL}`,
              },
              {
                icon: <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
                label: 'Current Location',
                value: 'Lovely Professional University (LPU), Punjab, India',
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4 card-hover"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-slate-900 dark:text-white font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm sm:text-base truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Response Guarantee Box */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
                <span>Response Time Guarantee</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                I actively check messages and typically respond within <strong className="text-slate-900 dark:text-white font-semibold">24 hours</strong>. For instant messaging, reach out via LinkedIn or GitHub.
              </p>
            </div>
          </motion.div>

          {/* Right Contact Form (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="alex@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-y min-h-[130px]"
                  placeholder="Tell me about your project, idea, or role..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-base font-semibold shadow-lg shadow-indigo-500/25 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Transmitting Message...
                  </span>
                ) : (
                  <>
                    <span>Send Message via Email</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
