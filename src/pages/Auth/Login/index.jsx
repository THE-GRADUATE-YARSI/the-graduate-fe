import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config/network";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL + "/auth/login", formData);
            const token = response.data.data;
            const decodedToken = jwtDecode(token);
            localStorage.setItem("token", token);
            if (decodedToken.role === "student") {
                navigate("/mahasiswa/dashboard-mahasiswa");
            } else if (decodedToken.role === "admin") {
                navigate("/admin/dashboard-admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-[#e9ecef]">
            <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-md rounded-md w-80">
                <h1 className="text-4xl text-center py-3">The Graduate</h1>
                <hr />
                <p className="text-center py-3 font-light text-sm">Silahkan Login</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Username" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Password" />
                    <div className="flex items-center justify-between gap-3 mt-3">
                        <Link to="/register" type="submit" className="py-2 w-full rounded-sm bg-[#28a745] hover:bg-green-700 text-center text-white font-medium text-sm">
                            Register
                        </Link>
                        <button type="submit" className="py-2 w-full rounded-sm bg-[#007bff] hover:bg-blue-700 text-center text-white font-medium text-sm">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
