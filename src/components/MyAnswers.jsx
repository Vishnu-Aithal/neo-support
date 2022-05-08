import { AnswerPreview } from "./AnswerPreview";
import { useMyAnswers } from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const MyAnswers = ({}) => {
    const [answers, setAnswers] = useState([]);
    const { currentUser } = useAuth();

    useMyAnswers(currentUser.uid, setAnswers);
    return (
        <>
            {answers.map((question) => (
                <AnswerPreview postData={question} key={question.uid} />
            ))}
        </>
    );
};
