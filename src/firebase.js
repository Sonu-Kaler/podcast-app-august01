// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvFH1-C2DTyMWXFJ681q3X3IFuptqJg9s",
  authDomain: "podcast-project-july.firebaseapp.com",
  projectId: "podcast-project-july",
  storageBucket: "podcast-project-july.appspot.com",
  messagingSenderId: "363449795945",
  appId: "1:363449795945:web:215fe5ed5fad9f2e24a9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export {auth,storage,db};

