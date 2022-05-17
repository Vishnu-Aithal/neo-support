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
const prCollectionRef = collection(db, "links");

export const getUnreviewedPRLinks = async () => {
    let prLinks = [];
    const q = query(prCollectionRef, where("hasTwoReviews", "==", false));
    const prLinksSnapshot = await getDocs(q);
    prLinksSnapshot.forEach((prLinkRef) => {
        const uid = prLinkRef.id;
        const prDataFromServer = prLinkRef.data();
        prLinks.push({ uid, ...prDataFromServer });
    });
    return prLinks;
};

export const addNewPRLink = async (prData) => {
    try {
        const q = query(prCollectionRef, where("link", "==", prData.link));
        const existingPR = await getDocs(q);
        if (existingPR.size === 0) {
            await addDoc(prCollectionRef, {
                ...prData,
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

export const updatePRlink = async (prData) => {
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
export const deletePRlink = async (prData) => {
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

export const usePRLinks = (actionCreater) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const prLinksQuery = query(
            prCollectionRef,
            where("hasTwoReviews", "==", false)
        );
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const allPrLinks = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data();
                data.created = getDateString(data.created);
                allPrLinks.push({ uid, ...data });
            });
            dispatch(actionCreater(allPrLinks));
        });
        return unsubscribe;
    }, [dispatch, actionCreater]);
};
export const useMyPRLinks = (userId, actionCreater) => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const prLinksQuery = query(
            prCollectionRef,
            where("author", "==", userId)
        );
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const myPrLinks = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data();
                data.created = getDateString(data.created);
                myPrLinks.push({ uid, ...data });
            });
            dispatch(actionCreater(myPrLinks));
        });
        return unsubscribe;
    }, [dispatch, actionCreater, userId]);
};
