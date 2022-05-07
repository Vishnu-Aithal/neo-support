import { useState, useEffect } from "react";
import { getReviewsAndComments } from "utils/github.js";
import { Comment } from "components/Comment";
import { UserReviews } from "components/UserReviews";

export const PullRequestCard = ({ url }) => {
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        (async () => {
            const reviews = await getReviewsAndComments(url);
            setUserReviews(reviews);
        })();
    }, [url]);

    return (
        <div className="flex flex-col border shadow-md w-full sm:w-96 rounded-md">
            <div className="p-4 border-b text-lg font-semibold">
                <a href={url}>{url}</a>
            </div>
            <div className="p-2">
                {userReviews.map((userReview) => (
                    <UserReviews key={userReview.id} data={userReview} />
                ))}
            </div>
            <div className="p-2 border-t">
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    );
};
