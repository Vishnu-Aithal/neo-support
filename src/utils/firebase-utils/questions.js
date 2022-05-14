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
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const questionsCollectionRef = collection(db, "questions");

export const addNewQuestion = async (questionDetails) => {
    try {
        await addDoc(questionsCollectionRef, {
            ...questionDetails,
            created: serverTimestamp(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteQuestion = async (question) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await deleteDoc(questionRef);
        await deleteChildAnswers(question.uid);
        await deleteChildComments(question.uid);
    } catch (error) {
        console.log(error);
    }
};

export const useQuestions = (actionCreator) => {
    const dispatch = useDispatch();
    return useEffect(() => {
        const allQuestionsQuery = query(questionsCollectionRef);

        const unsubscribe = onSnapshot(
            allQuestionsQuery,
            (questionSnapshots) => {
                const questions = [];
                questionSnapshots.forEach((questionSnapShot) => {
                    const uid = questionSnapShot.id;
                    const data = questionSnapShot.data();
                    data.created = getDateString(data.created);
                    questions.push({ uid, ...data });
                });
                dispatch(actionCreator(questions));
            }
        );
        return unsubscribe;
    }, [actionCreator, dispatch]);
};
export const useSingleQuestion = (questionId, setQuestion) => {
    const questionRef = doc(db, "questions", questionId);
    return useEffect(() => {
        const unsubscribe = onSnapshot(questionRef, (questionSnapshot) => {
            const data = questionSnapshot.data();
            const uid = questionSnapshot.id;

            setQuestion({ uid, ...data });
        });
        return unsubscribe;
    }, []);
};

export const useMyQuestions = (userId, actionCreator) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const questionsQuery = query(
            questionsCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(questionsQuery, (questionSnapshots) => {
            const allQuestions = [];
            questionSnapshots.forEach((questionSnapshot) => {
                const uid = questionSnapshot.id;
                const data = questionSnapshot.data();
                data.created = getDateString(data.created);
                allQuestions.push({ uid, ...data });
            });
            dispatch(actionCreator(allQuestions));
        });
        return unsubscribe;
    }, [userId, actionCreator, dispatch]);
};

export const upVoteQuestion = async (question, userId) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayUnion(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
export const downVoteQuestion = async (question, userId) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayUnion(userId),
        });
    } catch (error) {}
};
export const unVoteQuestion = async (question, userId) => {
    try {
        const questionRef = doc(db, "questions", question.uid);
        await updateDoc(questionRef, {
            upVotes: arrayRemove(userId),
            downVotes: arrayRemove(userId),
        });
    } catch (error) {}
};
