import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/network";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.role) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            }).fire({
                icon: "error",
                title: "Please select a role!",
            });
            return;
        }

        try {
            const response = await axios.post(BASE_URL + "/users", formData);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Registration Successful",
                }).then(() => {
                    navigate("/login");
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: "Something went wrong during registration. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            }).fire({
                icon: "error",
                title: "Registration Failed",
                text: "Something went wrong during registration. Please try again.",
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-[#e9ecef]">
            <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-md rounded-md w-80">
                <h1 className="text-4xl text-center py-3">The Graduate</h1>
                <hr />
                <div className="flex items-center justify-between">
                    <Link to="/login" className="text-gray-600 hover:text-black">
                        <FontAwesomeIcon icon={faCircleArrowLeft} className="w-5 h-5" />
                    </Link>
                    <p className="text-center py-3 font-light text-sm">Silahkan Register</p>
                    <div></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Username" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Password" />
                    <select name="role" value={formData.role} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                        <option value="" disabled hidden>
                            Role
                        </option>
                        <option value="student">Mahasiswa</option>
                        <option value="dosen" disabled>
                            Dosen
                        </option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type="text" name="first_name" value={formData.firstName} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="First Name" />
                    <input type="text" name="last_name" value={formData.lastName} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Last Name" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1" placeholder="Email" />
                    <button type="submit" className="py-2 w-full rounded-sm bg-[#28a745] hover:bg-green-700 text-center text-white font-medium text-sm mt-3">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
