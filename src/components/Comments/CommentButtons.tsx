import { PencilIcon, DeleteIcon } from "assets/Icons/Icons";
import { CommentType } from "types/Comment";
import { LinkType } from "types/Link";
import { AnswerType, QuestionType } from "types/Post";
import { deleteComment } from "utils/firebase-utils";

interface CommentButtonProps {
    parent: QuestionType | AnswerType | LinkType;
    setEdit: React.Dispatch<
        React.SetStateAction<{
            editMode: boolean;
            editedText: string;
        }>
    >;
    edit: {
        editMode: boolean;
        editedText: string;
    };
    commentData: CommentType;
}

export const CommentButtons: React.FC<CommentButtonProps> = ({
    parent,
    setEdit,
    edit,
    commentData,
}) => {
    return (
        <div className="absolute top-1 -right-0 flex gap-1">
            <button
                onClick={() => setEdit({ ...edit, editMode: true })}
                className="rounded-sm p-1 hover:scale-105 bg-yellow-200 dark:bg-yellow-500 transition-all">
                <PencilIcon className={"w-3 h-3"} />
            </button>
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    deleteComment(parent, commentData);
                }}
                className="rounded-sm p-1 hover:scale-105 bg-red-400 dark:bg-red-600 transition-all">
                <DeleteIcon className={"w-3 h-3"} />
            </span>
        </div>
    );
};
