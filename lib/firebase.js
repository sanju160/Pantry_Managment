import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  // Import getStorage
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBtEYfxmU3txjcJTfXoAVCH9eAqyR7s_CY",
    authDomain: "pantry-app-6ae41.firebaseapp.com",
    projectId: "pantry-app-6ae41",
    storageBucket: "pantry-app-6ae41.appspot.com",
    messagingSenderId: "720185459029",
    appId: "1:720185459029:web:18118348e21d451acfefdc",
    measurementId: "G-4E0ZJL3EP7"
   
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Initialize Firebase Storage

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, auth, storage, analytics };
