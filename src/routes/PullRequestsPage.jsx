import { Container } from "components/Layout/Container";
import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { NewPullRequest } from "components/PullRequests/NewPullRequest";

export const PullRequestsPage = () => {
    const [prLinks, setPrLinks] = useState([]);

    const { currentUser } = useAuth();

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
