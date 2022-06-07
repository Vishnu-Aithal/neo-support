import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = { darkMode: false };

export const restoreDarkMode = createAsyncThunk<boolean, undefined>(
    "them/restoreDarkMode",
    (_, thunkApi) => {
        const localTheme = localStorage.getItem("darkMode");
        if (localTheme) {
            const savedTheme = JSON.parse(localTheme);
            return savedTheme;
        }
        thunkApi.rejectWithValue("No Saved Theme");
    }
);

export const toggleDarkMode = createAsyncThunk<
    boolean,
    undefined,
    { state: RootState }
>("theme/toggleDarkMode", (_, thunkApi) => {
    const darkMode = thunkApi.getState().theme.darkMode;
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    return !darkMode;
});

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleDarkMode.fulfilled, (state, action) => {
            state.darkMode = action.payload;
        });
        builder.addCase(restoreDarkMode.fulfilled, (state, action) => {
            state.darkMode = action.payload;
        });
    },
});

export const themeReducer = themeSlice.reducer;
