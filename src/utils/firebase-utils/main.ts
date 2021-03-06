import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDoc, getFirestore, doc, Timestamp } from "firebase/firestore";
import { LinkTypeServer } from "types/Link";
import { AnswerTypeServer, QuestionTypeServer } from "types/Post";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "neo-support.firebaseapp.com",
    projectId: "neo-support",
    storageBucket: "neo-support.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getDateString = (timestamp: Timestamp) => {
    if (timestamp) {
        const dateString = timestamp.toDate().toString();
        return dateString.slice(0, 24);
    } else {
        return "";
    }
};

export const getParentData = async (
    parentCollection: "questions" | "answers" | "links",
    parentId: string
) => {
    try {
        const parent = await getDoc(doc(db, parentCollection, parentId));

        if (parent.exists()) {
            const parentData = parent.data() as
                | QuestionTypeServer
                | AnswerTypeServer
                | LinkTypeServer;
            const created = getDateString(parentData.created);
            return { ...parentData, uid: parent.id, created };
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};
