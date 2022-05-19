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
import { useSelector } from "react-redux";
import { NewPostContainer } from "./NewPostContainer";
import { PostButtons } from "./PostButtons";
import { useSearchParams } from "react-router-dom";

export const Answer = ({ answer }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [answerTitle, setAnswerTitle] = useState("");
    const [answerBody, setAnswerBody] = useState("");
    const answerRef = useRef(null);
    const currentUser = useSelector((state) => state.currentUser);
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
            answerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setSearchParams({});
        }
    }, [searchParams, answer, setSearchParams]);
    return (
        <div ref={answerRef} className="relative w-full">
            {currentUser && (
                <PostButtons
                    type="answer"
                    deletePost={deleteAnswer}
                    editMode={editMode}
                    editModeHandler={editModeHandler}
                    post={answer}
                    addBookMarkPost={addBookMarkAnswer}
                    removeBookMarkPost={removeBookMarkAnswer}
                />
            )}

            <div className="flex flex-col w-full mx-auto ">
                {editMode ? (
                    <div>
                        <p className="p-2 border-t font-medium">
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
                    <div className="border rounded-md rounded-br-none">
                        <PostHeader
                            currentUser={currentUser}
                            post={answer}
                            unVote={unVoteAnswer}
                            upVote={upVoteAnswer}
                            downVote={downVoteAnswer}
                        />

                        <PostBody post={answer} />
                    </div>
                )}

                <div className="w-11/12 ml-auto border border-t-0 rounded-md rounded-t-none divide-y p-2">
                    {currentUser && (
                        <NewComment
                            parentId={answer.uid}
                            currentUser={currentUser}
                        />
                    )}
                    {comments.map((comment) => (
                        <Comment key={comment.uid} commentData={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};
