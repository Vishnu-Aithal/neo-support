import { Preview } from "../Previews/Preview";
import { useMyQuestions } from "utils/firebase-utils";

import { setMyQuestions } from "store/profile-slice";
import { useAppSelector } from "store/TypedExports";

export const MyQuestions: React.FC = () => {
    const questions = useAppSelector((state) => state.profile.myQuestions);
    const currentUser = useAppSelector((state) => state.currentUser)!;

    useMyQuestions(currentUser.uid, setMyQuestions);
    return (
        <>
            {questions.map((question) => (
                <Preview
                    postData={question}
                    key={question.uid}
                    type={"question"}
                />
            ))}
        </>
    );
};
