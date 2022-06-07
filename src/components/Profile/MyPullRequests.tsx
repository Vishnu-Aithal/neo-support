import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { useMyPRLinks } from "utils/firebase-utils";

import { setMyPullRequests } from "store/profile-slice";
import { useSelector } from "react-redux";

export const MyPullRequests = () => {
    const prLinks = useSelector((state) => state.profile.myPullRequests);
    const currentUser = useSelector((state) => state.currentUser);

    useMyPRLinks(currentUser.uid, setMyPullRequests);
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
