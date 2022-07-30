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
import { db, getDateString } from "./main";
import { deleteChildComments } from "./comments";
import React, { SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewNotification, removeNotification } from "./notifications";
import { AnswerType, AnswerTypeServer, QuestionType } from "types/Post";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const answersCollectionRef = collection(db, "answers");

export const deleteChildAnswers = async (parentId: string) => {
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
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const addNewAnswer = async (
    parent: QuestionType,
    answerData: Omit<AnswerType, "uid" | "collection" | "created">
) => {
    try {
        const response = await addDoc(answersCollectionRef, {
            ...answerData,
            collection: "answers",
            created: serverTimestamp(),
        });
        const questionRef = doc(db, "questions", answerData?.parentId);
        await updateDoc(questionRef, { answers: arrayUnion(response.id) });
        await addNewNotification(parent, answerData, response.id, "answer");
        toast.success("Answer Posted SuccesFully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const useAnswers = (
    parentId: string,
    setAnswers: React.Dispatch<SetStateAction<AnswerType[]>>
) => {
    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("parentId", "==", parentId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const allAnswers: AnswerType[] = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data() as AnswerTypeServer;
                const created = getDateString(data.created);
                allAnswers.push({ uid, ...data, created });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, [setAnswers, parentId]);
};

export const useMyAnswers = (
    userId: string,
    actionCreator: ActionCreatorWithPayload<AnswerType[]>
) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapShots) => {
            const allAnswers: AnswerType[] = [];
            answerSnapShots.forEach((answerSnapShot) => {
                const uid = answerSnapShot.id;
                const data = answerSnapShot.data() as AnswerTypeServer;
                const created = getDateString(data.created);
                allAnswers.push({ uid, ...data, created });
            });
            dispatch(actionCreator(allAnswers));
        });
        return unsubscribe;
    }, [userId, actionCreator, dispatch]);
};

export const useMyBookmarkedAnswers = (
    userId: string,
    setState: React.Dispatch<SetStateAction<AnswerType[]>>
) => {
    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("bookmarkedBy", "array-contains", userId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const myBookmarkedAnswers: AnswerType[] = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data() as AnswerTypeServer;
                const created = getDateString(data.created);
                myBookmarkedAnswers.push({ uid, ...data, created });
            });
            setState(myBookmarkedAnswers);
        });
        return unsubscribe;
    }, [userId, setState]);
};

export const deleteAnswer = async (
    parent: QuestionType,
    answerData: AnswerType
) => {
    try {
        const answerRef = doc(db, "answers", answerData.uid);
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayRemove(answerData.uid) });
        await deleteChildComments(answerData.uid);
        await deleteDoc(answerRef);
        await removeNotification(parent, answerData.uid);
        toast.info("Answer Deleted Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const updateAnswer = async (
    updatedData: Partial<AnswerType>,
    uid: string
) => {
    try {
        const answerRef = doc(db, "answers", uid);
        await updateDoc(answerRef, updatedData);
        toast.success("Answer Updated Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const addBookMarkAnswer = async (post: AnswerType, userId: string) => {
    try {
        const answerRef = doc(db, "answers", post.uid);
        await updateDoc(answerRef, { bookmarkedBy: arrayUnion(userId) });
        toast.success("Bookmarked!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const removeBookMarkAnswer = async (
    post: AnswerType,
    userId: string
) => {
    try {
        const answerRef = doc(db, "answers", post.uid);
        await updateDoc(answerRef, { bookmarkedBy: arrayRemove(userId) });
        toast.info("Bookmark Removed");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const upVoteAnswer = async (answer: AnswerType, userId: string) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayUnion(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const downVoteAnswer = async (answer: AnswerType, userId: string) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayUnion(userId),
        });
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const unVoteAnswer = async (answer: AnswerType, userId: string) => {
    try {
        const answerRef = doc(db, "answers", answer.uid);
        await updateDoc(answerRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
