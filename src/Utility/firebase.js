// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth" 

const firebaseConfig = {
  apiKey: "AIzaSyCBMRqDT6iilCr0crbzX0ug_HyfIGjUfQI",
  authDomain: "clone-11e68.firebaseapp.com",
  projectId: "clone-11e68",
  storageBucket: "clone-11e68.firebasestorage.app",
  messagingSenderId: "30525441546",
  appId: "1:30525441546:web:a0ea447e555a16154a41f3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()