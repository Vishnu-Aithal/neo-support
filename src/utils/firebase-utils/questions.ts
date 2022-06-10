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
} from "firebase/firestore";
import { db, getDateString } from "./main";
import { deleteChildComments } from "./comments";
import { deleteChildAnswers } from "./answers";
import React, { SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { QuestionType, QuestionTypeServer } from "types/Post";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const questionsCollectionRef = collection(db, "questions");

export const addNewQuestion = async (
    questionDetails: Partial<QuestionType>
) => {
    try {
        await addDoc(questionsCollectionRef, {
            ...questionDetails,
            collection: "questions",
            created: serverTimestamp(),
        });
        toast.success("Question Posted Succesfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const updateQuestion = async (
    updatedData: Partial<QuestionType>,
    uid: string
) => {
    try {
        const questionRef = doc(db, "questions", uid);
        await updateDoc(questionRef, updatedData);
        toast.success("Question Updated Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const deleteQuestion = async (question: QuestionType) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await deleteDoc(questionRef);
        await deleteChildAnswers(question.uid);
        await deleteChildComments(question.uid);
        toast.info("Question Deleted Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const addBookMarkQuestion = async (
    post: QuestionType,
    userId: string
) => {
    try {
        const questionRef = doc(db, "questions", post.uid);
        await updateDoc(questionRef, { bookmarkedBy: arrayUnion(userId) });
        toast.success("Bookmarked!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const removeBookMarkQuestion = async (
    post: QuestionType,
    userId: string
) => {
    try {
        const questionRef = doc(db, "questions", post.uid);
        await updateDoc(questionRef, { bookmarkedBy: arrayRemove(userId) });
        toast.info("Bookmark Removed");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const useQuestions = (
    actionCreator: ActionCreatorWithPayload<QuestionType[]>
) => {
    const dispatch = useDispatch();
    return useEffect(() => {
        const allQuestionsQuery = query(questionsCollectionRef);

        const unsubscribe = onSnapshot(
            allQuestionsQuery,
            (questionSnapshots) => {
                const questions: QuestionType[] = [];
                questionSnapshots.forEach((questionSnapShot) => {
                    const uid = questionSnapShot.id;
                    const data = questionSnapShot.data() as QuestionTypeServer;
                    const created = getDateString(data.created);
                    questions.push({ uid, ...data, created });
                });
                dispatch(actionCreator(questions));
            }
        );
        return unsubscribe;
    }, [actionCreator, dispatch]);
};
export const useSingleQuestion = (
    questionId: string,
    setQuestion: React.Dispatch<SetStateAction<QuestionType | null>>
) => {
    return useEffect(() => {
        const questionRef = doc(db, "questions", questionId);
        const unsubscribe = onSnapshot(questionRef, (questionSnapshot) => {
            if (questionSnapshot.exists()) {
                const data = questionSnapshot.data() as QuestionTypeServer;
                const uid = questionSnapshot.id;
                const created = getDateString(data.created);

                setQuestion({ uid, ...data, created });
            } else {
                setQuestion(null);
            }
        });
        return unsubscribe;
    }, [setQuestion, questionId]);
};

export const useMyQuestions = (
    userId: string,
    actionCreator: ActionCreatorWithPayload<QuestionType[]>
) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const questionsQuery = query(
            questionsCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(questionsQuery, (questionSnapshots) => {
            const allQuestions: QuestionType[] = [];
            questionSnapshots.forEach((questionSnapshot) => {
                const uid = questionSnapshot.id;
                const data = questionSnapshot.data() as QuestionTypeServer;
                const created = getDateString(data.created);
                allQuestions.push({ uid, ...data, created });
            });
            dispatch(actionCreator(allQuestions));
        });
        return unsubscribe;
    }, [userId, actionCreator, dispatch]);
};
export const useMyBookmarkedQuestions = (
    userId: string,
    setState: React.Dispatch<SetStateAction<QuestionType[]>>
) => {
    return useEffect(() => {
        const questionsQuery = query(
            questionsCollectionRef,
            where("bookmarkedBy", "array-contains", userId)
        );
        const unsubscribe = onSnapshot(questionsQuery, (questionSnapshots) => {
            const myBookmarkedQuestions: QuestionType[] = [];
            questionSnapshots.forEach((questionSnapshot) => {
                const uid = questionSnapshot.id;
                const data = questionSnapshot.data() as QuestionTypeServer;
                const created = getDateString(data.created);
                myBookmarkedQuestions.push({ uid, ...data, created });
            });
            setState(myBookmarkedQuestions);
        });
        return unsubscribe;
    }, [userId, setState]);
};

export const upVoteQuestion = async (
    question: QuestionType,
    userId: string
) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayUnion(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
export const downVoteQuestion = async (
    question: QuestionType,
    userId: string
) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayUnion(userId),
        });
    } catch (error) {}
};
export const unVoteQuestion = async (
    question: QuestionType,
    userId: string
) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
