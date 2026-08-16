import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import harshProfile from '../../assets/harsh_profile.jpg';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'harshbh20102@gmail.com';

const SYSTEM_PROMPT = `
You are Harsh Sharma — a Full Stack Developer and AI Integrator. You speak in FIRST PERSON as if you ARE Harsh, casually and professionally, like a developer talking to someone visiting your portfolio.

== ABOUT YOU ==
- Name: Harsh Sharma
- Currently doing: MCA (2025–2027) at Lovely Professional University (LPU), Punjab
- Previously: BCA (2022–2025) from Agra College, Agra | 12th from Agra Vanasthali Vidhyalaya (2022)
- Core skills: React.js, Next.js, TypeScript, Java, Spring Boot, PHP, Firebase (Realtime DB + Auth + Storage), MySQL, PostgreSQL, Tailwind CSS, Framer Motion, Git
- AI skills: TensorFlow.js, MediaPipe, Gemini API, OpenAI API, prompt engineering
- Open to: internships, freelance projects, full-time roles

== YOUR PROJECTS ==
1. MindTrack — TypeScript, React, TensorFlow.js, MediaPipe, Firebase (AI attention tracker & spaced repetition flashcards)
2. CargoTrack — Java, Spring Boot, React, TypeScript, PostgreSQL, Razorpay (Full-stack logistics management)
3. Bodh Script Club — JavaScript, React, Firebase, Tailwind CSS (University club platform with QR verification & admin dashboard)
4. Hospital OPD Management — PHP, MySQL, AJAX (Outpatient management system)
5. BillMeUp — Java Swing, MySQL (Restaurant POS & invoice generator)

== HOW YOU SPEAK ==
- ALWAYS first person: "I built...", "My project...", "I used X because...", "I'm currently..."
- Be friendly, concise, slightly enthusiastic about your work
- Sound like a real developer, not a marketing bot
- LinkedIn Profile: https://www.linkedin.com/in/harshbh7/
- Redirect private inquiries or formal hiring proposals to email: ${CONTACT_EMAIL} or LinkedIn: https://www.linkedin.com/in/harshbh7/
`;

function getFallbackReply(question) {
  const q = question.toLowerCase();

  if (q.includes('linkedin') || q.includes('connect') || q.includes('profile')) {
    return `You can connect with me on LinkedIn at [linkedin.com/in/harshbh7](https://www.linkedin.com/in/harshbh7/)! 🌐\n\nI regularly post engineering updates, open-source projects, and learnings there.`;
  }

  if ((q.includes('all') || q.includes('list') || q.includes('which') || q.includes('kya')) && q.includes('project')) {
    return `Here are some of my top projects! 🚀\n\n👁️ **MindTrack** – AI attention & focus tracker (TensorFlow.js + MediaPipe)\n🚚 **CargoTrack** – Full-stack logistics tracking (Spring Boot + React + PostgreSQL)\n🏫 **Bodh Script Club** – LPU community portal with QR verification\n🛍️ **Flipkart Frontend** – E-commerce interface\n🔍 **Truth Layer** – AI fact verification platform\n\nAsk me about any specific project for details!`;
  }

  if (q.includes('mindtrack') || q.includes('focus') || q.includes('eye')) {
    return `**MindTrack** is my AI focus tracker! 👁️\n\nI built it using TensorFlow.js & MediaPipe in the browser to detect when you look away from the screen while studying. If you're distracted, it alerts you! It also includes spaced repetition (SRS) flashcards, streaks, and analytics.\n\nStack: React, TypeScript, TensorFlow.js, MediaPipe, Firebase.`;
  }

  if (q.includes('cargotrack') || q.includes('cargo') || q.includes('logistics')) {
    return `**CargoTrack** is my logistics & shipment tracking system! 🚚\n\nCustomers track live delivery status, and admins manage drivers, routes, and assign orders. I integrated Razorpay for payments.\n\nBackend: Java + Spring Boot (Render)\nFrontend: React + TypeScript (Vercel)\nDatabase: PostgreSQL`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
    return `My core stack spans full-stack web and AI engineering! 🛠️\n\n- **Frontend**: React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion\n- **Backend**: Java, Spring Boot, Node.js, PHP\n- **Databases**: Firebase Realtime DB, PostgreSQL, MySQL\n- **AI**: Gemini API, TensorFlow.js, MediaPipe\n\nI'm passionate about clean architecture and high-performance apps!`;
  }

  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('job') || q.includes('internship')) {
    return `I'm actively open to full-time roles, internships, and freelance projects! 💼\n\nYou can reach me directly at **${CONTACT_EMAIL}** or connect with me on [LinkedIn](https://www.linkedin.com/in/harshbh7/). Let's build something great together!`;
  }

  return `Thanks for asking! I'm Harsh Sharma, a full-stack developer and MCA student at LPU. Feel free to ask about my projects (like MindTrack or CargoTrack), technical skills, or drop me an email at ${CONTACT_EMAIL} or message on [LinkedIn](https://www.linkedin.com/in/harshbh7/)! ✨`;
}

const quickQuestions = [
  'Tell me about MindTrack AI',
  'What is your core tech stack?',
  'How was CargoTrack built?',
  'Are you open for hire?',
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! I'm Harsh. Ask me anything about my projects, technical stack, or background! 🚀",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      if (GEMINI_API_KEY) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                ...newMessages.map((m) => ({
                  role: m.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: m.content }],
                })),
              ],
              generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
            }),
          }
        );

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          setMessages([...newMessages, { role: 'assistant', content: reply }]);
          setLoading(false);
          return;
        }
      }

      // Fallback
      await new Promise((r) => setTimeout(r, 600));
      const fallback = getFallbackReply(userText);
      setMessages([...newMessages, { role: 'assistant', content: fallback }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallback = getFallbackReply(userText);
      setMessages([...newMessages, { role: 'assistant', content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 p-1.5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 text-white shadow-xl shadow-indigo-500/25 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {isOpen ? (
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white">
              <X className="w-6 h-6" />
            </div>
          ) : (
            <img
              src={harshProfile}
              alt="Harsh Sharma"
              className="w-full h-full object-cover object-top"
            />
          )}
          {!isOpen && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
          )}
        </div>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-22 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src={harshProfile}
                  alt="Harsh Sharma"
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-white/40 shadow-sm"
                />
                <div>
                  <h3 className="font-display font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>Harsh Sharma</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-[11px] font-mono text-indigo-100 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI Digital Persona · Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-slate-950/60">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {msg.role === 'assistant' && (
                    <img
                      src={harshProfile}
                      alt="Harsh"
                      className="w-7 h-7 rounded-xl object-cover flex-shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-800"
                    />
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-md shadow-indigo-500/20'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing Bounce */}
              {loading && (
                <div className="flex justify-start gap-2">
                  <img
                    src={harshProfile}
                    alt="Harsh"
                    className="w-7 h-7 rounded-xl object-cover flex-shrink-0 border border-indigo-200"
                  />
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-xs shadow-2xs">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {messages.length === 1 && !loading && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold pl-9">
                    Quick suggestions:
                  </p>
                  <div className="flex flex-col gap-1.5 pl-9">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                        className="text-left text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40 transition-colors"
                      >
                        → {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask about projects, stack, hire..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-2">
                Replies in first person as Harsh Sharma
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
