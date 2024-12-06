
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "movie-80bbb.firebaseapp.com",
    projectId: "movie-80bbb",
    storageBucket: "movie-80bbb.firebasestorage.app",
    messagingSenderId: "270711262471",
    appId: "1:270711262471:web:15ef441f6ec0cf60aa49a2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, collection, addDoc, getDocs, auth };
