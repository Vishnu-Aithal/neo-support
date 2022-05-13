import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./currentUser-slice";

export const store = configureStore({
    reducer: {
        currentUser: currentUser,
    },
});
