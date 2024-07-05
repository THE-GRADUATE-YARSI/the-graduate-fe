import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/network";
import axios from "axios";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
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

    if (!formData.email) {
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
        title: "Tolong isi email terlebih dahulu!",
      });
      return;
    }

    try {
      await axios.post(BASE_URL + "/users/sendemail", formData);
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

      Toast.fire({
        icon: "success",
        title: "Berhasil mengirim link lupa password ke email anda!",
      });
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
        <p className="text-center py-3 font-light text-sm">
          Silahkan Isi Email
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1"
            placeholder="Email"
          />

          <div className="flex items-center justify-between gap-3 mt-3">
            <button
              type="submit"
              className="py-2 w-full rounded-sm bg-[#007bff] hover:bg-blue-700 text-center text-white font-medium text-sm"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
