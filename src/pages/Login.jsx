import { useState } from "react";
import React from "react";
import "../styles/login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for button loading
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const baseURL = import.meta.env.VITE_API_URL;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        setLoading(true);
        setError(""); // Reset error message
        try {
            const response = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            let responseData = await response.json();

            if (response.ok && responseData.success) {
                localStorage.setItem("auth-token", responseData.token);
                navigate("/"); // Redirect using React Router
                window.location.reload();
            } else {
                setError(responseData.errors);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <>
            
            <div className="min-h-screen flex items-center justify-center bg-white px-3 sm:px-6 lg:px-8">

                <div className="max-w-4xl w-full bg-gray-200 shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side (Form) */}
                    <div className="p-8 md:p-10">
                        <h4 className="text-2xl font-semibold text-gray-900">Welcome Back</h4>
                        <h5 className="text-md text-gray-600 mt-2">Please enter your details</h5>

                        <div className="mt-6 space-y-4">
                            {/* Error Message */}
                            {error && <p className="text-red-500 font-semibold text-md">{error}</p>}

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
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={changeHandler}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Your Password"
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="button"
                                onClick={login}
                                disabled={!formData.email || !formData.password || loading}
                                className={`w-full py-3 rounded-md text-white ${loading || !formData.email || !formData.password
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Register Link */}
                            <div className="text-center mt-4">
                                <Link to="/signup" className="text-sm text-blue-600 hover:underline">
                                    Don't have an Account? Register
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side (Image) */}
                    <div className="hidden md:block bg-cover bg-center login_image"></div>
                </div>
            </div>
        </>
    );
}
