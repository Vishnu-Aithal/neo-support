import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "types/Post";

export interface QuestionsState {
    questions: QuestionType[];
    sortedQuestions: QuestionType[];
}
const initialState: QuestionsState = {
    questions: [],
    sortedQuestions: [],
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions(state, action: PayloadAction<QuestionType[]>) {
            return { ...state, questions: action.payload };
        },
        setSortedQuestions(state, action: PayloadAction<QuestionType[]>) {
            return { ...state, sortedQuestions: action.payload };
        },
    },
});

export default questionsSlice.reducer;

export const { setQuestions, setSortedQuestions } = questionsSlice.actions;
