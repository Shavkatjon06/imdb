import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Movies from '../interfaces/movies'
import axiosInstance from '../utils/axios.instance.ts'

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
            const response = await axiosInstance.get(`/all-movies?${queryString}`)
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
            const response = await axiosInstance.get(`/search-movie?${queryString}`)
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

export const downloadMovies = createAsyncThunk(
    "movies/downloadMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/download-movies");
            if (response.data.success) {
                const moviesData = response.data.message
                const json = JSON.stringify(moviesData, null, 2)
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a");
                link.href = url;
                link.download = "moviesData.json";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url)
                return
            } else if (response.data.error && response.data.message === "Token not provided!") {
                return rejectWithValue("Not registered!")
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);


const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchMovie = [];
        },
        resetError: (state) => {
            state.error = null
        }
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
        .addCase(downloadMovies.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})

export const { resetSearchResults, resetError } = moviesSlice.actions;
export default moviesSlice.reducer