import React from 'react';

export default function ModernBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── 1. Subtle Engineering Dot-Matrix Grid Overlay ── */}
      <div 
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.25) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── 2. Subtle Micro-Grid Lines Accent ── */}
      <div 
        className="absolute inset-0 opacity-[0.3] dark:opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      {/* ── 3. Radiant Ambient Aurora Glow Orbs (Soft, non-intrusive blurs) ── */}
      {/* Top Left Indigo Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/12 via-blue-500/8 to-transparent blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Top Right Cyan Glow */}
      <div className="absolute top-20 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-cyan-400/12 via-sky-500/8 to-transparent blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Center Left Subtle Violet Glow */}
      <div className="absolute top-[45%] -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/8 via-indigo-400/6 to-transparent blur-[150px]" />

      {/* Center Right Subtle Emerald/Sky Glow */}
      <div className="absolute top-[60%] -right-20 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-sky-400/8 via-indigo-500/6 to-transparent blur-[140px]" />

      {/* Bottom Center Rose/Indigo Accent Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-indigo-500/10 via-rose-500/5 to-transparent blur-[160px]" />

      {/* ── 4. Elegant Glass Vignette Horizon ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/[0.02] dark:to-slate-950/[0.4]" />
    </div>
  );
}
