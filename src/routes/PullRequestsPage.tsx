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