import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMaximize, faRightFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import MainLayouts from "../../layout";

const DashboardMahasiswa = () => {
    const [collapsed, setCollapsed] = useState(false);

    const data = [
        { id: 1, condition: "FotoCopy Berwarna Ijazah SMA", status: false },
        { id: 2, condition: "FotoCopy Berwarna Akte Kelahiran", status: false },
        { id: 3, condition: "FotoCopy Berwarna Kartu Keluarga", status: false },
        {
            id: 4,
            condition: "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)",
            status: false,
        },
        {
            id: 5,
            condition: "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)",
            status: false,
        },
        { id: 6, condition: "Pas Foto Berwarna", status: false },
        { id: 7, condition: "Surat Keterangan Kelulusan (SKL)", status: false },
        { id: 8, condition: "Sertifikat TOEIC", status: false },
        { id: 9, condition: "File Skripsi", status: true },
    ];

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
    return (
        <MainLayouts>
            <Sidebar isOpen={collapsed} />
            {/* Navbar */}
            <div className="w-5/6 h-[92vh] ml-auto">
                <nav className="bg-white px-3 py-5 flex items-center justify-between shadow-md relative">
                    <div className="flex items-center">
                        <button onClick={() => setCollapsed(!collapsed)} className="text-[#00000080] hover:text-black focus:outline-none">
                            <FontAwesomeIcon icon={collapsed ? faTimes : faBars} />
                        </button>
                        <span className="ms-3 text-2xl text-[#00000080] hover:text-black">Pendaftaran Online Wisuda</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={layarPenuh} className="text-[#00000080] hover:text-black focus:outline-none">
                            <FontAwesomeIcon icon={faMaximize} />
                        </button>
                        <div className="flex items-center text-[#00000080] hover:text-black">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className="text-base ms-2">Logout</span>
                        </div>
                    </div>
                </nav>
                {/* End of Navbar */}

                {/* Dashboard Content */}
                <section className="dashboard-mahasiswa h-full relative bg-[#f4f6f9] p-4">
                    <h1 className="text-2xl text-black mb-4">Dashboard Mahasiswa</h1>
                    <div className="bg-white border-l-4 border-[#117a8b] text-black p-4 shadow-md" role="alert">
                        <h2 className="font-medium">
                            Selamat Datang <span className="text-blue-600 font-bold">Tamara Yuniar Asmah</span>
                        </h2>
                    </div>

                    <h1 className="text-2xl text-black my-4 font-bold">Persyaratan Wisuda</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {data.map((item) => (
                            <div key={item.id} className={`bg-white border-l-4 p-4 shadow-md ${item.status ? "border-green-500" : "border-red-500"}`} role="alert">
                                <h2 className="font-medium text-black">{item.condition}</h2>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="text-[#869099] text-base bg-white text-center border-t-2 py-4">
                    <strong className="me-1">
                        Copyright © 2024 <span className="text-blue-600">The Graduate</span>.
                    </strong>
                    All rights reserved.
                </footer>
            </div>
        </MainLayouts>
    );
};

export default DashboardMahasiswa;
