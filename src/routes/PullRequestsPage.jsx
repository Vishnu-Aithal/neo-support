import { Container } from "components/Container";
import { PullRequestCard } from "components/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const PullRequestsPage = ({}) => {
    const [prLinks, setPrLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    const { currentUser } = useAuth();

    usePRLinks(setPrLinks);
    return (
        <Container>
            <div className={`flex w-full ${currentUser ? "" : "hidden"}`}>
                <input
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    type="text"
                    className="ml-auto w-full p-2 border rounded"
                    placeholder="Add PR-Link for Review"
                />
                <button
                    onClick={() =>
                        addNewPRLink({
                            author: currentUser.uid,
                            authorDetails: currentUser,
                            link: newLink,
                            hasTwoReviews: false,
                        })
                    }
                    className="ml-2 px-3 py-1 border rounded-md shadow-sm">
                    Add
                </button>
            </div>
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
