import { useState, useEffect } from "react";
import { getReviewsAndComments } from "utils/github.js";
import { Comment } from "components/Comment";
import { NewComment } from "./NewComment";
import { UserReviews } from "components/UserReviews";
import {
    getDateString,
    updatePRlink,
    deletePRlink,
    useComments,
} from "utils/firebase";
import { CloseIcon } from "./Icons";

export const PullRequestCard = ({
    currentUser = null,
    prData = {
        uid: "sdfasd",
        link: "https://github.com/Vishnu-Aithal/notes-app/pull/1",
        author: "UserId",
        created: "fireBaseTimeStamp",
    },
}) => {
    const { link: url, created, uid } = prData;
    const [userReviews, setUserReviews] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const reviews = await getReviewsAndComments(url);
            setUserReviews(reviews);
        })();
    }, [url]);

    useEffect(() => {
        if (userReviews.length >= 2) {
            updatePRlink(prData);
        }
    }, [userReviews]);

    useComments(uid, setComments);

    return (
        <div
            className={`flex flex-col border-2 shadow-md w-full sm:w-96 rounded-md relative ${
                userReviews.length >= 2
                    ? "border-green-100 shadow-green-200"
                    : ""
            }`}>
            {currentUser?.uid === prData.author && (
                <button
                    onClick={() => deletePRlink(prData)}
                    className="absolute rounded-sm p-2 -top-1 -right-1 hover:scale-105 bg-red-400 transition-all">
                    <CloseIcon className={"w-5 h-5"} />
                </button>
            )}
            <div className="p-4 border-b text-lg font-semibold flex flex-col">
                <a href={url} target="_blank">
                    {url}
                </a>
                <p className="ml-auto text-xs text-gray-600">
                    {getDateString(created)}
                </p>
            </div>
            <div className="p-2">
                {userReviews.map((userReview) => (
                    <UserReviews key={userReview.id} data={userReview} />
                ))}
            </div>
            <div className="p-2 border-t divide-y mt-auto">
                {currentUser && (
                    <NewComment parentId={uid} currentUser={currentUser} />
                )}
                {comments.length !== 0 &&
                    comments.map((comment) => (
                        <Comment key={comment.uid} commentData={comment} />
                    ))}
            </div>
        </div>
    );
};
