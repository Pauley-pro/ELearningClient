import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*const initialState = {
    token: "",
    user: "",
};*/

const isBrowser = typeof window !== "undefined";

const initialState = {
    token: isBrowser ? localStorage.getItem("accessToken") || "" : "", // Load token only if on the client
    user: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;

            // Store token in localStorage only if on the client
            if (isBrowser) {
                localStorage.setItem("accessToken", action.payload.token);
            }
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