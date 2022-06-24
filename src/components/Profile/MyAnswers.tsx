import { Preview } from "components/Previews/Preview";
import { useMyAnswers } from "utils/firebase-utils";

import { setMyAnswers } from "store/profile-slice";
import { useAppSelector } from "store/TypedExports";

export const MyAnswers: React.FC = () => {
    const answers = useAppSelector((state) => state.profile.myAnswers);
    const currentUser = useAppSelector((state) => state.currentUser)!;

    useMyAnswers(currentUser.uid, setMyAnswers);
    return (
        <>
            {answers.length === 0 && (
                <p className="w-full text-center text-lg font-semibold text-zinc-500">
                    You have not Answered any Questions Yet!
                </p>
            )}
            {answers.map((question) => (
                <Preview
                    postData={question}
                    key={question.uid}
                    type={"answer"}
                />
            ))}
        </>
    );
};
