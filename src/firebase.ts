import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCORUvAE3qx3Noctzz1Vzaoq-NQhshFHkc",
    authDomain: "fbla-cp-2324.firebaseapp.com",
    projectId: "fbla-cp-2324",
    storageBucket: "fbla-cp-2324.appspot.com",
    messagingSenderId: "465219159585",
    appId: "1:465219159585:web:2c224293eb4d8aa9828560",
    measurementId: "G-EL4VP62YS5",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { storage };
export { db };
export { auth };
