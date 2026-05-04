import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Firebase web config — uses Vite env vars (VITE_FIREBASE_*).
// Add these in your project's environment (publishable web keys are safe in code).
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
let app = null;
let _db = null;
let _auth = null;
let _storage = null;
export function isFirebaseConfigured() {
    return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}
function ensureApp() {
    if (typeof window === "undefined")
        return null;
    if (!isFirebaseConfigured())
        return null;
    if (app)
        return app;
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    return app;
}
export function getDb() {
    const a = ensureApp();
    if (!a)
        return null;
    if (!_db)
        _db = getFirestore(a);
    return _db;
}
export function getFbAuth() {
    const a = ensureApp();
    if (!a)
        return null;
    if (!_auth)
        _auth = getAuth(a);
    return _auth;
}
export function getFbStorage() {
    const a = ensureApp();
    if (!a)
        return null;
    if (!_storage)
        _storage = getStorage(a);
    return _storage;
}
