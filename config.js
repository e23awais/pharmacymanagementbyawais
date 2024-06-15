import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // add
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApSWkGkuW55hmiRTzqulEKZoF-XiZzOz0",
    authDomain: "pharmacyfirebase-e23.firebaseapp.com",
    projectId: "pharmacyfirebase-e23",
    storageBucket: "pharmacyfirebase-e23.appspot.com",
    messagingSenderId: "108575678342",
    appId: "1:108575678342:web:b338457777d3b39534d607"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // add