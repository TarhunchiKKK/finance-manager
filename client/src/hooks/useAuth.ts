import { useAppSelector } from "../store/hooks"

export const useAuth = (): boolean => {
    const isAuth: boolean = useAppSelector((state) => state.user.isAuth)
    return isAuth
}