// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6DSTwG6CyJVDuzy0qHdbIR1tzi3ye-Dg",
    authDomain: "chatting-app-fafa3.firebaseapp.com",
    projectId: "chatting-app-fafa3",
    storageBucket: "chatting-app-fafa3.appspot.com",
    messagingSenderId: "1022605631075",
    appId: "1:1022605631075:web:59413c4885bfd620c3a256",
    measurementId: "G-6CF4ZG2H0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
