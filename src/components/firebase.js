// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuVh0qt_Dct9DTaC1nRGu-Nt0PrAXMoLQ",
  authDomain: "tris-it-club.firebaseapp.com",
  projectId: "tris-it-club",
  storageBucket: "tris-it-club.appspot.com",
  messagingSenderId: "81326438018",
  appId: "1:81326438018:web:04c1629c55120278de269b",
  measurementId: "G-DDSMLCBZH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
