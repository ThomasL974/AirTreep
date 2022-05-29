import { createSlice } from '@reduxjs/toolkit';
import TokenService from '../services/auth/token/token.service';

export const userSlice =  createSlice({
    name: "user",
    initialState: {
        user: TokenService.getLocalAccessToken ? true : null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;