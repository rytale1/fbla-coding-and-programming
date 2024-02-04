import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-v-uOf04-To60EGhs1cqSW4pzLuuGCFY",
  authDomain: "fbla-63a95.firebaseapp.com",
  projectId: "fbla-63a95",
  storageBucket: "fbla-63a95.appspot.com",
  messagingSenderId: "600082805719",
  appId: "1:600082805719:web:672b09b180e42e80fa5192"
};

const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);
export const auth = getAuth(app);

export async function createUser(email: string, pass: string): Promise<boolean> {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, pass);
    return true;
  } catch (e) {
    console.error("Error creating user", e);
    return false;
  }
}

export async function authenticateUser(email: string, pass: string) : Promise<boolean> {
  try {
    const newUser = await signInWithEmailAndPassword(auth, email, pass)
    console.log("Authenticated User ", newUser.user);
    return true;
  } catch (e) {
    console.error("Error authenticating user", e);
    return false;
  }
}


