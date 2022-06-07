import { LinkType } from "types/Link";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PRState {
    pullRequests: LinkType[];
    sortedPullRequests: LinkType[];
}
const initialState: PRState = {
    pullRequests: [],
    sortedPullRequests: [],
};

const pullRequestsSlice = createSlice({
    name: "pullRequests",
    initialState,
    reducers: {
        setPullRequests(state, actions: PayloadAction<LinkType[]>) {
            return { ...state, pullRequests: actions.payload };
        },
        setSortedPullRequests(state, actions: PayloadAction<LinkType[]>) {
            return { ...state, sortedPullRequests: actions.payload };
        },
    },
});

export default pullRequestsSlice.reducer;

export const { setPullRequests, setSortedPullRequests } =
    pullRequestsSlice.actions;
