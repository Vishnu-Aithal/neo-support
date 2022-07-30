import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { processUrlForValidation } from "utils/github-utils/github";
import { UserType } from "types/User";
import { LinkType } from "types/Link";

interface NewPullRequestProps {
    currentUser: UserType;
    addNewPRLink: (prData: Partial<LinkType>) => Promise<void>;
}

type PodSelect = "Select Pod" | `${"POD"} ${"A" | "B" | "C" | "D"}`;
export const NewPullRequest: React.FC<NewPullRequestProps> = ({
    currentUser,
    addNewPRLink,
}) => {
    const [newLink, setNewLink] = useState("");
    const [linkPod, setLinkPod] = useState<PodSelect>("Select Pod");
    const [validLink, setValidLink] = useState(false);

    useEffect(() => {
        let timeOutId: NodeJS.Timeout;
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
            <select
                value={linkPod}
                onChange={(e: ChangeEvent) =>
                    setLinkPod(
                        (e.target as HTMLSelectElement).value as PodSelect
                    )
                }
                name="pod"
                id=""
                className="p-2 border dark:border-zinc-600 dark:bg-zinc-700 rounded-md ml-2">
                <option value="Select Pod">Select Pod</option>
                <option value="POD A">POD A</option>
                <option value="POD B">POD B</option>
                <option value="POD C">POD C</option>
                <option value="POD D">POD D</option>
            </select>
            <button
                disabled={!validLink || linkPod === "Select Pod"}
                onClick={() => {
                    if (validLink && linkPod !== "Select Pod") {
                        addNewPRLink({
                            title: newLink,
                            author: currentUser.uid,
                            link: newLink,
                            pod: linkPod,
                            hasTwoReviews: false,
                        });
                        setNewLink("");
                    }
                }}
                className="ml-2 px-5 py-2 border dark:border-zinc-600 rounded-md shadow-sm hover:scale-110 hover:bg-gray-200 dark:hover:bg-zinc-600 disabled:pointer-events-none disabled:text-gray-100 disabled:bg-gray-300 dark:disabled:text-zinc-600 dark:disabled:bg-gray-400">
                Add
            </button>
        </div>
    );
};
