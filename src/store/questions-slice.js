const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    questions: [],
    sortedQuestions: [],
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions(state, action) {
            return { ...state, questions: action.payload };
        },
        setSortedQuestions(state, action) {
            return { ...state, sortedQuestions: action.payload };
        },
    },
});

export default questionsSlice.reducer;

export const { setQuestions, setSortedQuestions } = questionsSlice.actions;
