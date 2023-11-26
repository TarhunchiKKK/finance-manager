import { FC } from "react";
import { useAuth } from "../hooks/useAuth";

interface IProtectedProps {
    children: JSX.Element
}

export const ProtectedRoute: FC<IProtectedProps> = ({ children }: IProtectedProps) => {
    const isAuth = useAuth()
    return (
        <>
            { isAuth ? children : <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 text-white text-2xl'>To view this page you must be logged in</h1> }
        </>
    )
}