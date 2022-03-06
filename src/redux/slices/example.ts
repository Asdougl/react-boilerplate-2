import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/User'
import { RootState } from '../store'

export interface ExampleState {
  user: User | null
}

const initialState: ExampleState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions

// selectors
export const selectUser = (state: RootState) => state.example.user

export default userSlice.reducer
