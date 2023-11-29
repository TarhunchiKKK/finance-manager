import { API } from "../api/axios.api";
import { IResponseUserData, IUser, IUserData } from "../types/types";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const { data } = await API.post<IResponseUserData>('user', userData)
        return data
    },
    async login(userData: IUserData): Promise<IUser | undefined> {
        const { data } = await API.post<IUser>('auth/login', userData)
        return data
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await API.get<IUser>('auth/profile')
        if (data) return data
    }
}