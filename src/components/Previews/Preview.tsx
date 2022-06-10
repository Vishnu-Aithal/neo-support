import { Link } from "react-router-dom";
import { UserImage } from "./UserImage";
import { PreviewBody } from "./PreviewBody";
import { AnswerType, QuestionType } from "types/Post";
import { useAuthorDetails } from "utils/firebase-utils/auth";

interface PreviewGeneric<T, U> {
    postData: T;
    type: U;
}

type PreviewProps =
    | PreviewGeneric<AnswerType, "answer">
    | PreviewGeneric<QuestionType, "question">;

export const Preview: React.FC<PreviewProps> = (props) => {
    const { postData, type } = props;
    const authorDetails = useAuthorDetails(postData.author);
    return (
        <div className="relative w-full">
            <Link
                to={
                    type === "answer" && postData.parentId
                        ? `/question/${postData.parentId}?answerId=${postData.uid}`
                        : `/question/${postData.uid}`
                }
                className="flex w-full mx-auto border dark:border-zinc-600 rounded-md p-2 shadow-sm hover:shadow-md">
                <UserImage src={authorDetails?.photoURL || ""} />

                {type === "question" ? (
                    <PreviewBody
                        postData={postData}
                        authorDetails={authorDetails}
                        type={"question"}
                    />
                ) : (
                    <PreviewBody
                        postData={postData}
                        authorDetails={authorDetails}
                        type={"answer"}
                    />
                )}
            </Link>
        </div>
    );
};
