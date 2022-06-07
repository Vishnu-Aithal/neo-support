import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myPullRequests: [],
    myComments: [],
    myQuestions: [],
    myAnswers: [],
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setMyPullRequests(state, action) {
            return { ...state, myPullRequests: action.payload };
        },
        setMyComments(state, action) {
            return { ...state, myComments: action.payload };
        },
        setMyQuestions(state, action) {
            return { ...state, myQuestions: action.payload };
        },
        setMyAnswers(state, action) {
            return { ...state, myAnswers: action.payload };
        },
    },
});

export const {
    setMyComments,
    setMyPullRequests,
    setMyQuestions,
    setmyComments,
    setMyAnswers,
} = profileSlice.actions;

export default profileSlice.reducer;
