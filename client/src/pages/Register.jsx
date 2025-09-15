import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be the same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Create an Account</h2>
                <p className="text-gray-500 text-center mt-1 mb-6">Welcome to <span className="text-green-700 font-semibold">SnapShop</span></p>

                <form className="grid gap-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            autoFocus
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="grid gap-1">
                        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full outline-none bg-transparent"
                            />
                            <div
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-1">
                        <label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full outline-none bg-transparent"
                            />
                            <div
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        disabled={!valideValue}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition 
                        ${valideValue
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-700 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Register
