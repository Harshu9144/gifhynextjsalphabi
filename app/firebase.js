// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8NBBO6L_y13OduSpkCEqPAQyfv7ous6U",
  authDomain: "alphabit-6097a.firebaseapp.com",
  projectId: "alphabit-6097a",
  storageBucket: "alphabit-6097a.appspot.com",
  messagingSenderId: "502348371342",
  appId: "1:502348371342:web:86a9620748ce8831fa80df",
  measurementId: "G-JEN0VCRW2M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
