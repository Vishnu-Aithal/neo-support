import { Preview } from "../Previews/Preview";
import { useMyQuestions } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const MyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const { currentUser } = useAuth();

    useMyQuestions(currentUser.uid, setQuestions);
    return (
        <>
            {questions.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
