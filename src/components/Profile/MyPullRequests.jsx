import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { useMyPRLinks } from "utils/firebase-utils";

import { useState } from "react";
import { useSelector } from "react-redux";

export const MyPullRequests = ({}) => {
    const [prLinks, setPrLinks] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);

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
