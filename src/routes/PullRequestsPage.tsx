import { Container } from "components/Layout/Container";
import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase-utils";

import { setPullRequests } from "store/pullRequests-slice";
import { NewPullRequest } from "components/PullRequests/NewPullRequest";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/TypedExports";
import { LinkType } from "types/Link";

export const PullRequestsPage: React.FC = () => {
    const prLinks = useAppSelector((state) => state.pullRequests.pullRequests);
    const [filteredPrLinks, setFilteredPrLinks] = useState<LinkType[]>([]);
    const [currentPod, setCurrentPod] = useState("ALL");

    const pods = ["ALL", "POD A", "POD B", "POD C", "POD D"];

    const [showTip, setShowTip] = useState(false);

    const currentUser = useAppSelector((state) => state.currentUser);

    usePRLinks(setPullRequests);

    useEffect(() => {
        if (currentPod === "ALL") {
            setFilteredPrLinks(prLinks);
        } else {
            setFilteredPrLinks(
                prLinks.filter((link) => link.pod === currentPod)
            );
        }
    }, [currentPod, prLinks]);

    return (
        <Container>
            <div className="w-full relative mb-3">
                {showTip && (
                    <p className="border p-2 rounded-md dark:border-zinc-600">
                        Add a Github Pull Request link below, it will be shown
                        here for review, after getting atleast 2 reviews from
                        github users, it will be removed from here and marked
                        with green border in profile page. (requires LogIn)
                    </p>
                )}
                <button
                    onClick={() => setShowTip((prevState) => !prevState)}
                    className="text-xs outline-none bg-zinc-300 dark:bg-zinc-700 rounded-sm px-2 py-1 font-mono absolute translate-y-1 -right-1 -top-3 hover:scale-105">
                    {showTip ? "Close" : "Help"}
                </button>
            </div>
            {currentUser && (
                <NewPullRequest {...{ currentUser, addNewPRLink }} />
            )}

            <div className="w-full flex flex-wrap gap-2">
                <h2 className=" font-semibold text-zinc-500 w-full">
                    FILTER BY POD
                </h2>
                {pods.map((pod) => (
                    <button
                        key={pod}
                        onClick={(e) => setCurrentPod(pod)}
                        className={`${
                            currentPod === pod
                                ? "bg-gray-300 dark:bg-gray-600"
                                : ""
                        } hover:bg-gray-200 dark:hover:bg-zinc-600 border dark:border-zinc-600 rounded-md px-2 py-1`}>
                        {pod}
                    </button>
                ))}
            </div>
            {filteredPrLinks.length === 0 && (
                <p className="w-full text-center text-lg font-semibold text-zinc-500">
                    No Pull Requests to Review
                </p>
            )}
            {filteredPrLinks.map((prData) => (
                <PullRequestCard
                    key={prData.uid}
                    prData={prData}
                    currentUser={currentUser}
                />
            ))}
        </Container>
    );
};
