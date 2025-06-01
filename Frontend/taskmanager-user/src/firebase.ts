// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5QJZlZHO-ORk2cGHV73Vtr529_k980jQ",
    authDomain: "task-manager-app-5df1e.firebaseapp.com",
    projectId: "task-manager-app-5df1e",
    storageBucket: "task-manager-app-5df1e.firebasestorage.app",
    messagingSenderId: "257205798469",
    appId: "1:257205798469:web:57d3ba69ac6d9593da052c",
    measurementId: "G-4W5EB8Y93F"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
