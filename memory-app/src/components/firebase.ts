// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgMs1KDLBRTtdz1Nk4FTv_RJLqc2mb10U",
  authDomain: "maxer-9c7cf.firebaseapp.com",
  projectId: "maxer-9c7cf",
  storageBucket: "maxer-9c7cf.appspot.com",
  messagingSenderId: "211097332904",
  appId: "1:211097332904:web:640404b63755c655f2269d",
  measurementId: "G-B2GLE5H23V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const storage = getStorage(app);
