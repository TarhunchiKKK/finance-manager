import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../types/types"
import { RootState } from "../store"

interface IUserState {
    user: IUser | null
    isAuth: boolean
}

const initialState: IUserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.user = null   
            state.isAuth = false
        },
    },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export default userSlice.reducer