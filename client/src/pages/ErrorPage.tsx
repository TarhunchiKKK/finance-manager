import { FC } from "react";
import pageNotFoundImage from '../assets/png.png'
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 font-roboto text-white flex flex-col justify-center items-center gap-10">
            <img src={pageNotFoundImage} alt="Page not found" />
            <Link to={'/'} className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">Back</Link>
        </div>
    )
}

export default ErrorPage