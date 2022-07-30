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
            {questions.length === 0 && (
                <p className="w-full text-center text-lg font-semibold text-zinc-500">
                    You have not Asked any Questions Yet!
                </p>
            )}
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
