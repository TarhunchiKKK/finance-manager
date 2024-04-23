import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/user.slice";
import { removeTokenFromLocalStorage } from "../helpers/LocalStorage.helper";
import { toast } from "react-toastify";

const Header: FC = () => {
    const isAuth: boolean = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out')
        navigate('/')
    }

    return (
        <header className="flex items-center justify-between p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
            <Link to='/'>
                <FaBtc size={20} />
            </Link>

            { isAuth && 
                <nav className="ml-auto mr-10">
                    <ul className="flex gap-5 items-center ml-auto mr-10">
                        <li>
                            <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/transactions'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
                        </li>
                    </ul>
                </nav>
            }

            { isAuth ? (
                <button onClick={logoutHandler} className="btn btn-red">
                    <span>Log Out</span>
                    <FaSignOutAlt />
                </button> ) : (
                <Link className="py-2 text-white/50 hover:text-white" to={'auth'}>
                    Log In / Sign In
                </Link> )
            }
        </header>
    )
}

export default Header