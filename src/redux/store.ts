import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/example'

export const store = configureStore({
  reducer: {
    example: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
