import { useMyComments } from "utils/firebase-utils";
import { setMyComments } from "store/profile-slice";

import { CommentLinks } from "components/Comments/CommentLinks";
import { useAppSelector } from "store/TypedExports";

export const MyComments: React.FC = () => {
    const comments = useAppSelector((state) => state.profile.myComments);

    const currentUser = useAppSelector((state) => state.currentUser)!;

    useMyComments(currentUser.uid, setMyComments);
    return (
        <div className="flex flex-col w-11/12 mx-auto gap-2">
            {comments.map((comment) => (
                <CommentLinks key={comment.uid} commentData={comment} />
            ))}
        </div>
    );
};
