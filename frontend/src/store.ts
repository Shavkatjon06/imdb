import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth.slice.ts'
import moviesReducer from './features/movies.slice.ts'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch