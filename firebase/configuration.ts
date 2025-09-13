import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfiguration = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx",
};

const app = initializeApp(firebaseConfiguration);

export const authenticate = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
