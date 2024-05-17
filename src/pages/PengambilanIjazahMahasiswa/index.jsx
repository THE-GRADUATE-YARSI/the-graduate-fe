import React, { useState } from "react";
import MainLayouts from "../../layout";
import Sidebar from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt, faFloppyDisk, faInfo, faMaximize, faPrint, faRightFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import AdminLayout from "../../layout/admin-layout";

const PengambilanIjazahMahasiswa = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [tanggalLahir, setTanggalLahir] = useState(new Date());
    const [tanggalLulus, setTanggalLulus] = useState(new Date());

    const sembunyikan = () => {
        setIsHidden(true);
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
        <AdminLayout>
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

                <section className="form-pengambilan-ijazah bg-[#f4f6f9] pt-1 px-3 pb-5 h-full">
                    <h1 className="font-medium text-black text-2xl my-4">Formulir Pengambilan Ijazah</h1>
                    <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full" role="alert">
                        <h4 className="font-bold text-center pb-3">Formulir Surat Pernyataan Pengambilan Ijazah</h4>
                        {!isHidden && (
                            <div className="flex justify-between w-full bg-[#17a2b8] border-[#148ea1] text-white p-3 font-bold">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                                    <h5>Lengkapi Isian Formulir Sebelum Di Cetak!</h5>
                                </div>
                                <button onClick={sembunyikan} className="text-[#0c5460] hover:text-black">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        )}
                        <div className="col-span-12 mt-4">
                            <div className="grid grid-cols-3 gap-2">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">NPM</span>
                                    <input type="text" name="npm" className="mt-1 px-3 py-2 bg-[#e9ecef] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed" placeholder="NPM" disabled />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Nama Mahasiswa</span>
                                    <input type="text" name="nama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nama Mahasiswa" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Agama</span>
                                    <input type="text" name="agama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Agama" />
                                </label>
                            </div>
                        </div>
                        <div className="col-span-12 mt-4">
                            <div className="grid grid-cols-3 gap-2">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Tempat Lahir</span>
                                    <input type="text" name="tanggalLahir" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tanggal Lahir" />
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
                        </div>
                        <div className="col-span-12 mt-4">
                            <div className="grid grid-cols-2 gap-2">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Alamat</span>
                                    <input type="text" name="alamat" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Alamat" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Handphone</span>
                                    <input type="text" name="hp" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Handphone" />
                                </label>
                            </div>
                        </div>
                        <div className="col-span-12 mt-4">
                            <div className="grid grid-cols-4 gap-2">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Program Studi</span>
                                    <select name="prodi" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                        <option value="informatika">Teknik Informatika</option>
                                        <option value="pdsi">Perpustakaan dan Sains Informasi (PdSI)</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Jenjang</span>
                                    <input type="text" name="jenjang" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Jenjang" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">IPK</span>
                                    <input type="text" name="ipk" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="IPK" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black block mt-1">Tanggal Lulus</span>
                                    <div className="relative">
                                        <ReactDatePicker selected={tanggalLulus} dateFormat="dd/MM/yyyy" onChange={(date) => setTanggalLulus(date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                        <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-12 mt-4">
                            <div className="grid grid-cols-3 gap-2">
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Nama Ayah</span>
                                    <input type="text" name="namaAyah" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nama Ayah" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Nama Ibu</span>
                                    <input type="text" name="namaIbu" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nama Ibu" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold text-black">Telpon Orang Tua</span>
                                    <input type="text" name="tlpOrtu" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Telepon Orang Tua" />
                                </label>
                            </div>
                        </div>
                        <div className="col-span 12 mt-4">
                            <label className="block">
                                <span className="text-sm font-bold text-black">Alamat Orang Tua</span>
                                <input type="text" name="alamatOrtu" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Alamat Orang Tua" />
                            </label>
                        </div>

                        <div className="flex items-center gap-1 mt-2">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-1 rounded-sm mt-2 px-2 py-1">
                                <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                                <span>Simpan</span>
                            </button>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm p-1 rounded-sm mt-2 px-2 py-1">
                                <FontAwesomeIcon icon={faPrint} className="me-1" />
                                <span>Cetak Formulir</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default PengambilanIjazahMahasiswa;
