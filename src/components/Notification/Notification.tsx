import { DeleteIcon } from "assets/Icons/Icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "store/TypedExports";
import { LinkType } from "types/Link";
import { NotificationType } from "types/Notification";
import { AnswerType, QuestionType } from "types/Post";
import { UserType } from "types/User";
import {
    deleteNotification,
    getParentData,
    getUserData,
    markNotificationAsRead,
} from "utils/firebase-utils";

interface NotificationProps {
    notification: NotificationType;
}

export const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const currentUser = useAppSelector((state) => state.currentUser)!; // page not accessable if no current User
    const [userData, setUserData] = useState<UserType | null>(null);
    const [parentData, setParentData] = useState<
        QuestionType | AnswerType | LinkType | null
    >(null);
    const message = {
        comment: "commented",
        answer: "answered",
    };
    const parent = {
        questions: "your question",
        links: "your PR-Link",
        answers: "your answer",
    };
    const getLink = () => {
        if (parentData) {
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
        }
        return "/";
    };
    useEffect(() => {
        (async () => {
            const user = await getUserData(notification.author);
            const parent = await getParentData(
                notification.parentCollection,
                notification.parent
            );
            setUserData(user);

            if (!parent && currentUser) {
                console.log("here");
                deleteNotification(notification, currentUser.uid);
            } else {
                parent && setParentData(parent);
            }
        })();
    }, [notification, currentUser]);
    return (
        parentData &&
        userData && (
            <div className="relative w-full">
                <button
                    onClick={async () => {
                        await deleteNotification(notification, currentUser.uid);
                        toast.info("Notification Deleted");
                    }}
                    className="absolute rounded-sm p-1 top-1 right-1 hover:scale-105 bg-red-400 dark:bg-red-600 transition-all">
                    <DeleteIcon className={"w-3 h-3"} />
                </button>
                <Link
                    onClick={() =>
                        markNotificationAsRead(
                            notification.uid,
                            currentUser.notifications,
                            currentUser.uid
                        )
                    }
                    to={getLink()}
                    className="rounded-md border dark:border-zinc-600 hover:shadow-md p-2 flex items-start w-full">
                    <img
                        className="rounded-full w-12 aspect-square"
                        src={userData.photoURL}
                        alt={userData.displayName}
                    />
                    <div className="ml-2 w-full">
                        <h2 className="font-semibold">
                            {userData.displayName}
                        </h2>
                        <p className="text-sm">
                            {`${message[notification.type]} on ${
                                notification.bookmarked
                                    ? "your bookmarked post"
                                    : parent[notification.parentCollection]
                            }`}
                        </p>
                        <p className="font-semibold mt-2">
                            {parentData?.title}
                        </p>
                    </div>
                </Link>
            </div>
        )
    );
};
