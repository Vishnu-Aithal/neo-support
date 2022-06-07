import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser-slice";
import profileReducer from "./profile-slice";
import questionsReducer from "./questions-slice";
import pullRequestsReducer from "./pullRequests-slice";
import { themeReducer } from "./themeSlice";

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        profile: profileReducer,
        questions: questionsReducer,
        pullRequests: pullRequestsReducer,
        theme: themeReducer,
    },
});
