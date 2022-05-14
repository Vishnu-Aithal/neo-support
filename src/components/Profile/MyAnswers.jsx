import { Preview } from "components/Previews/Preview";
import { useMyAnswers } from "utils/firebase-utils";

import { setMyAnswers } from "store/profile-slice";
import { useSelector } from "react-redux";

export const MyAnswers = () => {
    const answers = useSelector((state) => state.profile.myAnswers);
    const currentUser = useSelector((state) => state.currentUser);

    useMyAnswers(currentUser.uid, setMyAnswers);
    return (
        <>
            {answers.map((question) => (
                <Preview postData={question} key={question.uid} />
            ))}
        </>
    );
};
