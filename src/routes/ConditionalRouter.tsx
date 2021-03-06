import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "App";

import { setCurrentUser } from "store/currentUser-slice";
import { onAuthListener, listenUserData } from "utils/firebase-utils";

import { ProtectedRoute, ProtectedAuth } from "./ProtectedRoute";
import { QuestionsPage } from "./QuestionsPage";
import { ProfilePage } from "./ProfilePage";
import { PullRequestsPage } from "./PullRequestsPage";
import { HomePage } from "./HomePage";
import { SingleQuestionsPage } from "./SingleQuestionPage";
import { MyPullRequests } from "components/Profile/MyPullRequests";
import { MyComments } from "components/Profile/MyComments";
import { MyQuestions } from "components/Profile/MyQuestions";
import { MyAnswers } from "components/Profile/MyAnswers";
import { BookMarkedQuestions } from "components/Profile/BookmarkedQuestions";
import { BookMarkedAnswers } from "components/Profile/BookmarkedAnswers";
import { UserFeedPage } from "./UserFeedPage";
import { NotificationsPage } from "./NotificationsPage";
import { restoreDarkMode } from "store/themeSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { User } from "firebase/auth";
import { MyDetails } from "components/Profile/MyDetails";

export const ConditionalRouter: React.FC = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const darkMode = useAppSelector((state) => state.theme.darkMode);
    const dispatch = useAppDispatch();
    let userDataUnsubscribe = useRef(() => {});

    useEffect(() => {
        const listenerCleaner = onAuthListener(async (user: User | null) => {
            userDataUnsubscribe.current();
            if (user) {
                userDataUnsubscribe.current = listenUserData(
                    user,
                    dispatch,
                    setCurrentUser
                );
            } else {
                userDataUnsubscribe.current = () => null;
                dispatch(setCurrentUser(null));
            }
        });
        dispatch(restoreDarkMode());
        return listenerCleaner;
    }, [dispatch]);
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to={"/home"} replace />} />
                    <Route path="questions" element={<QuestionsPage />} />
                    <Route
                        path="pull-requests"
                        element={<PullRequestsPage />}
                    />
                    <Route
                        path="question/:questionId"
                        element={<SingleQuestionsPage />}
                    />

                    <Route
                        element={<ProtectedRoute currentUser={currentUser} />}>
                        <Route path="user-feed" element={<UserFeedPage />} />
                        <Route
                            path="notifications"
                            element={<NotificationsPage />}
                        />
                        <Route path="profile" element={<ProfilePage />}>
                            <Route
                                index
                                element={
                                    <Navigate to={"my-pr-links"} replace />
                                }
                            />
                            <Route
                                path="my-pr-links"
                                element={<MyPullRequests />}
                            />
                            <Route
                                path="my-questions"
                                element={<MyQuestions />}
                            />
                            <Route path="my-answers" element={<MyAnswers />} />
                            <Route
                                path="my-comments"
                                element={<MyComments />}
                            />
                            <Route
                                path="bookmarked-questions"
                                element={<BookMarkedQuestions />}
                            />
                            <Route
                                path="bookmarked-answers"
                                element={<BookMarkedAnswers />}
                            />
                            <Route path="my-details" element={<MyDetails />} />
                        </Route>
                    </Route>
                </Route>

                <Route element={<ProtectedAuth currentUser={currentUser} />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                theme={darkMode ? "dark" : "light"}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};
