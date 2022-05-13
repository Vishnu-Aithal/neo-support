import { useState } from "react";
import { addNewComment } from "utils/firebase-utils";

export const NewComment = ({ parentId = "sdfadsjf", currentUser = null }) => {
    const [body, setBody] = useState("");
    return (
        <div className="flex">
            <input
                value={body}
                onChange={(e) => setBody(e.target.value)}
                type="text"
                className="w-full p-2 outline-none peer"
                placeholder="Add Comment"
            />
            <button
                onClick={() => {
                    addNewComment({
                        parentId,
                        body,
                        author: currentUser.uid,
                        authorDetails: currentUser,
                    });
                    setBody("");
                }}
                className="ml-auto px-2 border-2 m-1 hover:bg-gray-200 rounded-md peer-placeholder-shown:hidden hover:shadow-sm">
                Comment
            </button>
        </div>
    );
};
