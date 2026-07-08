// Firebase setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBQcdYkLKIvYIkPG4N-Dr13hUKGcdKDvPI",
  authDomain: "holiday-planner-bf92f.firebaseapp.com",
  projectId: "holiday-planner-bf92f",
  storageBucket: "holiday-planner-bf92f.firebasestorage.app",
  messagingSenderId: "526710362083",
  appId: "1:526710362083:web:4f395fac5aef137eb2dad6",
  measurementId: "G-6GVHS07HV9"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);