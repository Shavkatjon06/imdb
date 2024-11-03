import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export interface AuthState {
    loading: boolean,
    error: string | null,
    success: string | null,
    showVerification: boolean
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: null,
    showVerification: false
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: {email: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5000/login", credentials)
            if (response.data.success) {
                localStorage.setItem("imdb_token", response.data.imdb_token)
                window.location.href = "/"
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (credentials: {email: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5000/register", credentials)
            if (response.data.success) {
                return {message: response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async (credentials: {email: string, verifCode: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5000/verify", credentials)
            if (response.data.success) {
                localStorage.setItem('imdb_token', response.data.imdb_token)
                window.location.href = '/'
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (credentials: {email: string, password: string, confirmPassword: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5000/renew-password", credentials)
            if (response.data.success) {
                return {message: response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = null
            state.showVerification = false
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.message
            state.showVerification = true
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(verifyUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(verifyUser.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(verifyUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = null
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.message
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default authSlice.reducer