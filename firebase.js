import { initializeApp } from 'firebase/app'; // add
import { getAuth } from 'firebase/auth'; // add
import { getFirestore } from 'firebase/firestore'; 

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyApSWkGkuW55hmiRTzqulEKZoF-XiZzOz0",
  authDomain: "pharmacyfirebase-e23.firebaseapp.com",
  projectId: "pharmacyfirebase-e23",
  storageBucket: "pharmacyfirebase-e23.appspot.com",
  messagingSenderId: "108575678342",
  appId: "1:108575678342:web:b338457777d3b39534d607"
};

// Initialize Firebase with your configuration object
const app = initializeApp(firebaseConfig);

// Get the Firebase authentication and Firestore database instances
const auth = getAuth(app); // add
const database = getFirestore(app); // add

// Export the Firebase authentication and Firestore database instances
export { auth, database }; //add