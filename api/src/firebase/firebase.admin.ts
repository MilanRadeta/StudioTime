
import admin from "firebase-admin"
import { FIREBASE_ADMIN_CONFIG } from "./firebase.config";

export const FIREBASE_ADMIN_APP = admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_ADMIN_CONFIG)
});
