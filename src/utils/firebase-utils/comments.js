import {
    query,
    where,
    getDocs,
    collection,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db, getDateString } from "./main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const commentsCollectionRef = collection(db, "comments");

export const useComments = (parentId, setComments) => {
    const commentsQuery = query(
        commentsCollectionRef,
        where("parentId", "==", parentId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(commentsQuery, (commentSnapshots) => {
            const allComments = [];
            commentSnapshots.forEach((commentSnapshot) => {
                const uid = commentSnapshot.id;
                const data = commentSnapshot.data();
                data.created = getDateString(data.created);
                allComments.push({ uid, ...data });
            });
            setComments(allComments);
        });
        return unsubscribe;
    }, []);
};

export const addNewComment = async (commentData) => {
    try {
        await addDoc(commentsCollectionRef, {
            ...commentData,
            created: serverTimestamp(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (commentData) => {
    try {
        const commentRef = doc(db, "comments", commentData.uid);
        await deleteDoc(commentRef);
    } catch (error) {
        console.log(error);
    }
};

export const editComment = async (uid, editedCommentData) => {
    console.log(editedCommentData);
    try {
        const commentRef = doc(db, "comments", uid);
        await updateDoc(commentRef, editedCommentData);
    } catch (error) {
        console.log(error);
    }
};

export const useMyComments = (userId, actionCreator) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const userCommentsQuery = query(
            commentsCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(
            userCommentsQuery,
            (commentSnapshots) => {
                const allComments = [];
                commentSnapshots.forEach((commentSnapshot) => {
                    const uid = commentSnapshot.id;
                    const data = commentSnapshot.data();
                    data.created = getDateString(data.created);

                    allComments.push({ uid, ...data });
                });
                dispatch(actionCreator(allComments));
            }
        );
        return unsubscribe;
    }, [dispatch, userId, actionCreator]);
};

export const deleteChildComments = async (parentId) => {
    try {
        const commentsQuery = query(
            commentsCollectionRef,
            where("parentId", "==", parentId)
        );
        const commentsSnapShots = await getDocs(commentsQuery);

        commentsSnapShots.forEach(async (commentsnapshot) => {
            const commentId = commentsnapshot.id;
            const commentRef = doc(db, "comments", commentId);
            await deleteDoc(commentRef);
        });
    } catch (error) {
        console.log(error);
    }
};
