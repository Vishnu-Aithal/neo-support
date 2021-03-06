import {
    BookmarkIcon,
    CheckIcon,
    DeleteIcon,
    PencilIcon,
} from "assets/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/TypedExports";
import { AnswerType, QuestionType } from "types/Post";

interface PostButtonProps {
    type: "question" | "answer";
    deletePost: () => void;
    post: QuestionType | AnswerType;
    editModeHandler: () => void;
    editMode: boolean;
    addBookMarkPost: () => void;
    removeBookMarkPost: () => void;
}

export const PostButtons: React.FC<PostButtonProps> = ({
    type,
    deletePost,
    post,
    editModeHandler,
    editMode,
    addBookMarkPost,
    removeBookMarkPost,
}) => {
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.currentUser)!;
    const isBookMarked = post?.bookmarkedBy?.includes(currentUser.uid);
    return (
        <div className="flex flex-col absolute gap-1 -top-2 -right-2">
            {currentUser?.uid === post.author ? (
                <>
                    <button
                        onClick={() => {
                            type === "question" && navigate("/questions");
                            deletePost();
                        }}
                        className="rounded-md  hover:scale-105 bg-red-400 dark:bg-red-600 transition-all p-0.5">
                        <DeleteIcon className={"w-4 h-4"} />
                    </button>
                    <button
                        onClick={editModeHandler}
                        className={` rounded-md  hover:scale-105 bg-yellow-200 dark:bg-yellow-500 transition-all p-0.5 ${
                            editMode ? "scale-125 hover:scale-125" : ""
                        }`}>
                        <PencilIcon className={"w-4 h-4"} />
                    </button>
                </>
            ) : (
                <button
                    onClick={() =>
                        isBookMarked ? removeBookMarkPost() : addBookMarkPost()
                    }
                    className={` rounded-md text-slate-100  hover:scale-105 bg-blue-500 dark:bg-blue-700 transition-all p-0.5 ${
                        isBookMarked ? "scale-125 hover:scale-125" : ""
                    }`}>
                    {isBookMarked ? (
                        <CheckIcon className={"w-4 h-4"} />
                    ) : (
                        <BookmarkIcon className={"w-4 h-4"} />
                    )}
                </button>
            )}
        </div>
    );
};
