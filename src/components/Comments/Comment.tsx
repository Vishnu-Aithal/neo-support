import { useEffect, useState } from "react";

import { CommentButtons } from "./CommentButtons";
import { EditCommentButtons } from "./EditCommentButtons";
import { AnswerType, QuestionType } from "types/Post";
import { LinkType } from "types/Link";
import { CommentType } from "types/Comment";
import { useAppSelector } from "store/TypedExports";
import { useAuthorDetails } from "utils/firebase-utils/auth";

interface CommentProps {
    parent: QuestionType | AnswerType | LinkType;
    commentData: CommentType;
}

export const Comment: React.FC<CommentProps> = ({ parent, commentData }) => {
    const [edit, setEdit] = useState({
        editMode: false,
        editedText: "",
    });
    const currentUser = useAppSelector((state) => state.currentUser);

    useEffect(() => {
        if (edit.editMode === true) {
            setEdit((edit) => ({ ...edit, editedText: commentData.body }));
        } else {
            setEdit((edit) => ({ ...edit, editedText: "" }));
        }
    }, [edit.editMode, commentData.body, setEdit]);
    const authorDetails = useAuthorDetails(commentData.author);
    return (
        <div className="flex flex-col p-1 text-xs relative w-full">
            {!edit.editMode && currentUser?.uid === commentData.author && (
                <CommentButtons {...{ edit, setEdit, commentData, parent }} />
            )}
            {edit.editMode ? (
                <EditCommentButtons {...{ edit, setEdit, commentData }} />
            ) : (
                <p className="">{commentData.body}</p>
            )}
            <div className="ml-auto mt-1 flex flex-col flex-shrink min-w-fit">
                <p className="font-semibold">{authorDetails?.displayName}</p>
                <p className="text-gray-500 font-medium">
                    {commentData.created}
                </p>
            </div>
        </div>
    );
};
