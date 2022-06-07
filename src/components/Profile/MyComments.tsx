import { useMyComments } from "utils/firebase-utils";
import { setMyComments } from "store/profile-slice";

import { useSelector } from "react-redux";
import { CommentLinks } from "components/Comments/CommentLinks";

export const MyComments = () => {
    const comments = useSelector((state) => state.profile.myComments);

    const currentUser = useSelector((state) => state.currentUser);

    useMyComments(currentUser.uid, setMyComments);
    return (
        <div className="flex flex-col w-11/12 mx-auto gap-2">
            {comments.map((comment) => (
                <CommentLinks key={comment.uid} commentData={comment} />
            ))}
        </div>
    );
};
