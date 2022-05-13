import { auth, db } from "./main";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const { user } = await signInWithPopup(auth, googleProvider);
        const { uid, displayName, photoURL, email } = user;
        const userRef = doc(db, "users", user.uid);
        const userSnapShot = await getDoc(userRef);
        if (!userSnapShot.exists()) {
            await setDoc(userRef, {
                uid,
                displayName,
                photoURL,
                email,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const signOutFromApp = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = async (user) => {
    const userDataSnapshot = await getDoc(doc(db, "users", user.uid));
    return userDataSnapshot.data();
};

export const onAuthListener = (callbackFunc) => {
    return onAuthStateChanged(auth, callbackFunc);
};
