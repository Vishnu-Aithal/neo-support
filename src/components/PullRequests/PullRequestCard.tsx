import { useState, useEffect, useRef } from "react";
import { getReviewsAndComments } from "utils/github-utils/github.js";
import { Comment } from "components/Comments/Comment";
import { NewComment } from "../Comments/NewComment";
import { UserReviews } from "components/PullRequests/UserReviews";
import { updatePRlink, deletePRlink, useComments } from "utils/firebase-utils";
import { PRCardDeleteButton } from "./DeleteButton";
import { useSearchParams } from "react-router-dom";

export const PullRequestCard = ({
    currentUser = null,
    prData = {
        uid: "sdfasd",
        link: "https://github.com/Vishnu-Aithal/notes-app/pull/1",
        author: "UserId",
        created: "fireBaseTimeStamp",
    },
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { link: url, created, uid } = prData;
    const [userReviews, setUserReviews] = useState([]);
    const [comments, setComments] = useState([]);
    const prRef = useRef(null);

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
    }, [userReviews, prData]);

    useEffect(() => {
        const redirectedPrId = searchParams.get("prId");
        if (redirectedPrId === uid) {
            setTimeout(() => {
                prRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                prRef.current.classList.add("shadow-lg");
            }, 250);
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, uid, setSearchParams]);

    useComments(uid, setComments);

    return (
        <div
            ref={prRef}
            className={`flex flex-col border-2 dark:border-zinc-600 shadow-md w-full sm:w-96 rounded-md relative ${
                userReviews.length >= 2
                    ? "border-green-200 dark:border-green-700 shadow-green-200 dark:shadow-green-700"
                    : ""
            }`}>
            {currentUser?.uid === prData.author && (
                <PRCardDeleteButton {...{ deletePRlink, prData }} />
            )}
            <div className="p-4 border-b dark:border-zinc-600 text-lg font-semibold flex flex-col">
                <a href={url} target="_blank" rel="noreferrer">
                    {url}
                </a>
                <p className="ml-auto text-xs text-gray-600">{created}</p>
            </div>
            <div className="p-2">
                {userReviews.map((userReview) => (
                    <UserReviews key={userReview.id} data={userReview} />
                ))}
            </div>
            <div className="p-2 border-t dark:border-zinc-600 divide-y mt-auto">
                {currentUser && (
                    <NewComment parent={prData} currentUser={currentUser} />
                )}
                {comments.length !== 0 &&
                    comments.map((comment) => (
                        <Comment
                            parent={prData}
                            key={comment.uid}
                            commentData={comment}
                        />
                    ))}
            </div>
        </div>
    );
};
