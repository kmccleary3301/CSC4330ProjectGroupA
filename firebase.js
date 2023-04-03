// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ8jgJERC1w1W5nuxTU3MiLOCTdx4vvH8",
  authDomain: "skill-bridge-4330.firebaseapp.com",
  projectId: "skill-bridge-4330",
  storageBucket: "skill-bridge-4330.appspot.com",
  messagingSenderId: "636442520700",
  appId: "1:636442520700:web:1456c00bf227bfc9d6edf9",
  measurementId: "G-ZN8G3ZYX6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export {auth};