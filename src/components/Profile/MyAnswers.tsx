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
