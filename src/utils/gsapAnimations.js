import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to safely run animations only if elements exist
const safeAnimate = (selector, fn) => {
  const elements = gsap.utils.toArray(selector);
  if (elements.length > 0) {
    fn(elements);
  }
};

// ─── Hero text stagger reveal ─────────────────────────────
export function animateHero() {
  const targets = ['.hero-tag', '.hero-title', '.hero-subtitle', '.hero-desc', '.hero-cta', '.hero-socials'];
  const validTargets = targets.filter(t => document.querySelector(t));
  
  if (validTargets.length === 0) return null;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (document.querySelector('.hero-tag')) {
    tl.fromTo('.hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
  }
  if (document.querySelector('.hero-title')) {
    tl.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
  }
  if (document.querySelector('.hero-subtitle')) {
    tl.fromTo('.hero-subtitle', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.65 }, 0.55);
  }
  if (document.querySelector('.hero-desc')) {
    tl.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75);
  }
  if (document.querySelector('.hero-cta')) {
    tl.fromTo('.hero-cta', { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.9);
  }
  if (document.querySelector('.hero-socials')) {
    tl.fromTo('.hero-socials', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);
  }

  return tl;
}

// ─── Section heading slide-in ────────────────────────────
export function animateSectionHeadings() {
  safeAnimate('.gsap-section-heading', (elements) => {
    elements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });
  });
}

// ─── Cards stagger from bottom ───────────────────────────
export function animateCards() {
  safeAnimate('.gsap-card', (elements) => {
    elements.forEach(container => {
      gsap.fromTo(container,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  });
}

// ─── Skill bars fill animation ───────────────────────────
export function animateSkillBars() {
  safeAnimate('.skill-bar-fill', (elements) => {
    elements.forEach(bar => {
      const width = bar.style.width || bar.getAttribute('data-width') || '80%';
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  });
}

// ─── Floating parallax elements on scroll ────────────────
export function animateParallaxBlobs() {
  safeAnimate('.gsap-blob', (elements) => {
    elements.forEach((blob, i) => {
      if (blob.parentElement) {
        gsap.to(blob, {
          y: i % 2 === 0 ? -60 : 60,
          ease: 'none',
          scrollTrigger: {
            trigger: blob.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }
    });
  });
}

// ─── Timeline items slide in alternately ─────────────────
export function animateTimeline() {
  safeAnimate('.gsap-timeline-item', (elements) => {
    elements.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  });
}

// ─── Fade-up for generic elements ────────────────────────
export function animateFadeUp(selector = '.gsap-fade-up') {
  safeAnimate(selector, (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ─── Run all on mount ─────────────────────────────────────
export function initAllGSAP() {
  // Small delay to ensure React DOM is painted
  const delayTimer = setTimeout(() => {
    animateHero();
    animateSectionHeadings();
    animateCards();
    animateTimeline();
    animateFadeUp('.gsap-fade-up');
    animateParallaxBlobs();
  }, 100);

  return () => {
    clearTimeout(delayTimer);
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}
