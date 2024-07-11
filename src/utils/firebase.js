// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK9I-5svOasNLZU3WcusBqrex0pJCpiTE",
  authDomain: "netflixgpt-9ce4c.firebaseapp.com",
  projectId: "netflixgpt-9ce4c",
  storageBucket: "netflixgpt-9ce4c.appspot.com",
  messagingSenderId: "1024945958087",
  appId: "1:1024945958087:web:f47327bec4737fd86fe2e2",
  measurementId: "G-WRK058THJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
