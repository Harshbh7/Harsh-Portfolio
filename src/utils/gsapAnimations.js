import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Hero text stagger reveal ─────────────────────────────
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-tag',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 }, 0.3)
    .fromTo('.hero-title',
    { opacity: 0, y: 50, skewY: 4 },
    { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, 0.5)
    .fromTo('.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7 }, 0.75)
    .fromTo('.hero-desc',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 }, 0.95)
    .fromTo('.hero-cta',
    { opacity: 0, y: 20, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 }, 1.1)
    .fromTo('.hero-socials',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5 }, 1.35);

  return tl;
}

// ─── Section heading slide-in ────────────────────────────
export function animateSectionHeadings() {
  gsap.utils.toArray('.gsap-section-heading').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });
}

// ─── Cards stagger from bottom ───────────────────────────
export function animateCards() {
  gsap.utils.toArray('.gsap-card').forEach(container => {
    const cards = container.querySelectorAll ? container : document.querySelectorAll('.gsap-card');
    gsap.fromTo(container,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ─── Skill bars fill animation ───────────────────────────
export function animateSkillBars() {
  gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
    const width = bar.style.width || bar.getAttribute('data-width') || '80%';
    gsap.fromTo(bar,
      { width: '0%' },
      {
        width,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ─── Floating parallax elements on scroll ────────────────
export function animateParallaxBlobs() {
  gsap.utils.toArray('.gsap-blob').forEach((blob, i) => {
    gsap.to(blob, {
      y: i % 2 === 0 ? -80 : 80,
      ease: 'none',
      scrollTrigger: {
        trigger: blob.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  });
}

// ─── Timeline items slide in alternately ─────────────────
export function animateTimeline() {
  gsap.utils.toArray('.gsap-timeline-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: i % 2 === 0 ? 60 : -60 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 87%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ─── Horizontal text marquee ─────────────────────────────
export function animateMarquee(selector, speed = 30) {
  const el = document.querySelector(selector);
  if (!el) return;
  const clone = el.cloneNode(true);
  el.parentElement.appendChild(clone);
  gsap.to([el, clone], {
    xPercent: -100,
    repeat: -1,
    duration: speed,
    ease: 'none',
  });
}

// ─── Stats counter scroll trigger ────────────────────────
export function animateStats() {
  gsap.utils.toArray('.gsap-stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-value'), 10);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power1.out',
      onUpdate: () => { el.textContent = Math.round(obj.value) + el.getAttribute('data-suffix'); },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });
}

// ─── Fade-up for generic elements ────────────────────────
export function animateFadeUp(selector, stagger = 0.12) {
  const els = gsap.utils.toArray(selector);
  if (!els.length) return;
  gsap.fromTo(els,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.75, stagger, ease: 'power2.out',
      scrollTrigger: {
        trigger: els[0],
        start: 'top 87%',
        toggleActions: 'play none none none',
      }
    }
  );
}

// ─── Cursor glow follow effect ────────────────────────────
export function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'gsap-cursor-glow';
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 99997;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 75%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' });
  });

  return () => { glow.remove(); };
}

// ─── Run all on mount ─────────────────────────────────────
export function initAllGSAP() {
  // Small delay to ensure DOM is painted
  gsap.delayedCall(0.1, () => {
    animateHero();
    animateSectionHeadings();
    animateCards();
    animateTimeline();
    animateFadeUp('.gsap-fade-up');
    animateParallaxBlobs();
    initCursorGlow();
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}
