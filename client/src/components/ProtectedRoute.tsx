import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import image from '../assets/protected-icon.png'


interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()

    return (
        <>
            { isAuth ? children : (
                    <div className="flex flex-col justify-center items-centergap-10 mt-20">
                        <h1 className="text-2xl">To view this page ypu must be logged in.</h1>
                        <img className="w-1/3" src={image} alt="Protected" />
                    </div> 
                )
            }
        </>
    )
}