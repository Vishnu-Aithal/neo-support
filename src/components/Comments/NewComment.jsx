import { useState } from "react";
import { addNewComment } from "utils/firebase-utils";

export const NewComment = ({ parent = {}, currentUser = null }) => {
    const [body, setBody] = useState("");
    return (
        <div className="flex">
            <input
                value={body}
                onChange={(e) => setBody(e.target.value)}
                type="text"
                className="w-full p-2 outline-none peer dark:bg-zinc-800"
                placeholder="Add Comment"
            />
            <button
                onClick={() => {
                    addNewComment(parent, {
                        parentId: parent.uid,
                        parentCollection: parent.collection,
                        body,
                        author: currentUser.uid,
                        authorDetails: currentUser,
                    });
                    setBody("");
                }}
                className="ml-auto text-sm px-2 border-2 dark:border-zinc-600 m-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md peer-placeholder-shown:hidden hover:shadow-sm animate-fade-in">
                Comment
            </button>
        </div>
    );
};
