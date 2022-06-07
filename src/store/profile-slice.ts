import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "types/Comment";
import { LinkType } from "types/Link";
import { AnswerType, QuestionType } from "types/Post";

export interface ProfileState {
    myPullRequests: LinkType[];
    myComments: CommentType[];
    myQuestions: QuestionType[];
    myAnswers: AnswerType[];
}

const initialState: ProfileState = {
    myPullRequests: [],
    myComments: [],
    myQuestions: [],
    myAnswers: [],
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setMyPullRequests(state, action: PayloadAction<LinkType[]>) {
            return { ...state, myPullRequests: action.payload };
        },
        setMyComments(state, action: PayloadAction<CommentType[]>) {
            return { ...state, myComments: action.payload };
        },
        setMyQuestions(state, action: PayloadAction<QuestionType[]>) {
            return { ...state, myQuestions: action.payload };
        },
        setMyAnswers(state, action: PayloadAction<AnswerType[]>) {
            return { ...state, myAnswers: action.payload };
        },
    },
});

export const {
    setMyComments,
    setMyPullRequests,
    setMyQuestions,
    setMyAnswers,
} = profileSlice.actions;

export default profileSlice.reducer;
