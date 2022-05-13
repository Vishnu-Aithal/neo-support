import { PencilIcon, CloseIcon } from "assets/Icons/Icons";

export const CommentButtons = ({
    setEdit,
    edit,
    deleteComment,
    commentData,
}) => {
    return (
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
    );
};
