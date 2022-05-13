import { Comment } from "components/Comments/Comment";
import { PostHeader } from "./PostHeader";
import { CloseIcon } from "assets/Icons/Icons";
import { NewComment } from "components/Comments/NewComment";
import { useState } from "react";
import {
    useComments,
    deleteAnswer,
    unVoteAnswer,
    upVoteAnswer,
    downVoteAnswer,
} from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { PostBody } from "./PostBody";

export const Answer = ({ answer }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    useComments(answer.uid, setComments);
    return (
        <div className="relative w-full">
            {currentUser?.uid === answer.author && (
                <button
                    onClick={() => deleteAnswer(answer)}
                    className="absolute rounded-sm top-0 right-0 hover:scale-105 bg-red-400 transition-all">
                    <CloseIcon className={"w-5 h-5"} />
                </button>
            )}
            <div className="flex flex-col w-full mx-auto ">
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
