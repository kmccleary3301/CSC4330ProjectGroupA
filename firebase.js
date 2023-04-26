// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from './api_key';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export {auth};