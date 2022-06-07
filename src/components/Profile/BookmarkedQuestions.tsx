import { Preview } from "../Previews/Preview";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useMyBookmarkedQuestions } from "utils/firebase-utils";

export const BookMarkedQuestions = () => {
    const [bookMarkedQuestions, setBookMarkedBookmarkedQuestions] = useState(
        []
    );
    const currentUser = useSelector((state) => state.currentUser);

    useMyBookmarkedQuestions(currentUser.uid, setBookMarkedBookmarkedQuestions);
    return (
        <>
            {bookMarkedQuestions.map((post) => (
                <Preview postData={post} key={post.uid} />
            ))}
        </>
    );
};
