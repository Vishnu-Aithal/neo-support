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
                className={`ml-auto w-full p-2 border outline-none rounded focus:shadow ${
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
                className="ml-2 px-5 py-2 border rounded-md shadow-sm hover:scale-110 hover:bg-gray-200 disabled:pointer-events-none disabled:text-gray-100 disabled:bg-gray-300">
                Add
            </button>
        </div>
    );
};
