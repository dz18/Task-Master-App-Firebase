// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4rP2lZOGxOGZC3Zssj06eBKVmclFuLRE",
  authDomain: "practice-logins.firebaseapp.com",
  databaseURL: "https://practice-logins-default-rtdb.firebaseio.com",
  projectId: "practice-logins",
  storageBucket: "practice-logins.appspot.com",
  messagingSenderId: "111072429662",
  appId: "1:111072429662:web:9ae73316a92d47aa8196cf",
  measurementId: "G-XGFD7EXDQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export {app, auth, database}
