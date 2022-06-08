import { Comment } from "components/Comments/Comment";
import { PostHeader } from "./PostHeader";
import { NewComment } from "components/Comments/NewComment";
import { useEffect, useRef, useState } from "react";
import {
    useComments,
    deleteAnswer,
    unVoteAnswer,
    upVoteAnswer,
    downVoteAnswer,
    updateAnswer,
    addBookMarkAnswer,
    removeBookMarkAnswer,
} from "utils/firebase-utils";

import { PostBody } from "./PostBody";
import { NewPostContainer } from "./NewPostContainer";
import { PostButtons } from "./PostButtons";
import { useSearchParams } from "react-router-dom";
import { AnswerType, QuestionType } from "types/Post";
import { useAppSelector } from "store/TypedExports";
import { CommentType } from "types/Comment";
import { useAuthorDetails } from "utils/firebase-utils/auth";

interface AnswerProps {
    parent: QuestionType;
    answer: AnswerType;
}

export const Answer: React.FC<AnswerProps> = ({ parent, answer }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [answerTitle, setAnswerTitle] = useState("");
    const [answerBody, setAnswerBody] = useState("");
    const answerRef = useRef<HTMLDivElement>(null);
    const currentUser = useAppSelector((state) => state.currentUser);
    const editModeHandler = () => {
        setEditMode((editMode) => !editMode);
        setAnswerTitle(answer.title);
        setAnswerBody(answer.body);
    };
    const saveClickHandler = () => {
        updateAnswer(
            {
                title: answerTitle,
                body: answerBody,
            },
            answer.uid
        );
        setAnswerBody("");
        setAnswerTitle("");
        setEditMode(false);
    };

    useComments(answer.uid, setComments);
    useEffect(() => {
        const redirectedAnswerId = searchParams.get("answerId");
        if (redirectedAnswerId === answer.uid) {
            answerRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, answer, setSearchParams]);
    const authorDetails = useAuthorDetails(answer.author);
    return (
        <div ref={answerRef} className="relative w-full">
            {currentUser && (
                <PostButtons
                    type="answer"
                    deletePost={() => deleteAnswer(parent, answer)}
                    editMode={editMode}
                    editModeHandler={editModeHandler}
                    post={answer}
                    addBookMarkPost={() =>
                        addBookMarkAnswer(answer, currentUser.uid)
                    }
                    removeBookMarkPost={() =>
                        removeBookMarkAnswer(answer, currentUser.uid)
                    }
                />
            )}

            <div className="flex flex-col w-full mx-auto ">
                {editMode ? (
                    <div>
                        <p className="p-2 border-t dark:border-zinc-600 font-medium">
                            Editing Your Answer...
                        </p>
                        <NewPostContainer
                            type="edit"
                            title={answerTitle}
                            setTitle={setAnswerTitle}
                            addClickHandler={saveClickHandler}
                            body={answerBody}
                            setBody={setAnswerBody}
                        />
                    </div>
                ) : (
                    <div className="border dark:border-zinc-600 rounded-md rounded-br-none">
                        <PostHeader
                            currentUser={currentUser}
                            post={answer}
                            unVote={(userId: string) =>
                                unVoteAnswer(answer, userId)
                            }
                            upVote={(userId: string) =>
                                upVoteAnswer(answer, userId)
                            }
                            downVote={(userId: string) =>
                                downVoteAnswer(answer, userId)
                            }
                            authorDetails={authorDetails}
                        />

                        <PostBody post={answer} />
                    </div>
                )}

                <div className="w-11/12 ml-auto border dark:border-zinc-600 border-t-0 rounded-md rounded-t-none divide-y dark:divide-zinc-600 p-2">
                    {currentUser && (
                        <NewComment parent={answer} currentUser={currentUser} />
                    )}
                    {comments.map((comment) => (
                        <Comment
                            parent={answer}
                            key={comment.uid}
                            commentData={comment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
