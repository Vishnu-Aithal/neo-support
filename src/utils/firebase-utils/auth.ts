import { auth, db } from "./main";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    User,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { UserType } from "types/User";
import { AppDispatch } from "store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { UserState } from "store/currentUser-slice";

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

export const useAuthorDetails = (authorId: string) => {
    const [authorDetails, setAuthorDetails] = useState<UserState>(null);
    useEffect(() => {
        (async () => {
            const userDetails = await getUserData(authorId);
            setAuthorDetails(userDetails);
        })();
    }, [authorId, setAuthorDetails]);
    return authorDetails;
};

export const onAuthListener = (
    callbackFunc: (user: User | null) => Promise<void>
) => {
    return onAuthStateChanged(auth, callbackFunc);
};

export const listenUserData = (
    user: User,
    dispatch: AppDispatch,
    actionCreater: ActionCreatorWithPayload<UserState>
) => {
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
        const currentUserData = snapshot.data() as UserType;
        dispatch(actionCreater(currentUserData));
    });
    return unsubscribe;
};

export const updateUserDetails = async (
    updatedDetails: Partial<UserType>,
    userId: string
) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, updatedDetails);
        toast.success("User Details Updated");
    } catch (error) {
        toast.error("Failed to Update UserDetails");
    }
};
