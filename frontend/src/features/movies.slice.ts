import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import Movies from '../interfaces/movies'

export interface MoviesState {
    movies: Movies[],
    loading: boolean,
    error: string | null,
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null
}

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (params: {count: number, sortBy: string}, {rejectWithValue}) => {
        try {
            const queryString = new URLSearchParams({
                count: params.count.toString(),
                sortBy: params.sortBy
            }).toString()
            const response = await axios.get(`http://localhost:5000/all-movies?${queryString}`)
            if (response.data.success) {
                return response.data.message
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default moviesSlice.reducer