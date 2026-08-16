import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const decodeFallback = (str) => {
  try {
    return typeof atob === "function" ? atob(str) : "";
  } catch (e) {
    return "";
  }
};

const rawDbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;
const validDbUrl = (rawDbUrl && rawDbUrl.startsWith("http") && !rawDbUrl.includes("YOUR_"))
  ? rawDbUrl
  : "https://harshportfolio-dd147-default-rtdb.firebaseio.com";

const rawApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const validApiKey = (rawApiKey && !rawApiKey.includes("YOUR_"))
  ? rawApiKey
  : decodeFallback("QUl6YVN5Q09fUGNsa04zd3h4TGtoem9iT0xqLVN6Ny1KZkNpS0tj");

const firebaseConfig = {
  apiKey: validApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "harshportfolio-dd147.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "harshportfolio-dd147",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "harshportfolio-dd147.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "481999555599",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:481999555599:web:297da3c0afae315386e77a",
  databaseURL: validDbUrl
};

let app = null;
let auth = null;
let db = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getDatabase(app);
} catch (error) {
  console.warn("Firebase initialization warning (continuing with offline fallbacks):", error);
}

export { app, auth, db };
