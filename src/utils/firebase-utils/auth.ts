import { auth, db } from "./main";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { UserType } from "types/User";
import { AppDispatch } from "store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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
}: {
    [prop: string]: string;
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
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Sign Up Failed");
        }
    }
};

export const signInWithEmailPassword = async ({
    email,
    password,
}: {
    [props: string]: string;
}) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sign In Success");
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Sign In Failed");
        }
    }
};

export const getUserData = async (userId: string) => {
    const userDataSnapshot = await getDoc(doc(db, "users", userId));
    return userDataSnapshot.data() as UserType;
};

//BUG explicit any type
export const onAuthListener = (callbackFunc: any) => {
    return onAuthStateChanged(auth, callbackFunc);
};

export const listenUserData = (
    user: UserType,
    dispatch: AppDispatch,
    actionCreater: ActionCreatorWithPayload<UserType>
) => {
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
        const currentUserData = snapshot.data() as UserType;
        dispatch(actionCreater(currentUserData));
    });
    return unsubscribe;
};
