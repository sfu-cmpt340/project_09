// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQWuTvqDhNc-Vlpy6FB7AHpRNZ7MhCC-I",
  authDomain: "project-09-e4dd7.firebaseapp.com",
  projectId: "project-09-e4dd7",
  storageBucket: "project-09-e4dd7.appspot.com",
  messagingSenderId: "336493691614",
  appId: "1:336493691614:web:e299b57b51d2ad9463384f",
  measurementId: "G-PQNN0NMXCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
