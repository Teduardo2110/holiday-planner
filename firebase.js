// Firebase setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQcdYkLKIvYIkPG4N-Dr13hUKGcdKDvPI",
  authDomain: "holiday-planner-bf92f.firebaseapp.com",
  projectId: "holiday-planner-bf92f",
  storageBucket: "holiday-planner-bf92f.firebasestorage.app",
  messagingSenderId: "526710362083",
  appId: "1:526710362083:web:4f395fac5aef137eb2dad6",
  measurementId: "G-6GVHS07HV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);