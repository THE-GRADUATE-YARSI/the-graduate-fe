import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AdminLayout from "../../layout/admin-layout";

const DashboardMahasiswa = () => {
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

    return (
        <AdminLayout>
            <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
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
                            <div key={item.id} className={`bg-white border-l-4 flex items-center p-4 shadow-md ${item.status ? "border-green-500" : "border-red-500"}`} role="alert">
                                <FontAwesomeIcon icon={item.status ? faCheck : faTimes} className={`me-2 ${item.status ? "text-green-500" : "text-red-500"}`} />
                                <h2 className="font-medium text-black">{item.condition}</h2>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default DashboardMahasiswa;
