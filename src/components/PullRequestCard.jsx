import { useState, useEffect } from "react";
import { getReviewsAndComments } from "utils/github.js";
import { Comment } from "components/Comment";
import { UserReviews } from "components/UserReviews";

export const PullRequestCard = ({
    prData = {
        link: "https://github.com/Vishnu-Aithal/notes-app/pull/1",
        author: "UserId",
        comments: [],
        date: "07-05-2022 23:52",
    },
}) => {
    const { link: url, author, comments, date } = prData;
    console.log(url);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        (async () => {
            const reviews = await getReviewsAndComments(url);
            setUserReviews(reviews);
        })();
    }, [url]);

    return (
        <div
            className={`flex flex-col border-2 shadow-md w-full sm:w-96 rounded-md ${
                userReviews.length >= 2
                    ? "border-green-300 shadow-green-200"
                    : ""
            }`}>
            <div className="p-4 border-b text-lg font-semibold flex flex-col">
                <a href={url}>{url}</a>
                <p className="ml-auto text-xs text-gray-600">{date}</p>
            </div>
            <div className="p-2">
                {userReviews.map((userReview) => (
                    <UserReviews key={userReview.id} data={userReview} />
                ))}
            </div>
            <div className="p-2 border-t divide-y">
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    );
};
