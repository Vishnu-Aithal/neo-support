import { Comment } from "components/Comments/Comment";

import { NewComment } from "components/Comments/NewComment";
import { useState } from "react";
import {
    downVoteQuestion,
    unVoteQuestion,
    upVoteQuestion,
    useComments,
    deleteQuestion,
    updateQuestion,
    addBookMarkQuestion,
    removeBookMarkQuestion,
} from "utils/firebase-utils";

import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { useSelector } from "react-redux";
import { NewPostContainer } from "./NewPostContainer";
import { PostButtons } from "./PostButtons";

export const Question = ({ question }) => {
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [questionBody, setQuestionBody] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const currentUser = useSelector((state) => state.currentUser);
    const editModeHandler = () => {
        setEditMode((editMode) => !editMode);
        setQuestionTitle(question.title);
        setQuestionBody(question.body);
    };
    const saveClickHandler = () => {
        updateQuestion(
            {
                title: questionTitle,
                body: questionBody,
            },
            question.uid
        );
        setQuestionBody("");
        setQuestionTitle("");
        setEditMode(false);
    };
    useComments(question.uid, setComments);

    return (
        <div className="flex flex-col w-full mx-auto relative">
            {currentUser && (
                <PostButtons
                    type="question"
                    deletePost={deleteQuestion}
                    editMode={editMode}
                    editModeHandler={editModeHandler}
                    post={question}
                    addBookMarkPost={addBookMarkQuestion}
                    removeBookMarkPost={removeBookMarkQuestion}
                />
            )}

            {editMode ? (
                <div>
                    <p className="p-2 border-t font-medium">
                        Editing Your Question...
                    </p>
                    <NewPostContainer
                        type="edit"
                        title={questionTitle}
                        setTitle={setQuestionTitle}
                        addClickHandler={saveClickHandler}
                        body={questionBody}
                        setBody={setQuestionBody}
                    />
                </div>
            ) : (
                <div className="border dark:border-zinc-600 rounded-md rounded-br-none">
                    <PostHeader
                        currentUser={currentUser}
                        post={question}
                        unVote={unVoteQuestion}
                        upVote={upVoteQuestion}
                        downVote={downVoteQuestion}
                    />
                    <PostBody post={question} />
                    <div className="w-full flex flex-wrap p-4 gap-2">
                        {question?.tags &&
                            question.tags.map((tag) => (
                                <p
                                    key={tag}
                                    className="border dark:border-zinc-600 px-2 py-1 rounded-md w-fit">
                                    {tag}
                                </p>
                            ))}
                    </div>
                </div>
            )}
            <div className="w-11/12 ml-auto border dark:border-zinc-600 border-t-0 rounded-md rounded-t-none divide-y dark:divide-zinc-600 p-2">
                {currentUser && (
                    <NewComment parent={question} currentUser={currentUser} />
                )}
                {comments.map((comment) => (
                    <Comment
                        parent={question}
                        key={comment.uid}
                        commentData={comment}
                    />
                ))}
            </div>
        </div>
    );
};
