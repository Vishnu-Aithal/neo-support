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
import { db } from "./main";
import { useEffect } from "react";
import { deleteChildComments } from "./comments";
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
        }
    } catch (error) {
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
        console.log(error);
    }
};
export const deletePRlink = async (prData) => {
    try {
        const prRef = doc(db, "links", prData.uid);
        await deleteDoc(prRef);
        await deleteChildComments(prData.uid);
    } catch (error) {
        console.log(error);
    }
};

export const usePRLinks = (setPrLinks) => {
    const prLinksQuery = query(
        prCollectionRef,
        where("hasTwoReviews", "==", false)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const allPrLinks = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data();
                allPrLinks.push({ uid, ...data });
            });
            setPrLinks(allPrLinks);
        });
        return unsubscribe;
    }, []);
};
export const useMyPRLinks = (userId, setPrLinks) => {
    const prLinksQuery = query(prCollectionRef, where("author", "==", userId));

    return useEffect(() => {
        const unsubscribe = onSnapshot(prLinksQuery, (prLinkSnapshots) => {
            const allPrLinks = [];
            prLinkSnapshots.forEach((prLinkSnapshot) => {
                const uid = prLinkSnapshot.id;
                const data = prLinkSnapshot.data();
                allPrLinks.push({ uid, ...data });
            });
            setPrLinks(allPrLinks);
        });
        return unsubscribe;
    }, []);
};
