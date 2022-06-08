import { Preview } from "../Previews/Preview";

import { useState } from "react";
import { useMyBookmarkedQuestions } from "utils/firebase-utils";
import { QuestionType } from "types/Post";
import { useAppSelector } from "store/TypedExports";

export const BookMarkedQuestions: React.FC = () => {
    const [bookMarkedQuestions, setBookMarkedBookmarkedQuestions] = useState<
        QuestionType[]
    >([]);
    const currentUser = useAppSelector((state) => state.currentUser)!;

    useMyBookmarkedQuestions(currentUser.uid, setBookMarkedBookmarkedQuestions);
    return (
        <>
            {bookMarkedQuestions.map((post) => (
                <Preview postData={post} key={post.uid} type={"question"} />
            ))}
        </>
    );
};
