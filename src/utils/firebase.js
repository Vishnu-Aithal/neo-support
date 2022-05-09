// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp,
    onSnapshot,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { toBeEmptyDOMElement } from "@testing-library/jest-dom/dist/matchers";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "neo-support.firebaseapp.com",
    projectId: "neo-support",
    storageBucket: "neo-support.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const questionsCollectionRef = collection(db, "questions");
const usersCollectionRef = collection(db, "users");
const commentsCollectionRef = collection(db, "comments");
const prCollectionRef = collection(db, "links");
const answersCollectionRef = collection(db, "answers");

export const signInWithGoogle = async () => {
    try {
        const { user } = await signInWithPopup(auth, googleProvider);
        const { uid, displayName, photoURL, email } = user;
        const userRef = doc(db, "users", user.uid);
        const userSnapShot = await getDoc(userRef);
        if (!userSnapShot.exists()) {
            await setDoc(userRef, {
                uid,
                displayName,
                photoURL,
                email,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = async (user) => {
    const userDataSnapshot = await getDoc(doc(db, "users", user.uid));
    return userDataSnapshot.data();
};

export const getDateString = (timestamp) => {
    if (timestamp) {
        const dateString = timestamp.toDate().toString();
        return dateString.slice(0, 24);
    }
};

export const signOutFromApp = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};

export const onAuthListener = (callbackFunc) => {
    return onAuthStateChanged(auth, callbackFunc);
};

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

export const editComment = async (editedCommentData) => {
    try {
        const commentRef = doc(db, "comments", editedCommentData.uid);
        await updateDoc(commentRef, { ...editedCommentData });
    } catch (error) {
        console.log(error);
    }
};

export const useMyComments = (userId, setComments) => {
    const userCommentsQuery = query(
        commentsCollectionRef,
        where("author", "==", userId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(
            userCommentsQuery,
            (commentSnapshots) => {
                const allComments = [];
                commentSnapshots.forEach((commentSnapshot) => {
                    const uid = commentSnapshot.id;
                    const data = commentSnapshot.data();
                    allComments.push({ uid, ...data });
                });
                setComments(allComments);
            }
        );
        return unsubscribe;
    }, []);
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

export const useQuestions = (setQuestions) => {
    const allQuestionsQuery = query(questionsCollectionRef);
    return useEffect(() => {
        const unsubscribe = onSnapshot(
            allQuestionsQuery,
            (questionSnapshots) => {
                const questions = [];
                questionSnapshots.forEach((questionSnapShot) => {
                    const uid = questionSnapShot.id;
                    const data = questionSnapShot.data();
                    questions.push({ uid, ...data });
                });
                setQuestions(questions);
            }
        );
        return unsubscribe;
    }, []);
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

export const addNewAnswer = async (answerData) => {
    try {
        const response = await addDoc(answersCollectionRef, {
            ...answerData,
            created: serverTimestamp(),
        });
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayUnion(response.id) });
    } catch (error) {
        console.log(error);
    }
};

export const useAnswers = (parentId, setAnswers) => {
    const answersQuery = query(
        answersCollectionRef,
        where("parentId", "==", parentId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(answersQuery, (answerSnapshots) => {
            const allAnswers = [];
            answerSnapshots.forEach((answerSnapshot) => {
                const uid = answerSnapshot.id;
                const data = answerSnapshot.data();
                allAnswers.push({ uid, ...data });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, []);
};

export const useMyQuestions = (userId, setQuestions) => {
    const questionsQuery = query(
        questionsCollectionRef,
        where("author", "==", userId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(questionsQuery, (questionSnapshots) => {
            const allQuestions = [];
            questionSnapshots.forEach((questionSnapshot) => {
                const uid = questionSnapshot.id;
                const data = questionSnapshot.data();
                allQuestions.push({ uid, ...data });
            });
            setQuestions(allQuestions);
        });
        return unsubscribe;
    }, []);
};

export const useMyAnswers = (userId, setAnswers) => {
    const answersQuery = query(
        answersCollectionRef,
        where("author", "==", userId)
    );

    return useEffect(() => {
        const unsubscribe = onSnapshot(answersQuery, (answerSnapShots) => {
            const allAnswers = [];
            answerSnapShots.forEach((answerSnapShot) => {
                const uid = answerSnapShot.id;
                const data = answerSnapShot.data();
                allAnswers.push({ uid, ...data });
            });
            setAnswers(allAnswers);
        });
        return unsubscribe;
    }, []);
};

export const deleteAnswer = async (answerData) => {
    try {
        const answerRef = doc(db, "answers", answerData.uid);
        const questionRef = doc(db, "questions", answerData.parentId);
        await updateDoc(questionRef, { answers: arrayRemove(answerData.uid) });
        await deleteChildComments(answerData.uid);
        await deleteDoc(answerRef);
    } catch (error) {
        console.log(error);
    }
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
