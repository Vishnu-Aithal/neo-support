import { auth, db } from "./main";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
        toast.success("Sign In Success");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const signOutFromApp = async () => {
    try {
        await signOut(auth);
        toast.info("Signed Out");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const signUpWithEmailPassword = async ({
    email,
    password,
    displayName,
    photoURL,
}) => {
    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { uid } = user;
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
            uid,
            displayName,
            photoURL,
            email,
        });

        toast.success("Sign Up Success!");
    } catch (error) {
        toast.error(error.message);
    }
};

export const signInWithEmailPassword = async ({ email, password }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sign In Success");
    } catch (error) {
        toast.error(error.message);
    }
};

export const getUserData = async (userId) => {
    const userDataSnapshot = await getDoc(doc(db, "users", userId));
    return userDataSnapshot.data();
};

export const onAuthListener = (callbackFunc) => {
    return onAuthStateChanged(auth, callbackFunc);
};

export const listenUserData = (user, dispatch, actionCreater) => {
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
        const currentUserData = snapshot.data();
        dispatch(actionCreater(currentUserData));
    });
    return unsubscribe;
};
