import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBJFE6_mWXrmz3IdCbvQQmb91jNOIFpzNQ",
  authDomain: "deakin-web-app-7faca.firebaseapp.com",
  projectId: "deakin-web-app-7faca",
  storageBucket: "deakin-web-app-7faca.firebasestorage.app",
  messagingSenderId: "663258046061",
  appId: "1:663258046061:web:6b1bea63eb6ce7762f2964",
  measurementId: "G-VKLZ8QQ80J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Google Auth provider
const googleAuthProvider = new GoogleAuthProvider();

// Export Auth, Firestore, and Google Auth Provider
export { auth, db, googleAuthProvider };
