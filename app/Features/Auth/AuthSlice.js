'use client'
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

// const initialState = {
//   loading: false,
//   userInfo: localStorage.getItem("userToken")
//     ? { token: localStorage.getItem("userToken") }
//     : null,
//   error: null,
//   success: false,
//   message: null,
// };
const initialState = {
    loading: false,
    userInfo: typeof window !== 'undefined' && localStorage.getItem("userToken")
      ? { token: localStorage.getItem("userToken") }
      : null,
    error: null,
    success: '',
    message: null,
  };

export const registerUser = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };
            await axios.post(`${baseURL}/user`, user, config);
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userLogin = createAsyncThunk(
    "auth/login",
    async (user, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(`${baseURL}/login`, user, config);
            // store user's token in local storage
            localStorage.setItem("userToken", data.token);
            return data;
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
    try {
        const response = await axios.get(`${baseURL}/logout`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // login user
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userInfo = payload;
                state.success = true;
                state.message = "Logged In";
                localStorage.setItem("userData", JSON.stringify(payload.user));
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
                state.message = payload;
            });
    
        // logout user
        builder
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogout.fulfilled, (state, { payload }) => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
                state.loading = false;
                state.userInfo = null;
                state.success = true;
                state.message = "Logged Out";
                state.error = null;
            })
            .addCase(userLogout.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    
        // register user reducer
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.message = "Registered Successfully";
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            });
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
