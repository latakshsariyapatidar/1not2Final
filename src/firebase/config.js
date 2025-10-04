// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHC8ZLKBO2xnINcD0_lIMzlWbNrnZjWYI",
  authDomain: "not2production.firebaseapp.com",
  projectId: "not2production",
  storageBucket: "not2production.firebasestorage.app",
  messagingSenderId: "388141998479",
  appId: "1:388141998479:web:cf2f54b716b51ff6f36bfa",
  measurementId: "G-R424D80XQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Export the app and analytics
export { app, analytics };

export default app;