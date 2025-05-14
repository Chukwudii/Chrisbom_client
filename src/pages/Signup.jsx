import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from "../components/Navbar";

export default function Signup() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for button loading

    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const changeHandler = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });

    }

    const signup = async () => {
        try {
            setError('');
            setLoading(true);
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',  // Corrected spacing
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            let responseData = await response.json();
            console.log(responseData.success);
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                navigate("/login");;
            }
            else {
                setError(responseData.errors);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
        setLoading(false);
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side (Form) */}
                    <div className="p-8 md:p-10">
                        <h4 className="text-2xl font-semibold text-gray-900">Sign Up</h4>

                        <div className="mt-6 space-y-4">
                            {error && <p className="text-red-500 text-md font-semibold">{error}</p>}
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm mb-1 font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={changeHandler}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                    autoComplete="on"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="john@gmail.com"
                                    autoComplete="on"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={changeHandler}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Your Password"
                                        required
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            {/* Terms & Conditions
                            <div className="flex items-center">
                                <input type="checkbox" id="terms" className="mr-2" />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    Accept terms and conditions
                                </label>
                            </div> */}

                            {/* Register Button */}
                            <button type="button" onClick={signup}
                                disabled={!formData.username || !formData.email || !formData.password || loading}
                                className={`w-full py-3 rounded-md text-white ${!formData.username || !formData.email || !formData.password || loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>


                        {/* Login Link */}
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-sm text-blue-600 hover:underline">
                                Have an Account? Login
                            </Link>
                        </div>
                    </div>

                    {/* Right Side (Image) */}
                    <div className="hidden md:block bg-cover bg-center signup_image"></div>
                </div>
            </div>
        </>
    );
}
