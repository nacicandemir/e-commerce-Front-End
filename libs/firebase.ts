// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE8TjC9WiIotsyzTZGyDXfGztVJ6KWW_A",
  authDomain: "shop-7652f.firebaseapp.com",
  projectId: "shop-7652f",
  storageBucket: "shop-7652f.firebasestorage.app",
  messagingSenderId: "249519626352",
  appId: "1:249519626352:web:23b1b9a9f7c7d0e25abcb5",
  measurementId: "G-PW8PGS7Y85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app