import { useState } from "react";
import React from "react";
import "../styles/login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Reset_password = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for button loading
    const [formData, setFormData] = useState({
        password: "",
    });
    const baseURL = import.meta.env.VITE_API_URL;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = async () => {
        const res = await fetch(`${baseURL}/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (data.success) toast.success("Password updated");
        else toast.error(data.error);
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-white px-3 sm:px-6 lg:px-8">

                <div className="max-w-xl w-full bg-gray-200 shadow-lg rounded-lg overflow-hidden">

                    {/* Left Side (Form) */}
                    <div className="p-8 md:p-10">
                        <h4 className="text-2xl font-semibold text-gray-900">Welcome Back</h4>
                        <h5 className="text-md text-gray-600 mt-2">Please enter your details</h5>

                        <div className="mt-6 space-y-4">
                            {/* Error Message */}
                            {error && <p className="text-red-500 font-semibold text-md">{error}</p>}

                            {/* Email Input */}
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
                                onClick={handleReset}
                                disabled={!formData.password || loading}
                                className={`w-full py-3 rounded-md text-white ${loading || !formData.password
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loading ? "Logging in..." : "Submit"}
                            </button>

                            {/* Register Link */}
                            {/* <div className="text-center mt-4">
                <Link to="/signup" className="text-sm text-blue-600 hover:underline">
                  Don't have an Account? Register
                </Link>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset_password
