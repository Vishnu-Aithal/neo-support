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
import { toast } from "react-toastify";

const questionsCollectionRef = collection(db, "questions");

export const addNewQuestion = async (questionDetails) => {
    try {
        await addDoc(questionsCollectionRef, {
            ...questionDetails,
            created: serverTimestamp(),
        });
        toast.success("Question Posted Succesfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const updateQuestion = async (updatedData, uid) => {
    try {
        const questionRef = doc(db, "questions", uid);
        await updateDoc(questionRef, updatedData);
        toast.success("Question Updated Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const deleteQuestion = async (question) => {
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

export const addBookMarkQuestion = async (post, userId) => {
    try {
        const questionRef = doc(db, "questions", post.uid);
        await updateDoc(questionRef, { bookmarkedBy: arrayUnion(userId) });
        toast.success("Bookmarked!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const removeBookMarkQuestion = async (post, userId) => {
    try {
        const questionRef = doc(db, "questions", post.uid);
        await updateDoc(questionRef, { bookmarkedBy: arrayRemove(userId) });
        toast.info("Bookmark Removed");
    } catch (error) {
        toast.error("Something Went Wrong!");
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
    return useEffect(() => {
        const questionRef = doc(db, "questions", questionId);
        const unsubscribe = onSnapshot(questionRef, (questionSnapshot) => {
            const data = questionSnapshot.data();
            const uid = questionSnapshot.id;
            data.created = getDateString(data.created);

            setQuestion({ uid, ...data });
        });
        return unsubscribe;
    }, [setQuestion, questionId]);
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
export const useMyBookmarkedQuestions = (userId, setState) => {
    return useEffect(() => {
        const questionsQuery = query(
            questionsCollectionRef,
            where("bookmarkedBy", "array-contains", userId)
        );
        const unsubscribe = onSnapshot(questionsQuery, (questionSnapshots) => {
            const myBookmarkedQuestions = [];
            questionSnapshots.forEach((questionSnapshot) => {
                const uid = questionSnapshot.id;
                const data = questionSnapshot.data();
                data.created = getDateString(data.created);
                myBookmarkedQuestions.push({ uid, ...data });
            });
            setState(myBookmarkedQuestions);
        });
        return unsubscribe;
    }, [userId, setState]);
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
