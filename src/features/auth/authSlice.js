import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiONG } from "../../Services/apiONG";

export const authLogin = createAsyncThunk(
    'auth/login',
    async (userInfo) => {
        const { data } = await apiONG.post('login', userInfo);
        return data;
    }
)

export const authRegister = createAsyncThunk(
    'auth/register',
    async (userInfo) => {
        const { data } = await apiONG.post('register', userInfo);
        return data;
    }
)

const tokenStored = sessionStorage.getItem('token');
const userStored = sessionStorage.getItem('user');

const initialState = {
    status: 'idle',
    user: JSON.parse(userStored) || null,
    token: tokenStored || null,
    error: null
}

const handleState = (state, status, user, token, error) => {
    state.status = status;
    state.user = user;
    state.token = token;
    state.error = error;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            handleState(state, 'idle', null, null, null);
        },
        cleanError: (state) => {
            handleState(state, 'idle', null, null, null)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                handleState(state, 'fetching', null, null);
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                const { payload: { error, data } } = action;

                if (error) {
                    handleState(state, 'succeeded', null, null, error)
                } else {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data.user))
                    handleState(state, 'succeeded', data.user, data.token, null)
                }
            })
            .addCase(authLogin.rejected, (state, action) => {
                const { error: { message } } = action;
                handleState(state, 'failed', null, null, message);
            })

            .addCase(authRegister.pending, (state) => {
                handleState(state, 'fetching', null, null, null);
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                const { payload: { data } } = action;
                handleState(state, 'succeeded', data.user, data.token, null)
            })
            .addCase(authRegister.rejected, (state, action) => {
                const { error: { message } } = action;
                handleState(state, 'failed', null, null, message);
            })
    }
})

export const selectAuth = (state) => state.auth;

export const { logout, cleanError } = authSlice.actions;

export default authSlice.reducer;