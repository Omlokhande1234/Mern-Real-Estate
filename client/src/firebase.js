// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2e237.firebaseapp.com",
  projectId: "mern-estate-2e237",
  storageBucket: "mern-estate-2e237.appspot.com",
  messagingSenderId: "630971509438",
  appId: "1:630971509438:web:a437660142f59ed5c8ccef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);