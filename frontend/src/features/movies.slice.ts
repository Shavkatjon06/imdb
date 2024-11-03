import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import Movies from '../interfaces/movies'

export interface MoviesState {
    movies: Movies[],
    searchMovie: Movies[],
    loading: boolean,
    error: string | null,
    searchError: string | null,
    searchloading: boolean
}

const initialState: MoviesState = {
    movies: [],
    searchMovie: [],
    loading: false,
    error: null,
    searchError: null,
    searchloading: false
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

export const searchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (params: {search: string}, {rejectWithValue}) => {
        try {
            const queryString = new URLSearchParams({
                search: params.search
            }).toString()
            const response = await axios.get(`http://localhost:5000/search-movie?${queryString}`)
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
    reducers: {
        resetSearchResults: (state) => {
            state.searchMovie = [];
        },
    },
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
        .addCase(searchMovies.pending, (state) => {
            state.searchloading = true
            state.searchError = null
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
            state.searchloading = false
            state.searchMovie = action.payload
        })
        .addCase(searchMovies.rejected, (state, action) => {
            state.searchloading = false
            state.searchError = action.payload as string
        })
    }
})

export const { resetSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer