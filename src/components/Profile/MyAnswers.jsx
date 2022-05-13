import { Preview } from "components/Previews/Preview";
import { useMyAnswers } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const MyAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const { currentUser } = useAuth();

    useMyAnswers(currentUser.uid, setAnswers);
    return (
        <>
            {answers.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
