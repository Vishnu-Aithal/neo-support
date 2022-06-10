import { PullRequestCard } from "components/PullRequests/PullRequestCard";
import { useMyPRLinks } from "utils/firebase-utils";

import { setMyPullRequests } from "store/profile-slice";
import { useAppSelector } from "store/TypedExports";

export const MyPullRequests: React.FC = () => {
    const prLinks = useAppSelector((state) => state.profile.myPullRequests);
    const currentUser = useAppSelector((state) => state.currentUser)!;

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
