
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCW4dAnTwvaTnpCWyWFv1faVF3kF_squAg",
    authDomain: "movie-80bbb.firebaseapp.com",
    projectId: "movie-80bbb",
    storageBucket: "movie-80bbb.firebasestorage.app",
    messagingSenderId: "270711262471",
    appId: "1:270711262471:web:15ef441f6ec0cf60aa49a2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
