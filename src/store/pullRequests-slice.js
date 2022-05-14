const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    pullRequests: [],
    sortedPullRequests: [],
};

const pullRequestsSlice = createSlice({
    name: "pullRequests",
    initialState,
    reducers: {
        setPullRequests(state, actions) {
            return { ...state, pullRequests: actions.payload };
        },
        setSortedPullRequests(state, actions) {
            return { ...state, sortedPullRequests: actions.payload };
        },
    },
});

export default pullRequestsSlice.reducer;

export const { setPullRequests, setSortedPullRequests } =
    pullRequestsSlice.actions;
