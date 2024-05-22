import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import AdminFooter from "../components/admin-footer";
import { faBars, faExpandArrowsAlt, faMaximize, faRightFromBracket, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminLayout = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const layarPenuh = () => {
        if (document.fullscreenEnabled) {
            if (document.fullscreenElement === null) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        //containernya kusaya hapus bgnya jadi ndak bisa full
        <section>
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`ml-auto konten-utama ${isSidebarOpen ? "w-5/6" : "w-[95%]"}`}>
                {/* navbar */}
                {location.pathname.startsWith("/admin") && (
                    <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
                        <div className="flex items-center relative w-full">
                            <button onClick={toggleSidebar} className="text-black focus:outline-none">
                                <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} />
                            </button>
                            <div className="relative ml-auto ">
                                <BsBell className="text-slate-600" />

                                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                            <button onClick={layarPenuh} className="text-[#00000080] hover:text-black focus:outline-none mx-6">
                                <FontAwesomeIcon icon={faMaximize} />
                            </button>
                            <div onClick={handleLogout} className="flex items-center text-[#00000080] hover:text-black cursor-pointer">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="text-base ms-2">Logout</span>
                            </div>
                        </div>
                    </nav>
                )}

                {location.pathname.startsWith("/dosen") && (
                    <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
                        <div className="flex items-center relative w-full">
                            <button onClick={toggleSidebar} className="text-black focus:outline-none">
                                <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} />
                            </button>
                            <div className="relative ml-auto ">
                                <BsBell className="text-slate-600" />

                                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                            <button onClick={layarPenuh} className="text-[#00000080] hover:text-black focus:outline-none mx-6">
                                <FontAwesomeIcon icon={faMaximize} />
                            </button>
                            <div onClick={handleLogout} className="flex items-center text-[#00000080] hover:text-black cursor-pointer">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="text-base ms-2">Logout</span>
                            </div>
                        </div>
                    </nav>
                )}

                {location.pathname.startsWith("/mahasiswa") && (
                    <nav className="bg-white px-3 py-5 flex items-center justify-between shadow-md relative">
                        <div className="flex items-center">
                            <button onClick={toggleSidebar} className="text-[#00000080] hover:text-black focus:outline-none">
                                <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} />
                            </button>
                            <span className="ms-3 text-2xl text-[#00000080] hover:text-black">Pendaftaran Online Wisuda</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <button onClick={layarPenuh} className="text-[#00000080] hover:text-black focus:outline-none">
                                <FontAwesomeIcon icon={faMaximize} />
                            </button>
                            <div onClick={handleLogout} className="flex items-center text-[#00000080] hover:text-black cursor-pointer">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="text-base ms-2">Logout</span>
                            </div>
                        </div>
                    </nav>
                )}

                {props.children}
            </div>

            <AdminFooter />
        </section>
    );
};

export default AdminLayout;
