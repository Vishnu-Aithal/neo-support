import { Preview } from "../Previews/Preview";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useMyBookmarkedAnswers } from "utils/firebase-utils";

export const BookMarkedAnswers = () => {
    const [bookMarkedAnswers, setBookMarkedBookmarkedAnswers] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);

    useMyBookmarkedAnswers(currentUser.uid, setBookMarkedBookmarkedAnswers);
    return (
        <>
            {bookMarkedAnswers.map((post) => (
                <Preview postData={post} key={post.uid} />
            ))}
        </>
    );
};
