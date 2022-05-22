import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getUserData } from "./auth";
import { db } from "./main";

export const addNewNotification = async (parent, child, responseId, type) => {
    const authorRef = doc(db, "users", parent.author);
    await updateDoc(authorRef, {
        notifications: arrayUnion({
            uid: responseId,
            type: type,
            author: child.author,
            read: false,
            parent: parent.uid,
            parentCollection: child.parentCollection,
        }),
    });
    if (parent?.bookmarkedBy?.length !== 0) {
        parent?.bookmarkedBy?.forEach(async (userId) => {
            const authorRef = doc(db, "users", userId);
            await updateDoc(authorRef, {
                notifications: arrayUnion({
                    uid: responseId,
                    type: type,
                    bookmarked: true,
                    author: child.author,
                    read: false,
                    parent: parent.uid,
                    parentCollection: child.parentCollection,
                }),
            });
        });
    }
};

export const removeNotification = async (parent, uid) => {
    const authorRef = doc(db, "users", parent.author);
    const authorData = await getUserData(parent.author);

    const notificationToRemove = authorData?.notifications?.find(
        (notification) => notification.uid === uid
    );
    if (notificationToRemove) {
        await updateDoc(authorRef, {
            notifications: arrayRemove(notificationToRemove),
        });
    }
    if (parent?.bookmarkedBy?.length !== 0) {
        parent?.bookmarkedBy?.forEach(async (userId) => {
            const authorRef = doc(db, "users", userId);
            const authorData = await getUserData(userId);

            const notificationToRemove = authorData.notifications.find(
                (notification) => notification.uid === uid
            );
            if (notificationToRemove) {
                await updateDoc(authorRef, {
                    notifications: arrayRemove(notificationToRemove),
                });
            }
        });
    }
};
export const deleteNotification = async (notification, uid) => {
    try {
        const authorRef = doc(db, "users", uid);
        await updateDoc(authorRef, {
            notifications: arrayRemove(notification),
        });
    } catch (error) {
        console.log(error);
    }
};
export const markNotificationAsRead = async (
    notificationId,
    notifications,
    userId
) => {
    try {
        const updatedNotifications = notifications.map((notification) =>
            notification.uid === notificationId
                ? { ...notification, read: true }
                : notification
        );
        const authorRef = doc(db, "users", userId);
        await updateDoc(authorRef, {
            notifications: updatedNotifications,
        });
    } catch (error) {
        console.log(error);
    }
};
