import { createSlice } from '@reduxjs/toolkit';
import TokenService from '../services/auth/token/token.service';

export const userSlice =  createSlice({
    name: "user",
    initialState: {
        user: (state, action) => {
            state.user = TokenService.getLocalAccessToken() ? action.payload : undefined;
        },
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = undefined;
            TokenService.getLocalAccessToken() && localStorage.removeItem('accessToken');
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;