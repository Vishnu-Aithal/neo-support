import { Navigate, Route, Routes } from "react-router-dom";
import App from "App";
import { ProtectedRoute, ProtectedAuth } from "./ProtectedRoute";
import { QuestionsPage } from "routes/QuestionsPage";
import { ProfilePage } from "routes/ProfilePage";
import { PullRequestsPage } from "./PullRequestsPage";
import { HomePage } from "./HomePage";
import { useAuth } from "contexts/AuthContext";
import { SingleQuestionsPage } from "./SingleQuestionPage";
import { MyPullRequests } from "components/Profile/MyPullRequests";
import { MyComments } from "components/Profile/MyComments";
import { MyQuestions } from "components/Profile/MyQuestions";
import { MyAnswers } from "components/Profile/MyAnswers";
export const ConditionalRouter = () => {
    const { currentUser } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to={"/home"} replace />} />
                <Route path="questions" element={<QuestionsPage />} />
                <Route path="pull-requests" element={<PullRequestsPage />} />
                <Route
                    path="question/:questionId"
                    element={<SingleQuestionsPage />}
                />

                <Route element={<ProtectedRoute currentUser={currentUser} />}>
                    <Route path="profile" element={<ProfilePage />}>
                        <Route
                            index
                            element={<Navigate to={"my-pr-links"} replace />}
                        />
                        <Route
                            path="my-pr-links"
                            element={<MyPullRequests />}
                        />
                        <Route path="my-questions" element={<MyQuestions />} />
                        <Route path="my-answers" element={<MyAnswers />} />
                        <Route path="my-comments" element={<MyComments />} />
                    </Route>
                </Route>
            </Route>

            <Route element={<ProtectedAuth currentUser={currentUser} />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
};
