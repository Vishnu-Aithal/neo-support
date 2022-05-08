import { Navigate, Route, Routes } from "react-router-dom";
import App from "App";
import { ProtectedRoute, ProtectedAuth } from "./ProtectedRoute";
import { QuestionsPage } from "routes/QuestionsPage";
import { ProfilePage } from "routes/ProfilePage";
import { PullRequestsPage } from "./PullRequestsPage";
import { HomePage } from "./HomePage";
import { useAuth } from "contexts/AuthContext";
export const ConditionalRouter = ({}) => {
    const { currentUser } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to={"/home"} replace />} />
                <Route path="questions" element={<QuestionsPage />} />
                <Route path="pull-requests" element={<PullRequestsPage />} />
                <Route element={<ProtectedRoute currentUser={currentUser} />}>
                    <Route
                        path="profile"
                        element={
                            <Navigate to={"/profile/my-pr-links"} replace />
                        }
                    />
                    <Route path="profile/:page" element={<ProfilePage />} />
                </Route>
            </Route>
            <Route element={<ProtectedAuth currentUser={currentUser} />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
};
