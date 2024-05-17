import { faBars, faCircleArrowRight, faDownload, faExpandArrowsAlt, faFile, faFileAlt, faInfo, faSignOutAlt, faTimes, faUserGraduate, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { BsBell } from "react-icons/bs";
import "../../assets/css/style.css";
import AdminLayout from "../../layout/admin-layout";

function DashboardDosen() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <AdminLayout>
            <div className="w-5/6 h-[93vh] bg-[#f4f6f9] ml-auto">
                {/* navbar */}
                <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
                    <div className="flex items-center relative w-full">
                        <button onClick={() => setCollapsed(!collapsed)} className="text-black focus:outline-none">
                            <FontAwesomeIcon icon={collapsed ? faTimes : faBars} />
                        </button>
                        <div className="relative ml-auto ">
                            <BsBell className="text-slate-600" />

                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="mx-8 text-slate-600">
                            <FontAwesomeIcon icon={faExpandArrowsAlt} />
                        </div>
                        <a href="" className="text-slate-600">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                            Logout
                        </a>
                    </div>
                </nav>

                {/* konten */}
                <div className="konten dosen p-5">
                    <h1 className="text-3xl">Dashboard Dosen</h1>
                    <div className="flex justify-between w-full bg-[#007bff] border-[#007bff] text-white px-3 py-5 font-bold mt-5">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                            <h5> Selamat Datang Tamara Yunidar Asmah</h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <div className="card bg-[#ffc107] rounded">
                            <div className="flex p-5">
                                <div className="text">
                                    <h1 className="text-3xl mb-3 font-bold">0</h1>
                                    <p>Surat Tugas</p>
                                </div>
                                <FontAwesomeIcon icon={faFileAlt} className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon" />
                            </div>
                        </div>
                        <div className="card bg-[#17a2b8] rounded text-white">
                            <div className="flex p-5">
                                <div className="text">
                                    <h1 className="text-3xl mb-3 font-bold">0</h1>
                                    <p>Surat Undangan</p>
                                </div>
                                <FontAwesomeIcon icon={faFileAlt} className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon" />
                            </div>
                        </div>
                        <div className="card bg-[#28a745] rounded text-white">
                            <div className="flex p-5">
                                <div className="text">
                                    <h1 className="text-3xl mb-3 font-bold">0</h1>
                                    <p>Berita Acara</p>
                                </div>
                                <FontAwesomeIcon icon={faFileAlt} className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon" />
                            </div>
                        </div>
                        <div className="card bg-[#dc3545] rounded text-white">
                            <div className="flex p-5">
                                <div className="text">
                                    <h1 className="text-3xl mb-3 font-bold">0</h1>
                                    <p>Surat Tugas Penguji</p>
                                </div>
                                <FontAwesomeIcon icon={faFileAlt} className="ml-auto text-7xl text-[rgba(0,0,0,.15)]" />
                            </div>
                        </div>
                        <div className="card bg-[#007bff] rounded text-white">
                            <div className="flex p-5">
                                <div className="text">
                                    <h1 className="text-3xl mb-3 font-bold">0</h1>
                                    <p>Mahasiswa</p>
                                </div>
                                <FontAwesomeIcon icon={faFileAlt} className="ml-auto text-7xl text-[rgba(0,0,0,.15)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DashboardDosen;
