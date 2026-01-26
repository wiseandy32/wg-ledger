// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementID: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_MEASUREMENT_ID,
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics = null;

if (firebaseConfig.apiKey && typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  analytics = getAnalytics(app);
}

export { auth, db, analytics };
