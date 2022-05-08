import { PullRequestCard } from "components/PullRequestCard";
import { useMyPRLinks } from "utils/firebase";
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
