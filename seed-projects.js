// Firebase Projects Seed & Update Script with REAL Live Screenshots & URLs
// Run with: node seed-projects.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const projects = [
  {
    title: "MindTrack",
    description: "AI-powered study & attention tracking platform with in-browser eye & head-pose tracking using TensorFlow.js and MediaPipe. Features spaced repetition (SRS) flashcards, productivity streaks, and analytics.",
    techStack: ["React", "TypeScript", "TensorFlow.js", "MediaPipe", "Firebase"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/MindTrack",
    liveUrl: "https://mind-track-flax.vercel.app/",
    imageUrl: "/projects/mindtrack.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "CargoTrack",
    description: "Full-stack cargo & freight shipment tracker with live GPS status, customer tracking portal, admin driver dispatch, and Razorpay payment integration.",
    techStack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Razorpay"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/CargoTrack_Backend",
    liveUrl: "https://cargo-track-ui.vercel.app/",
    imageUrl: "/projects/cargotrack.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "Bodh Script Club",
    description: "Official tech community platform for Bodh Script Club at LPU. Features member registration, event ticketing with QR codes, certificate generator & verification, and admin dashboard.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS", "GSAP"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/Bodh_Script_Club",
    liveUrl: "https://bodh-script-club-three.vercel.app/",
    imageUrl: "/projects/bodh_script_club.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "Flipkart Clone Frontend",
    description: "Modern, responsive e-commerce web interface inspired by Flipkart. Includes rich product catalog, category filters, interactive cart flow, and sleek responsive design.",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    category: "Frontend",
    githubUrl: "https://github.com/Harshbh7/FlipKart",
    liveUrl: "https://flip-kart-frontend-three.vercel.app",
    imageUrl: "/projects/flipkart.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "Truth Layer",
    description: "Intelligent fact-checking and news verification platform utilizing natural language processing to detect media bias, fact discrepancies, and misinformation in real time.",
    techStack: ["React", "TypeScript", "AI / NLP", "Tailwind CSS"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/Truth_Layer",
    liveUrl: "https://truth-layer-plum.vercel.app/",
    imageUrl: "/projects/truth_layer.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "Code Mentor",
    description: "AI-assisted programming mentor and interactive code tutoring environment. Provides real-time code reviews, bug suggestions, and guided programming exercises.",
    techStack: ["React", "TypeScript", "OpenAI / Gemini API", "Node.js"],
    category: "AI",
    githubUrl: "https://github.com/Harshbh7/CodeMentor",
    liveUrl: "https://code-mentor-frontend-five.vercel.app/",
    imageUrl: "/projects/code_mentor.png",
    isVisible: true,
    featured: true,
  },
  {
    title: "CodeMate / CodeEdito",
    description: "In-browser collaborative code editor with real-time syntax highlighting, multiple language support, and live split-screen preview for frontend development.",
    techStack: ["React", "TypeScript", "Monaco Editor", "Tailwind CSS"],
    category: "Tool",
    githubUrl: "https://github.com/Harshbh7/CodeEdito",
    liveUrl: "https://code-edito-two.vercel.app/",
    imageUrl: "/projects/code_edito.png",
    isVisible: true,
    featured: false,
  },
  {
    title: "College Portal",
    description: "Comprehensive university and college student-faculty portal. Includes course management, timetable scheduling, academic notices, and student profile tracking.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com/Harshbh7/College_Portal",
    liveUrl: "https://college-lemon.vercel.app/",
    imageUrl: "/projects/college.png",
    isVisible: true,
    featured: false,
  },
  {
    title: "YourShop",
    description: "Full-featured online shopping application with customer cart flow, categorized merchandise, discount codes, and seamless checkout experience.",
    techStack: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    category: "Web App",
    githubUrl: "https://github.com/Harshbh7/YourShop",
    liveUrl: "https://your-shop-three.vercel.app/",
    imageUrl: "/projects/yourshop.png",
    isVisible: true,
    featured: false,
  },
  {
    title: "EPraman",
    description: "Digital document and certificate authentication platform with cryptographic QR verification, automated stamp rendering, and tamper-evident audit history.",
    techStack: ["React", "JavaScript", "Firebase", "Crypto / QR"],
    category: "Tool",
    githubUrl: "https://github.com/Harshbh7/EPraman",
    liveUrl: "https://praman-mu.vercel.app/",
    imageUrl: "/projects/epraman.png",
    isVisible: true,
    featured: false,
  },
  {
    title: "Hospital OPD Management",
    description: "Outpatient department (OPD) medical management system with patient records, doctor scheduling, appointment queues, and prescription tracking.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "AJAX"],
    category: "Backend",
    githubUrl: "https://github.com/Harshbh7/Hospital_Management",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    isVisible: true,
    featured: false,
  },
  {
    title: "BillMeUp",
    description: "Restaurant point-of-sale (POS) and automated invoice billing platform. Features menu item management, fast order tallying, bill printing, and sales reporting.",
    techStack: ["Java", "Swing", "MySQL", "JDBC"],
    category: "Desktop",
    githubUrl: "https://github.com/Harshbh7/BillMeUp",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    isVisible: true,
    featured: false,
  },
];

async function seedProjects() {
  console.log("🚀 Syncing updated projects with REAL screenshots to Firebase...\n");

  const projectMap = {};
  projects.forEach((proj, idx) => {
    const key = `proj_${String(idx + 1).padStart(2, '0')}`;
    projectMap[key] = {
      ...proj,
      updatedAt: Date.now(),
      createdAt: proj.createdAt || Date.now() - (projects.length - idx) * 86400000,
    };
  });

  try {
    const projectsRef = ref(db, "projects");
    await set(projectsRef, projectMap);
    console.log(`🎉 Successfully synced ${projects.length} projects with REAL screenshots to Firebase!`);
  } catch (error) {
    console.error("❌ Failed to sync projects:", error.message);
  }

  process.exit(0);
}

seedProjects();
