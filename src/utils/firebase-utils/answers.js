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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
        toast.error("Something Went Wrong!");
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
        toast.success("Answer Posted SuccesFully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const useAnswers = (parentId, setAnswers) => {
    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("parentId", "==", parentId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const allAnswers = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data();
                data.created = getDateString(data.created);
                allAnswers.push({ uid, ...data });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, [setAnswers, parentId]);
};

export const useMyAnswers = (userId, actionCreator) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapShots) => {
            const allAnswers = [];
            answerSnapShots.forEach((answerSnapShot) => {
                const uid = answerSnapShot.id;
                const data = answerSnapShot.data();
                data.created = getDateString(data.created);
                allAnswers.push({ uid, ...data });
            });
            dispatch(actionCreator(allAnswers));
        });
        return unsubscribe;
    }, [userId, actionCreator, dispatch]);
};

export const useMyBookmarkedAnswers = (userId, setState) => {
    return useEffect(() => {
        const answersQuery = query(
            answersCollectionRef,
            where("bookmarkedBy", "array-contains", userId)
        );
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const myBookmarkedAnswers = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data();
                data.created = getDateString(data.created);
                myBookmarkedAnswers.push({ uid, ...data });
            });
            setState(myBookmarkedAnswers);
        });
        return unsubscribe;
    }, [userId, setState]);
};

export const deleteAnswer = async (answerData) => {
    try {
        const answerRef = doc(db, "answers", answerData.uid);
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayRemove(answerData.uid) });
        await deleteChildComments(answerData.uid);
        await deleteDoc(answerRef);
        toast.info("Answer Deleted Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const updateAnswer = async (updatedData, uid) => {
    try {
        const answerRef = doc(db, "answers", uid);
        await updateDoc(answerRef, updatedData);
        toast.success("Answer Updated Successfully!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const addBookMarkAnswer = async (post, userId) => {
    try {
        const answerRef = doc(db, "answers", post.uid);
        await updateDoc(answerRef, { bookmarkedBy: arrayUnion(userId) });
        toast.success("Bookmarked!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const removeBookMarkAnswer = async (post, userId) => {
    try {
        const answerRef = doc(db, "answers", post.uid);
        await updateDoc(answerRef, { bookmarkedBy: arrayRemove(userId) });
        toast.info("Bookmark Removed");
    } catch (error) {
        toast.error("Something Went Wrong!");
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
