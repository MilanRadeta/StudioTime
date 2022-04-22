
import admin from "firebase-admin"
import { FIREBASE_ADMIN_CONFIG } from "./firebase.config";

admin.initializeApp({
  credential: admin.credential.cert(JSON.stringify(FIREBASE_ADMIN_CONFIG))
});
