import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { IResponseUserData } from "../types/types";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/LocalStorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/user.slice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            const data = await AuthService.login({email: email, password: password})
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('Account have been created')
                navigate('/')
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data: IResponseUserData | undefined = await AuthService.registration({email: email, password: password})
            if (data) {
                toast.success('Account have been created')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
        <h1 className="text-center text-xl mb-10">
            { isLogin ? 'Login' : 'Registration' }
        </h1>

        <form onSubmit={ isLogin ? loginHandler : registrationHandler} className="flex flex-col w-1/2 mx-auto gap-5">
            <input onChange={(e) => setEmail(e.target.value)} className="input" type="text" placeholder="email"/>
            <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="password" />
            <button className="btn btn-green mx-auto">
                Submit
            </button>
        </form>

        <div className="flex justify-center mt-5">
            {/* { isLogin ? (
                <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                    You don't have an account?
                </button>
            ) : (
                <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                    Already have an account?
                </button>
            )} */}

            <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                { isLogin ? 'You don\'t have an account?' : 'You already have an account?'}
            </button>
        </div>
    </div>
}

export default Auth