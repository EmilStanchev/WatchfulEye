// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: "neighborhoodwatcher-e33cf.firebasestorage.app",
  messagingSenderId: "998479985983",
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-1GVFCJR6ZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: browserLocalPersistence });
const db = getFirestore(app);

export { app, auth, db };
