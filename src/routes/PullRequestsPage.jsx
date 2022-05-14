import { Container } from "components/Layout/Container";
import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase-utils";

import {
    setPullRequests,
    setSortedPullRequests,
} from "store/pullRequests-slice";
import { NewPullRequest } from "components/PullRequests/NewPullRequest";
import { useSelector } from "react-redux";

export const PullRequestsPage = () => {
    const prLinks = useSelector((state) => state.pullRequests.pullRequests);

    const currentUser = useSelector((state) => state.currentUser);

    usePRLinks(setPullRequests);

    return (
        <Container>
            <NewPullRequest {...{ currentUser, addNewPRLink }} />
            {prLinks.map((prData) => (
                <PullRequestCard
                    key={prData.uid}
                    prData={prData}
                    currentUser={currentUser}
                />
            ))}
        </Container>
    );
};
