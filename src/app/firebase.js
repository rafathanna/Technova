import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGMuHtsgkGvXMYc7p0e0nR-elnim2mTXw",
  authDomain: "technova-4e4e0.firebaseapp.com",
  projectId: "technova-4e4e0",
  storageBucket: "technova-4e4e0.firebasestorage.app",
  messagingSenderId: "1043591010346",
  appId: "1:1043591010346:web:6303fe6dda109baf864b53",
  measurementId: "G-MKT40KXY24",
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
