import { QuestionPreview } from "./QuestionPreview";
import { useMyQuestions } from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";

export const MyQuestions = ({}) => {
    const [questions, setQuestions] = useState([]);
    const { currentUser } = useAuth();

    useMyQuestions(currentUser.uid, setQuestions);
    return (
        <>
            {questions.map((question) => (
                <QuestionPreview postData={question} key={question.uid} />
            ))}
        </>
    );
};
