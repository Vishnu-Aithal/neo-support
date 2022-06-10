import { ArrowRightIcon, CheckIcon } from "assets/Icons/Icons";
import { CommentType } from "types/Comment";
import { editComment } from "utils/firebase-utils";
interface EditCommentButtonsProps {
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
export const EditCommentButtons: React.FC<EditCommentButtonsProps> = ({
    setEdit,
    edit,
    commentData,
}) => {
    return (
        <div className="flex w-full items-center">
            <input
                onChange={(e) =>
                    setEdit({ ...edit, editedText: e.target.value })
                }
                autoFocus
                className="p-2 outline-none w-full dark:bg-zinc-600 rounded-md mr-2"
                type="text"
                value={edit.editedText}
            />
            <div className="ms-auto flex-shrink-0">
                <button
                    onClick={() => {
                        editComment(commentData.uid, {
                            body: edit.editedText,
                        });
                        setEdit({ ...edit, editMode: false });
                    }}
                    className="rounded-sm p-1 hover:scale-105 bg-yellow-200 dark:bg-yellow-500 transition-all">
                    <CheckIcon className={"w-3 h-3"} />
                </button>
                <button
                    onClick={() => setEdit({ ...edit, editMode: false })}
                    className="ml-1 rounded-sm p-1 hover:scale-105 bg-red-400 dark:bg-red-600 transition-all">
                    <ArrowRightIcon className={"w-3 h-3"} />
                </button>
            </div>
        </div>
    );
};
