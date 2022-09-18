import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
    error: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            state.error = undefined;
        },
        authError: (state, action) => {
            state.error = action.payload;
        }

    },
});

export const { userLoggedIn, userLoggedOut, authError } = authSlice.actions;
export default authSlice.reducer;
