import { Route, Routes } from "react-router-dom";
import App from "App";
import { SignInPage } from "routes/SignInPage";
import { QuestionsPage } from "routes/QuestionsPage";
import { ProfilePage } from "routes/ProfilePage";
import { PullRequestsPage } from "./PullRequestsPage";
export const ConditionalRouter = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="questions" element={<QuestionsPage />} />
                <Route path="pull-requests" element={<PullRequestsPage />} />

                <Route path="profile" element={<ProfilePage />}></Route>
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
    );
};
