import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParentData } from "utils/firebase-utils";
import { Comment } from "./Comment";

export const CommentLinks = ({ commentData }) => {
    const [parent, setParent] = useState(null);
    const getLink = () => {
        if (parent.collection === "questions") {
            return `/question/${parent.uid}`;
        }
        if (parent.collection === "answers") {
            return `/question/${parent.parentId}?answerId=${parent.uid}`;
        }
        if (parent.collection === "links") {
            return `/profile/my-pr-links?prId=${parent.uid}`;
        }
    };
    useEffect(() => {
        (async () => {
            const parentData = await getParentData(
                commentData.parentCollection,
                commentData.parentId
            );
            setParent(parentData);
        })();
    }, [commentData]);
    return (
        parent &&
        parent.collection !== "links" && (
            <Link
                to={getLink()}
                className="border rounded-sm p-1 hover:bg-gray-200">
                <Comment
                    commentData={commentData}
                    parent={parent}
                    key={commentData.uid}
                />
            </Link>
        )
    );
};
