const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const restoreDarkMode = createAsyncThunk(
    "them/restoreDarkMode",
    (_, thunkApi) => {
        const savedTheme = JSON.parse(localStorage.getItem("darkMode"));
        if (savedTheme) {
            return savedTheme;
        }
        thunkApi.rejectWithValue("No Saved Theme");
    }
);

export const toggleDarkMode = createAsyncThunk(
    "theme/toggleDarkMode",
    (_, thunkApi) => {
        const darkMode = thunkApi.getState().theme.darkMode;
        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
        return !darkMode;
    }
);

const themeSlice = createSlice({
    name: "theme",
    initialState: { darkMode: false },
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
