import { Comment } from "components/Comments/Comment";

import { NewComment } from "components/Comments/NewComment";
import { useState } from "react";
import {
    downVoteQuestion,
    unVoteQuestion,
    upVoteQuestion,
    useComments,
} from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";

export const Question = ({ question }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    useComments(question.uid, setComments);
    return (
        <div className="flex flex-col w-full mx-auto ">
            <div className="border rounded-md rounded-br-none">
                <PostHeader
                    currentUser={currentUser}
                    post={question}
                    unVote={unVoteQuestion}
                    upVote={upVoteQuestion}
                    downVote={downVoteQuestion}
                />
                <PostBody post={question} />
            </div>
            <div className="w-11/12 ml-auto border border-t-0 rounded-md rounded-t-none divide-y p-2">
                {currentUser && (
                    <NewComment
                        parentId={question.uid}
                        currentUser={currentUser}
                    />
                )}
                {comments.map((comment) => (
                    <Comment key={comment.uid} commentData={comment} />
                ))}
            </div>
        </div>
    );
};
