import {
    query,
    where,
    arrayRemove,
    arrayUnion,
    collection,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
} from "firebase/firestore";
import { db } from "./main";
import { deleteChildComments } from "./comments";
import { useEffect } from "react";

const answersCollectionRef = collection(db, "answers");

export const deleteChildAnswers = async (parentId) => {
    try {
        const answersQuery = query(
            answersCollectionRef,
            where("parentId", "==", parentId)
        );
        const answersSnapShots = await getDocs(answersQuery);
        answersSnapShots.forEach(async (answerSnapshot) => {
            const answerId = answerSnapshot.id;
            const answerRef = doc(db, "answers", answerId);
            await deleteChildComments(answerId);
            await deleteDoc(answerRef);
        });
    } catch (error) {
        console.log(error);
    }
};

export const addNewAnswer = async (answerData) => {
    try {
        const response = await addDoc(answersCollectionRef, {
            ...answerData,
            created: serverTimestamp(),
        });
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayUnion(response.id) });
    } catch (error) {
        console.log(error);
    }
};

export const useAnswers = (parentId, setAnswers) => {
    const answersQuery = query(
        answersCollectionRef,
        where("parentId", "==", parentId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const allAnswers = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data();
                allAnswers.push({ uid, ...data });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, []);
};

export const useMyAnswers = (userId, setAnswers) => {
    const answersQuery = query(
        answersCollectionRef,
        where("author", "==", userId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(answersQuery, (answerSnapShots) => {
            const allAnswers = [];
            answerSnapShots.forEach((answerSnapShot) => {
                const uid = answerSnapShot.id;
                const data = answerSnapShot.data();
                allAnswers.push({ uid, ...data });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, []);
};

export const deleteAnswer = async (answerData) => {
    try {
        const answerRef = doc(db, "answers", answerData.uid);
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayRemove(answerData.uid) });
        await deleteChildComments(answerData.uid);
        await deleteDoc(answerRef);
    } catch (error) {
        console.log(error);
    }
};

export const upVoteAnswer = async (answer, userId) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayUnion(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
export const downVoteAnswer = async (answer, userId) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayUnion(userId),
        });
    } catch (error) {}
};
export const unVoteAnswer = async (answer, userId) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
