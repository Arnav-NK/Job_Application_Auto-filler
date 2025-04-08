// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "job-auto.firebaseapp.com",
  projectId: "job-auto",
  storageBucket: "job-auto.appspot.com",
  messagingSenderId: "",
  appId: "1:xx:web:xx",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
