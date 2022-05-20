import { CloseIcon } from "assets/Icons/Icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    deleteNotification,
    getParentData,
    getUserData,
} from "utils/firebase-utils";

export const Notification = ({ notification }) => {
    const currentUser = useSelector((state) => state.currentUser);
    const [userData, setUserData] = useState(null);
    const [parentData, setParentData] = useState(null);
    const message = {
        comment: "commented",
        answer: "answered",
    };
    const parent = {
        questions: "your Question",
        links: "your PR-Link",
        answers: "your Answer",
    };
    const getLink = () => {
        if (notification.type === "comment") {
            if (parentData.collection === "questions") {
                return `/question/${parentData.uid}`;
            }
            if (parentData.collection === "answers") {
                return `/question/${parentData.parentId}?answerId=${parentData.uid}`;
            }
            if (parentData.collection === "links") {
                return `/profile/my-pr-links?prId=${parentData.uid}`;
            }
        }
        if (notification.type === "answer") {
            return `/question/${parentData.uid}?answerId=${notification.uid}`;
        }
    };
    useEffect(() => {
        (async () => {
            const user = await getUserData(notification.author);
            const parent = await getParentData(
                notification.parentCollection,
                notification.parent
            );
            setUserData(user);

            if (!parent) {
                console.log("here");
                deleteNotification(notification, currentUser.uid);
            } else {
                setParentData(parent);
            }
        })();
    }, [notification, currentUser.uid]);
    return (
        parentData &&
        userData && (
            <div className="relative w-full">
                <button
                    onClick={async () => {
                        await deleteNotification(notification, currentUser.uid);
                        toast.info("Notification Deleted");
                    }}
                    className="absolute rounded-sm p-1 top-1 right-1 hover:scale-105 bg-red-400 transition-all">
                    <CloseIcon className={"w-3 h-3"} />
                </button>
                <Link
                    to={getLink()}
                    className="rounded-md border hover:shadow-md p-2 flex items-start w-full">
                    <img
                        className="rounded-full w-12"
                        src={userData.photoURL}
                        alt={userData.displayName}
                    />
                    <div className="ml-2 w-full">
                        <h2 className="font-semibold">
                            {userData.displayName}
                        </h2>
                        <p>
                            {`${message[notification.type]} on ${
                                parent[notification.parentCollection]
                            }`}
                        </p>
                        <p className="font-semibold mt-2">{`${parentData?.title}`}</p>
                    </div>
                </Link>
            </div>
        )
    );
};