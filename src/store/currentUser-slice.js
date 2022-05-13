import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const currentUser = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            return action.payload;
        },
    },
});
export const { setCurrentUser } = currentUser.actions;
export default currentUser.reducer;
