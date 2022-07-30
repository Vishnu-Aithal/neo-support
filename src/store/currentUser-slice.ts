import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "types/User";

export type UserState = UserType | null;

const initialState: UserState = null as UserState;

const currentUser = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser(_state, action: PayloadAction<UserState>) {
            return action.payload;
        },
    },
});
export const { setCurrentUser } = currentUser.actions;
export default currentUser.reducer;
