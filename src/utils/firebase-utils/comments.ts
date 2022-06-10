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
import React, { SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewNotification, removeNotification } from "./notifications";
import { CommentType, CommentTypeServer } from "types/Comment";
import { AnswerType, QuestionType } from "types/Post";
import { LinkType } from "types/Link";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const commentsCollectionRef = collection(db, "comments");

export const useComments = (
    parentId: string,
    setComments: React.Dispatch<SetStateAction<CommentType[]>>
) => {
    return useEffect(() => {
        const commentsQuery = query(
            commentsCollectionRef,
            where("parentId", "==", parentId)
        );
        const unsubscribe = onSnapshot(commentsQuery, (commentSnapshots) => {
            const allComments: CommentType[] = [];
            commentSnapshots.forEach((commentSnapshot) => {
                const uid = commentSnapshot.id;
                const data = commentSnapshot.data() as CommentTypeServer;
                const created = getDateString(data.created);
                allComments.push({ uid, ...data, created });
            });
            setComments(allComments);
        });
        return unsubscribe;
    }, [parentId, setComments]);
};

export const addNewComment = async (
    parent: QuestionType | AnswerType | LinkType,
    commentData: Partial<CommentType>
) => {
    try {
        const response = await addDoc(commentsCollectionRef, {
            ...commentData,
            created: serverTimestamp(),
        });
        await addNewNotification(parent, commentData, response.id, "comment");
        toast.success("Comment Added!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const deleteComment = async (
    parent: QuestionType | AnswerType | LinkType,
    commentData: CommentType
) => {
    try {
        const commentRef = doc(db, "comments", commentData.uid);
        await deleteDoc(commentRef);
        await removeNotification(parent, commentData.uid);
        toast.info("Comment Deleted!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const editComment = async (
    uid: string,
    editedCommentData: Partial<CommentType>
) => {
    try {
        const commentRef = doc(db, "comments", uid);
        await updateDoc(commentRef, editedCommentData);
        toast.success("Comment Updated!");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const useMyComments = (
    userId: string,
    actionCreator: ActionCreatorWithPayload<CommentType[]>
) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const userCommentsQuery = query(
            commentsCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(
            userCommentsQuery,
            (commentSnapshots) => {
                const allComments: CommentType[] = [];
                commentSnapshots.forEach((commentSnapshot) => {
                    const uid = commentSnapshot.id;
                    const data = commentSnapshot.data() as CommentTypeServer;
                    const created = getDateString(data.created);
                    allComments.push({ uid, ...data, created });
                });
                dispatch(actionCreator(allComments));
            }
        );
        return unsubscribe;
    }, [dispatch, userId, actionCreator]);
};

export const deleteChildComments = async (parentId: string) => {
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
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
