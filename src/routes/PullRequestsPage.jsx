import { Container } from "components/Container";
import { PullRequestCard } from "components/PullRequestCard";
import { addNewPRLink, usePRLinks } from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { processUrlForValidation } from "utils/github";

export const PullRequestsPage = ({}) => {
    const [prLinks, setPrLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    const [validLink, setValidLink] = useState(false);
    const { currentUser } = useAuth();

    usePRLinks(setPrLinks);

    useEffect(() => {
        let timeOutId;
        (async () => {
            if (
                newLink.includes("https://github.com/") &&
                newLink.includes("/pull/")
            ) {
                const url = processUrlForValidation(newLink);
                timeOutId = setTimeout(() => {
                    (async () => {
                        try {
                            const response = await axios.get(url);
                            setValidLink(true);
                        } catch (error) {
                            setValidLink(false);
                        }
                    })();
                }, 500);
            } else {
                setValidLink(false);
            }
        })();
        return () => clearTimeout(timeOutId);
    }, [newLink]);

    return (
        <Container>
            <div
                className={`flex items-center w-full ${
                    currentUser ? "" : "hidden"
                }`}>
                <input
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    type="text"
                    className="ml-auto w-full p-2 border rounded"
                    placeholder="Add PR-Link for Review"
                />
                <button
                    disabled={!validLink}
                    onClick={() => {
                        addNewPRLink({
                            author: currentUser.uid,
                            authorDetails: currentUser,
                            link: newLink,
                            hasTwoReviews: false,
                        });
                        setNewLink("");
                    }}
                    className="ml-2 px-5 py-2 border rounded-md shadow-sm hover:scale-110 hover:bg-gray-200 disabled:pointer-events-none disabled:text-gray-100 disabled:bg-gray-300">
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
