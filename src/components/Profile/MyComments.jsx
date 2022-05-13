import { useState } from "react";
import { useMyComments } from "utils/firebase-utils";
import { Comment } from "components/Comments/Comment";

import { useSelector } from "react-redux";

export const MyComments = () => {
    const [comments, setComments] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);
    useMyComments(currentUser.uid, setComments);
    return (
        <div className="flex flex-col w-11/12 mx-auto divide-y-2 border rounded-md">
            {comments.map((comment) => (
                <Comment key={comment.uid} commentData={comment} />
            ))}
        </div>
    );
};
