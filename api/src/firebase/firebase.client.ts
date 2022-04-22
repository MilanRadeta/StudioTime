// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_WEB_APP_CONFIG } from "./firebase.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const FIREBASE_APP = initializeApp(FIREBASE_WEB_APP_CONFIG);
// const analytics = getAnalytics(app);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
FIREBASE_AUTH.setPersistence({ type: "NONE" });