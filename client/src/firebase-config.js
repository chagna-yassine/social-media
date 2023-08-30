// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD06HYQ3zUOE5UtxzrbKvXWCkoMLWay7Wc",
  authDomain: "social-media-1ae78.firebaseapp.com",
  projectId: "social-media-1ae78",
  storageBucket: "social-media-1ae78.appspot.com",
  messagingSenderId: "1036523313117",
  appId: "1:1036523313117:web:580f32e252b1c87fee8834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);