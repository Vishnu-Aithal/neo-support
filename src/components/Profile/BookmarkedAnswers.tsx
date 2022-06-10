import { Preview } from "../Previews/Preview";

import { useState } from "react";
import { useMyBookmarkedAnswers } from "utils/firebase-utils";
import { AnswerType } from "types/Post";
import { useAppSelector } from "store/TypedExports";

export const BookMarkedAnswers: React.FC = () => {
    const [bookMarkedAnswers, setBookMarkedAnswers] = useState<AnswerType[]>(
        []
    );
    const currentUser = useAppSelector((state) => state.currentUser)!;

    useMyBookmarkedAnswers(currentUser.uid, setBookMarkedAnswers);
    return (
        <>
            {bookMarkedAnswers.map((post) => (
                <Preview postData={post} key={post.uid} type={"answer"} />
            ))}
        </>
    );
};
