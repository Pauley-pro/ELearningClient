import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*const initialState = {
    token: "",
    user: "",
};*/

const initialState = {
    token: localStorage.getItem("accessToken") || "", // Load from localStorage on app start
    user: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{token:string}>) => {
            state.token = action.payload.token;
            localStorage.setItem("accessToken", action.payload.token);
        },
        userLoggedIn: (state, action: PayloadAction<{accessToken:string, user:string}>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
})

export const {userRegistration, userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer