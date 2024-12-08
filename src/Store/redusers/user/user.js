import { Logout as LogOutIcon } from "@mui/icons-material"; // Переименовали компонент для иконки выхода
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    'post/registerUser',
    async(arg, {rejectWithValue}) => {
        try {
            const res = await axios.post('http://localhost:8080/users', arg);
            if (res.status !== 201) {
                throw new Error('Ошибка при регистрации');
            } 
            return res.data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'post/loginUser',
    async(arg, {rejectWithValue}) => {
        try {
            const res = await axios.post('http://localhost:8080/login', arg); // Исправили URL
            if (res.status !== 200) {
                throw new Error('Ошибка при Входе');
            } 
            return res.data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const user = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        LogOut: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'Loading...';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'Loading...';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            });
    }
});

export const { LogOut } = user.actions; // Экспортируем действие LogOut для использования
export default user.reducer;
