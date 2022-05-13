import { Container } from "components/Layout/Container";
import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase-utils";

import { useState } from "react";
import { NewPullRequest } from "components/PullRequests/NewPullRequest";
import { useSelector } from "react-redux";

export const PullRequestsPage = () => {
    const [prLinks, setPrLinks] = useState([]);

    const currentUser = useSelector((state) => state.currentUser);

    usePRLinks(setPrLinks);

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
