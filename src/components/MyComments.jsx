import { useState } from "react";
import { useMyComments } from "utils/firebase";
import { Comment } from "components/Comment";
import { useAuth } from "contexts/AuthContext";

export const MyComments = () => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    useMyComments(currentUser.uid, setComments);
    return (
        <div className="flex flex-col w-11/12 mx-auto divide-y-2 border rounded-md">
            {comments.map((comment) => (
                <Comment key={comment.uid} commentData={comment} />
            ))}
        </div>
    );
};
