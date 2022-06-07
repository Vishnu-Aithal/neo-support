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
import { deleteChildComments } from "./comments";
import { toast } from "react-toastify";
import { LinkType, LinkTypeServer } from "types/Link";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
const prCollectionRef = collection(db, "links");

export const getUnreviewedPRLinks = async () => {
    let prLinks: LinkType[] = [];
    const q = query(prCollectionRef, where("hasTwoReviews", "==", false));
    const prLinksSnapshot = await getDocs(q);
    prLinksSnapshot.forEach((prLinkRef) => {
        const uid = prLinkRef.id;
        const prDataFromServer = prLinkRef.data() as LinkTypeServer;
        const created = getDateString(prDataFromServer.created);
        prLinks.push({ uid, ...prDataFromServer, created });
    });
    return prLinks;
};

export const addNewPRLink = async (prData: Partial<LinkType>) => {
    try {
        const q = query(prCollectionRef, where("link", "==", prData.link));
        const existingPR = await getDocs(q);
        if (existingPR.size === 0) {
            await addDoc(prCollectionRef, {
                ...prData,
                collection: "links",
                created: serverTimestamp(),
            });
            toast.success("PR Added Successfully!");
        } else {
            toast.error("PR Already Exists!");
        }
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const updatePRlink = async (prData: LinkType) => {
    try {
        const prRef = doc(db, "links", prData.uid);
        await updateDoc(prRef, {
            hasTwoReviews: true,
        });
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};
export const deletePRlink = async (prData: LinkType) => {
    try {
        const prRef = doc(db, "links", prData.uid);
        await deleteDoc(prRef);
        await deleteChildComments(prData.uid);
        toast.info("PR Deleted");
    } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
    }
};

export const usePRLinks = (
    actionCreater: ActionCreatorWithPayload<LinkType[]>
) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const prLinksQuery = query(
            prCollectionRef,
            where("hasTwoReviews", "==", false)
        );
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const allPrLinks: LinkType[] = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data() as LinkTypeServer;
                const created = getDateString(data.created);
                allPrLinks.push({ uid, ...data, created });
            });
            dispatch(actionCreater(allPrLinks));
        });
        return unsubscribe;
    }, [dispatch, actionCreater]);
};
export const useMyPRLinks = (
    userId: string,
    actionCreater: ActionCreatorWithPayload<LinkType[]>
) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const prLinksQuery = query(
            prCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const myPrLinks: LinkType[] = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data() as LinkTypeServer;
                const created = getDateString(data.created);
                myPrLinks.push({ uid, ...data, created });
            });
            dispatch(actionCreater(myPrLinks));
        });
        return unsubscribe;
    }, [dispatch, actionCreater, userId]);
};
