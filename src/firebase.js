// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoScszQ0uQO98zEhye7wIRT69YV4h2oLY",
  authDomain: "realtour-c7063.firebaseapp.com",
  projectId: "realtour-c7063",
  storageBucket: "realtour-c7063.appspot.com",
  messagingSenderId: "24491733498",
  appId: "1:24491733498:web:6d5b1c4e925a70abc0b443",
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();
