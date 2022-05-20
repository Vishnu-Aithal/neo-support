import { useEffect, useState } from "react";
import axios from "axios";
import { processUrlForValidation } from "utils/github-utils/github";
export const NewPullRequest = ({ currentUser, addNewPRLink }) => {
    const [newLink, setNewLink] = useState("");
    const [validLink, setValidLink] = useState(false);

    useEffect(() => {
        let timeOutId;
        setValidLink(false);
        (async () => {
            if (
                newLink.includes("https://github.com/") &&
                newLink.includes("/pull/")
            ) {
                const url = processUrlForValidation(newLink);
                timeOutId = setTimeout(() => {
                    (async () => {
                        try {
                            const response = await axios.get(url);
                            if (response.status === 200) setValidLink(true);
                        } catch (error) {}
                    })();
                }, 500);
            }
        })();
        return () => clearTimeout(timeOutId);
    }, [newLink]);

    return (
        <div className="flex items-center w-full">
            <input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                type="text"
                className={`ml-auto w-full p-2 border outline-none dark:bg-zinc-700 dark:border-zinc-600 rounded focus:shadow ${
                    newLink && !validLink ? "border-red-300 shadow-red-300" : ""
                }`}
                placeholder="Add PR-Link for Review"
            />
            <button
                disabled={!validLink}
                onClick={() => {
                    addNewPRLink({
                        title: newLink,
                        author: currentUser.uid,
                        authorDetails: currentUser,
                        link: newLink,
                        hasTwoReviews: false,
                    });
                    setNewLink("");
                }}
                className="ml-2 px-5 py-2 border dark:border-zinc-600 rounded-md shadow-sm hover:scale-110 hover:bg-gray-200 dark:hover:bg-zinc-600 disabled:pointer-events-none disabled:text-gray-100 disabled:bg-gray-300 dark:disabled:text-zinc-600 dark:disabled:bg-gray-400">
                Add
            </button>
        </div>
    );
};
