import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommentType } from "types/Comment";
import { LinkType } from "types/Link";
import { AnswerType, QuestionType } from "types/Post";
import { getParentData } from "utils/firebase-utils";
import { Comment } from "./Comment";

export const CommentLinks: React.FC<{ commentData: CommentType }> = ({
    commentData,
}) => {
    const [parent, setParent] = useState<
        QuestionType | AnswerType | LinkType | null
    >(null);
    const navigate = useNavigate();
    const getLink = () => {
        if (parent) {
            if (parent.collection === "questions") {
                return `/question/${parent.uid}`;
            }
            if (parent.collection === "answers") {
                return `/question/${parent.parentId}?answerId=${parent.uid}`;
            }
            if (parent.collection === "links") {
                return `/profile/my-pr-links?prId=${parent.uid}`;
            }
        }
        return "/profile";
    };
    useEffect(() => {
        (async () => {
            const parentData = await getParentData(
                commentData.parentCollection,
                commentData.parentId
            );
            parentData && setParent(parentData);
        })();
    }, [commentData]);
    if (parent && parent.collection !== "links") {
        return (
            <button
                onClick={() => navigate(getLink())}
                className="border text-left dark:border-zinc-600 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-zinc-600">
                <Comment
                    commentData={commentData}
                    parent={parent}
                    key={commentData.uid}
                />
            </button>
        );
    } else {
        return <></>;
    }
};
