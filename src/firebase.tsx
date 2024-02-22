import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    doc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyB-v-uOf04-To60EGhs1cqSW4pzLuuGCFY",
    authDomain: "fbla-63a95.firebaseapp.com",
    projectId: "fbla-63a95",
    storageBucket: "fbla-63a95.appspot.com",
    messagingSenderId: "600082805719",
    appId: "1:600082805719:web:672b09b180e42e80fa5192",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db };
export { storage };
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function createUserAndStoreAccountType(
    email: string,
    pass: string,
    accountType: string
): Promise<boolean> {
    try {
        alert("here");
        const newUser = await createUserWithEmailAndPassword(auth, email, pass);
        const userRef = collection(db, "users");
        await addDoc(userRef, {
            uid: newUser.user.uid,
            accountType: accountType,
        });
        return true;
    } catch (e) {
        alert(
            "Error creating user and storing account type" + JSON.stringify(e)
        );
        return false;
    }
}

export async function createUser(
    email: string,
    pass: string
): Promise<boolean> {
    try {
        const newUser = await createUserWithEmailAndPassword(auth, email, pass);
        return true;
    } catch (e) {
        console.error("Error creating user", e);
        return false;
    }
}

export async function authenticateUser(
    email: string,
    pass: string
): Promise<boolean> {
    try {
        const newUser = await signInWithEmailAndPassword(auth, email, pass);
        console.log("Authenticated User ", newUser.user);
        return true;
    } catch (e) {
        console.error("Error authenticating user", e);
        return false;
    }
}

export async function authenticateWithGoogle(): Promise<boolean> {
    try {
        const newUser = await signInWithPopup(auth, googleProvider);
        console.log("Authenticated User ", newUser.user);
        return true;
    } catch (e) {
        console.error("Error authenticating user", e);
        return false;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        console.log("Signed out");
    } catch (e) {
        console.error("Error signing out", e);
    }
}
