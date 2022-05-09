import { Comment } from "components/Comment";
import { CaretUpFillIcon, CaretDownFillIcon } from "components/Icons";
import { NewComment } from "components/NewComment";
import { useState } from "react";
import {
    downVoteQuestion,
    getDateString,
    unVoteQuestion,
    upVoteQuestion,
    useComments,
} from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const Question = ({ question }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    useComments(question.uid, setComments);
    return (
        <div className="flex flex-col w-full mx-auto ">
            <div className="border rounded-md rounded-br-none">
                {/* Header */}
                <div className="flex p-4 pt-2 border-b">
                    {/* Author Image */}
                    <img
                        src={question.authorDetails.photoURL}
                        alt={question.authorDetails.displayName}
                        className="w-20 rounded-lg object-cover object-center h-20 mt-auto flex-shrink-0"
                    />
                    {/* Author Namme */}

                    <h2 className="ml-4 font-semibold text-xl mt-auto">
                        {question.authorDetails.displayName}
                    </h2>
                    {/* Time Stamp */}
                    <p className="text-xs ml-auto text-gray-600 font-semibold mt-auto">
                        {`Posted - ${getDateString(question.created)}`}
                    </p>
                    {/* Votes */}
                    <div className="flex flex-col sm:ml-2 ml-1 items-center text-xl">
                        <button
                            disabled={!currentUser}
                            onClick={() =>
                                question.downVotes.includes(currentUser.uid)
                                    ? unVoteQuestion(question, currentUser.uid)
                                    : upVoteQuestion(question, currentUser.uid)
                            }>
                            <CaretUpFillIcon className={"h-8 w-8"} />
                        </button>
                        {question.upVotes.length - question.downVotes.length}
                        <button
                            disabled={!currentUser}
                            onClick={() =>
                                question.upVotes.includes(currentUser.uid)
                                    ? unVoteQuestion(question, currentUser.uid)
                                    : downVoteQuestion(
                                          question,
                                          currentUser.uid
                                      )
                            }>
                            <CaretDownFillIcon className={"h-8 w-8"} />
                        </button>
                    </div>
                </div>
                {/* body */}
                <div className="p-4" data-color-mode="light">
                    <h2 className="text-lg font-medium">{question.title}</h2>
                    <MDEditor.Markdown
                        className="my-2 overflow-auto"
                        source={question.body}
                        rehypePlugins={[[rehypeSanitize]]}
                    />
                </div>
                {/* comments */}
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
