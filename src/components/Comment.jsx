import { useEffect, useState } from "react";
import { deleteComment, getDateString, editComment } from "utils/firebase";
import { ArrowRightIcon, CloseIcon, PencilIcon } from "./Icons";
import { useAuth } from "contexts/AuthContext";

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
    const { currentUser } = useAuth();
    useEffect(() => {
        if (edit.editMode === true) {
            setEdit({ ...edit, editedText: commentData.body });
        } else {
            setEdit({ ...edit, editedText: "" });
        }
    }, [edit.editMode]);
    return (
        <div className="flex flex-col p-1 text-xs relative w-full">
            {!edit.editMode && currentUser?.uid === commentData.author && (
                <div className="absolute top-1 -right-0 flex gap-1">
                    <button
                        onClick={() => setEdit({ ...edit, editMode: true })}
                        className="rounded-sm p-1 hover:scale-105 bg-yellow-200 transition-all">
                        <PencilIcon className={"w-3 h-3"} />
                    </button>
                    <button
                        onClick={() => deleteComment(commentData)}
                        className="rounded-sm p-1 hover:scale-105 bg-red-400 transition-all">
                        <CloseIcon className={"w-3 h-3"} />
                    </button>
                </div>
            )}
            {edit.editMode ? (
                <div className="flex w-full items-center">
                    <input
                        onChange={(e) =>
                            setEdit({ ...edit, editedText: e.target.value })
                        }
                        autoFocus
                        className="p-2 outline-none w-full"
                        type="text"
                        value={edit.editedText}
                    />
                    <div className="ms-auto flex-shrink-0">
                        <button
                            onClick={() => {
                                editComment({
                                    ...commentData,
                                    body: edit.editedText,
                                });
                                setEdit({ ...edit, editMode: false });
                            }}
                            className="rounded-sm p-1 hover:scale-105 bg-yellow-200 transition-all">
                            <ArrowRightIcon className={"w-3 h-3"} />
                        </button>
                        <button
                            onClick={() =>
                                setEdit({ ...edit, editMode: false })
                            }
                            className="rounded-sm p-1 hover:scale-105 bg-red-400 transition-all">
                            <CloseIcon className={"w-3 h-3"} />
                        </button>
                    </div>
                </div>
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
