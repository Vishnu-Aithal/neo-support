import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { useMyPRLinks } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const MyPullRequests = ({}) => {
    const [prLinks, setPrLinks] = useState([]);
    const { currentUser } = useAuth();

    useMyPRLinks(currentUser.uid, setPrLinks);
    return (
        <>
            {prLinks.map((prData) => (
                <PullRequestCard
                    key={prData.uid}
                    prData={prData}
                    currentUser={currentUser}
                />
            ))}
        </>
    );
};
