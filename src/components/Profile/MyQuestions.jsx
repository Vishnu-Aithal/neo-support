import { Preview } from "../Previews/Preview";
import { useMyQuestions } from "utils/firebase-utils";

import { useState } from "react";
import { useSelector } from "react-redux";

export const MyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);

    useMyQuestions(currentUser.uid, setQuestions);
    return (
        <>
            {questions.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
