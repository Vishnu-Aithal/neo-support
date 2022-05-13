import { Preview } from "components/Previews/Preview";
import { useMyAnswers } from "utils/firebase-utils";

import { useState } from "react";
import { useSelector } from "react-redux";

export const MyAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);

    useMyAnswers(currentUser.uid, setAnswers);
    return (
        <>
            {answers.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
