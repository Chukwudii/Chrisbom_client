import { useState } from "react";
import React from "react";
import '../styles/login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    function eyeshow() {
        var eyes = document.querySelector(".passeye");
        eyes.style = "display:flex"
    }
    return (
        <>

            <Navbar />
            <div className="drop-shadow-xl rounded-md">
                <div className="flex items-center sm:pt-28 md:pt-20 lg:pt-32 justify-center h-screen">
                    <div className="container inter mx-auto p-10  px-2 sm:px-4 lg:px-32">
                        <div className="flex flex-col md:flex-row">
                            {/* Left Side */}
                            <div className=" items-center lg:p-6 justify-center md:w-1/2  lg:w-3/4 bg-white p-4 rounded-md inter">
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold inter mt-4">Welcome Back</h4>
                                    <h5 className="text-lg mt-2">Please enter your details</h5>
                                </div>
                                <form>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-m font-medium">Email</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border-gray-300 border-2 rounded-md"
                                            placeholder="john@gmail.com"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-m font-medium">Password</label>
                                        <div className="relative">
                                            <input
                                                type={passwordVisible ? 'text' : 'password'}
                                                className="w-full p-2 border-gray-300 border-2 rounded-md"
                                                placeholder="Enter Your Password" onClick={eyeshow}
                                            />
                                            <span
                                                className="absolute passeye inset-y-0 right-3 flex items-center hidden cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                            </span>

                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="checkbox"
                                            id="rememberPassword"
                                            className="mr-2"
                                        />
                                        <label htmlFor="rememberPassword" className="text-sm">
                                            Remember Me
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-full py-2 px-4  bg-black hover:bg-blue-700 text-white rounded-md">
                                            Login
                                        </button>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Link to={"/login"} className="text-sm text-blue-600 underline"> Don't have an Account? Register</Link>
                                    </div>
                                </form>
                            </div>
                            {/* Right Side */}
                            <div className="md:w-1/2 w-full sm:none login_image">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}