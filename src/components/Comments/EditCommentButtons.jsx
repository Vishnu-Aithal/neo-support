import { ArrowRightIcon, CloseIcon } from "assets/Icons/Icons";
export const EditCommentButtons = ({
    setEdit,
    edit,
    editComment,
    commentData,
}) => {
    return (
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
                    onClick={() => setEdit({ ...edit, editMode: false })}
                    className="ml-1 rounded-sm p-1 hover:scale-105 bg-red-400 transition-all">
                    <CloseIcon className={"w-3 h-3"} />
                </button>
            </div>
        </div>
    );
};
