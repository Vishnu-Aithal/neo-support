import { Preview } from "../Previews/Preview";
import { useMyQuestions } from "utils/firebase-utils";

import { setMyQuestions } from "store/profile-slice";
import { useSelector } from "react-redux";

export const MyQuestions = () => {
    const questions = useSelector((state) => state.profile.myQuestions);
    const currentUser = useSelector((state) => state.currentUser);

    useMyQuestions(currentUser.uid, setMyQuestions);
    return (
        <>
            {questions.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
