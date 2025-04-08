// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTW4BNnncklZf6Zch6T2VcQjez8h_z2Rw",
  authDomain: "job-auto.firebaseapp.com",
  projectId: "job-auto",
  storageBucket: "job-auto.appspot.com",
  messagingSenderId: "120920153486",
  appId: "1:120920153486:web:335bfd4d56b9a6f6d318df",
  measurementId: "G-JTWGE0B8YZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
