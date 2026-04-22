// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-e0230.firebaseapp.com",
  projectId: "interviewiq-e0230",
  storageBucket: "interviewiq-e0230.firebasestorage.app",
  messagingSenderId: "929698693619",
  appId: "1:929698693619:web:1cc6db07f0c1f9a8b7d286"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth=getAuth(app);
const provider=new GoogleAuthProvider()
provider.setCustomParameters({ 
  prompt: 'consent',  // Always show consent screen with Continue button
  display: 'popup'    // Force popup instead of redirect
});
export {auth,provider}