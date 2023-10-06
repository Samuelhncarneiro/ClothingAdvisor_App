import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANwLqTdk_PcXp2AF9h_PPXYqTFEZF42dM",
  authDomain: "project-group-52.firebaseapp.com",
  databaseURL: "https://project-group-52-default-rtdb.firebaseio.com",
  projectId: "project-group-52",
  storageBucket: "project-group-52.appspot.com",
  messagingSenderId: "523434717502",
  appId: "1:523434717502:web:4c8d16cd7e041baf153c6f",
  measurementId: "G-PRCDF6GMJR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const store = getStorage(app)
export const db= getFirestore(app)