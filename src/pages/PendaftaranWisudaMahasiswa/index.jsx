import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import MainLayouts from "../../layout";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt, faCheck, faMaximize, faRightFromBracket, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../../layout/admin-layout";

const PendaftaranWisuda = () => {
    const [tanggalLahir, setTanggalLahir] = useState(new Date());
    const [tanggalLulus, setTanggalLulus] = useState(new Date());
    const [tanggalWisuda, setTanggalWisuda] = useState(new Date());
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

    const handleUpload = (itemId) => {
        console.log("Upload file for item with ID:", itemId);
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
        <MainLayouts>
            <Sidebar isOpen={collapsed} />
            <div className="w-5/6 h-[92vh] ml-auto">
                {/* Navbar */}
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
                        <div onClick={handleLogout} className="flex items-center text-[#00000080] hover:text-black cursor-pointer">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className="text-base ms-2">Logout</span>
                        </div>
                    </div>
                </nav>
                {/* End of Navbar */}

                <section className="form-pendaftaran-wisuda bg-[#f4f6f9] pt-1 px-3 pb-5">
                    <h1 className="font-medium text-black text-2xl my-4">Pendaftaran Wisuda</h1>
                    <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full" role="alert">
                        <h1 className="font-medium text-black text-xl">Form Pendaftaran Wisuda</h1>
                        <hr />
                        <div className="grid grid-cols-12 my-4">
                            <label className="col-span-2 flex flex-col items-center justify-center">
                                <span className="text-sm font-bold text-center">Foto</span>
                                <img src="images/blank.jpg" alt="foto" className="w-[150px] h-[200px] border-4 border-black" />
                            </label>

                            <div className="col-span-10">
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">NPM</span>
                                        <input type="text" name="npm" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="NPM" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">NIK</span>
                                        <input type="text" name="nik" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="NIK" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Nama Mahasiswa</span>
                                        <input type="text" name="nama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nama Mahasiswa" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-3 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Tempat Lahir</span>
                                        <input type="text" name="tempat" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tempat Lahir" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black block mt-1">Tanggal Lahir</span>
                                        <div className="relative">
                                            <ReactDatePicker selected={tanggalLahir} dateFormat="dd/MM/yyyy" onChange={(date) => setTanggalLahir(date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Jenis Kelamin</span>
                                        <select name="jenisKelamin" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                            <option value="default">--Jenis Kelamin--</option>
                                            <option value="laki-laki">Laki-laki</option>
                                            <option value="perempuan">Perempuan</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Alamat</span>
                                        <input type="text" name="alamat" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Alamat" />
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="grid grid-cols-3 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Email</span>
                                        <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Email" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Handphone</span>
                                        <input type="text" name="handphone" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Handphone" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Telpon</span>
                                        <input type="text" name="telpon" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Telpon" />
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="grid grid-cols-3 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Program Studi</span>
                                        <select name="prodi" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                            <option value="informatika">Teknik Informatika</option>
                                            <option value="pdsi">Perpustakaan dan Sains Informasi (PdSI)</option>
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Total SKS</span>
                                        <input type="text" name="sks" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Total SKS" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">IPK</span>
                                        <input type="text" name="ipk" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="IPK" />
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-12">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Judul Skripsi</span>
                                    <input type="text" name="judul" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Judul Skripsi" />
                                </label>
                            </div>

                            <div className="col-span-12">
                                <div className="grid grid-cols-2 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Pembimbing Ilmu</span>
                                        <select name="pembimbingIlmu" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                            <option value="default">--Pilih Pembimbing--</option>
                                            <option value="1">Fulan</option>
                                            <option value="2">Fulan</option>
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Pembimbing Agama</span>
                                        <select name="pembimbingAgama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                            <option value="default">--Pilih Pembimbing--</option>
                                            <option value="1">Fulan</option>
                                            <option value="2">Fulan</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="grid grid-cols-2 gap-2 my-2">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black block mt-1">Tanggal Lulus</span>
                                        <div className="relative">
                                            <ReactDatePicker selected={tanggalLulus} dateFormat="dd/MM/yyyy" onChange={(date) => setTanggalLulus(date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-bold text-black block mt-1">Tanggal Wisuda</span>
                                        <div className="relative">
                                            <ReactDatePicker selected={tanggalWisuda} dateFormat="dd/MM/yyyy" onChange={(date) => tanggalWisuda(date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="bg-blue-600 text-white font-medium text-sm p-1 rounded-md mt-2">
                                Simpan
                            </button>

                            {/* Tabel Dokumen */}
                            <div className="col-span-12 mt-5">
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th className="w-11/12 border py-2">Dokumen</th>
                                            <th className="w-1/12 border py-2">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="border flex items-center p-2">
                                                    {item.status ? <FontAwesomeIcon icon={faCheck} className="text-green-500 me-2" /> : <FontAwesomeIcon icon={faTimes} className="text-red-500 me-2" />}
                                                    {item.condition}
                                                </td>
                                                <td className="border text-center">
                                                    <button disabled={item.status} onClick={() => handleUpload(item.id)} className={`px-4 py-1 ${item.status ? "bg-gray-300 cursor-not-allowed text-xs" : "bg-blue-500 hover:bg-blue-600 text-white text-xs focus:outline-none"}`}>
                                                        <FontAwesomeIcon icon={faUpload} className="me-1" />
                                                        <span>Upload</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* End of Tabel Dokumen */}

                            <div className="col-span-12 mt-5">
                                <div className="bg-white border-l-4 flex items-center p-4 shadow-md border-red-500" role="alert">
                                    <FontAwesomeIcon icon={faTimes} className="me-2 text-red-500" />
                                    <h5 className="font-medium fo text-black">Pendaftaran Belum Bisa Dikirim Sebelum Melengkapi Upload Dokumen Persyaratan !!!!</h5>
                                </div>
                            </div>
                        </div>
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

export default PendaftaranWisuda;
