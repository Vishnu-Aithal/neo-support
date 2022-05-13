import { useEffect, useState } from "react";
import {
    deleteComment,
    getDateString,
    editComment,
} from "utils/firebase-utils";

import { CommentButtons } from "./CommentButtons";
import { EditCommentButtons } from "./EditCommentButtons";
import { useSelector } from "react-redux";

export const Comment = ({
    commentData = {
        uid: 456,
        author: "authorId",
        authorDetails: {},
        body: "",
        created: "Timestamp",
    },
}) => {
    const [edit, setEdit] = useState({
        editMode: false,
        editedText: "",
    });
    const currentUser = useSelector((state) => state.currentUser);
    useEffect(() => {
        if (edit.editMode === true) {
            setEdit((edit) => ({ ...edit, editedText: commentData.body }));
        } else {
            setEdit((edit) => ({ ...edit, editedText: "" }));
        }
    }, [edit.editMode, commentData.body, setEdit]);
    return (
        <div className="flex flex-col p-1 text-xs relative w-full">
            {!edit.editMode && currentUser?.uid === commentData.author && (
                <CommentButtons
                    {...{ edit, setEdit, deleteComment, commentData }}
                />
            )}
            {edit.editMode ? (
                <EditCommentButtons
                    {...{ edit, editComment, setEdit, commentData }}
                />
            ) : (
                <p className="">{commentData.body}</p>
            )}
            <div className="ml-auto mt-1 flex flex-col flex-shrink min-w-fit">
                <p className="font-semibold">
                    {commentData.authorDetails.displayName}
                </p>
                <p className="text-gray-500 font-medium">
                    {getDateString(commentData.created)}
                </p>
            </div>
        </div>
    );
};
