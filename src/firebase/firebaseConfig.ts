import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC2O8ekgUIuOmltNWHGU1DSqkaY4NngSCQ",
  authDomain: "recipe-application-6f50b.firebaseapp.com",
  projectId: "recipe-application-6f50b",
  databaseURL: "https://recipe-application-6f50b-default-rtdb.firebaseio.com/",
  storageBucket: "recipe-application-6f50b.firebasestorage.app",
  messagingSenderId: "805252777822",
  appId: "1:805252777822:web:487a2769fa059feb3b31cf",
  measurementId: "G-ZYQE9X9QVG"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
