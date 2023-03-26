import React ,{useState} from "react";
import axios from "axios"

import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://todoplusappmernstack-production.up.railway.app"


const LoginUser = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();

    const submitData = async () => {

        const data = {
            email: userEmail,
            password: userPassword
        };

        const res = await axios.post(`${BASE_URL}/login`, data)

        if(res.data.success){
            console.log(res.data)
            navigate('/dashboard')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitData();
    }


    return(
    <div className="relative">
        <div className="flex items-center justify-center my-4">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 bg-white rounded-md">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Sign in
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                                >
                                Create a free account
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900"
                                        >
                                        
                                        Email address
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="email"
                                            placeholder="Email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            ></input>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900"
                                            >
                                            {" "}
                                            Password{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2.5">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="password"
                                            placeholder="Password"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            ></input>
                                    </div>
                                </div>

                                <div>
                                    <button className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                                        Get started
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 ml-2"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3">
                            <div className={"flex flex-col items-center mt-2"}>
                                <h2>Use Demo account to explore <span className={"text-xl italic font-bold"}>ToDo-plus+</span> App</h2>
                                <p>email: <span className={"font-bold"}>demo@example.com</span></p>
                                <p>password: <span className={"font-bold"}>demo</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export default LoginUser;