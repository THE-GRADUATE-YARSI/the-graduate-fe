import { faCalendarAlt, faCheck, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "../../layout/admin-layout";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../config/network";

const PendaftaranWisuda = () => {
    const [fullName, setFullName] = useState("");

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

    const [formData, setFormData] = useState({
        student_id: "",
        major: "",
        first_name: "",
        last_name: "",
        national_id: "",
        address: "",
        birth_date: null,
        birth_place: "",
        phone_number: "",
        telephone_number: "",
        credit_course: "",
        gpa: "",
        thesis_title: "",
        advisor: "",
        examiner: "",
        gender: "",
        religion_advisor: "",
        graduate_date: null,
        commencement_date: null,
        email: "",
    });

    console.log(formData);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const { email } = decodedToken;
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: email,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== "full_name") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFullName(value);
        }
    };

    const handleFullName = () => {
        const [first_name, ...last_name] = fullName.split(" ");
        setFormData({
            ...formData,
            first_name,
            last_name: last_name.join(" "),
        });
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const postData = {
            ...formData,
            credit_course: parseInt(formData.credit_course),
            gpa: parseFloat(formData.gpa),
            birth_date: formData.birth_date ? format(formData.birth_date, "dd MMMM yyyy", { locale: id }) : null,
            commencement_date: formData.commencement_date ? format(formData.commencement_date, "dd MMMM yyyy", { locale: id }) : null,
            graduate_date: formData.graduate_date ? format(formData.graduate_date, "dd MMMM yyyy", { locale: id }) : null,
        };

        try {
            const response = await axios.post(BASE_URL + "/students", JSON.stringify(postData), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }

        console.log(postData);
    };

    return (
        <AdminLayout>
            <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
                <section className="form-pendaftaran-wisuda bg-[#f4f6f9] pt-1 px-3 pb-5">
                    <h1 className="font-medium text-black text-2xl my-4">Pendaftaran Wisuda</h1>
                    <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full" role="alert">
                        <h1 className="font-medium text-black text-xl">Form Pendaftaran Wisuda</h1>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 my-4">
                                <label className="col-span-2 flex flex-col items-center justify-center">
                                    <span className="text-sm font-bold text-center">Foto</span>
                                    <img src="images/blank.jpg" alt="foto" className="w-[150px] h-[200px] border-4 border-black" />
                                </label>

                                <div className="col-span-10">
                                    <div className="grid grid-cols-2 gap-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">NPM</span>
                                            <input type="text" name="student_id" onChange={handleChange} value={formData.student_id} className="mt-1 px-3 py-2 bg-gray-200 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed+" placeholder="NPM" disabled />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">NIK</span>
                                            <input type="text" name="national_id" onChange={handleChange} value={formData.national_id} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="NIK" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Nama Mahasiswa</span>
                                            <input type="text" name="full_name" onChange={handleChange} onBlur={handleFullName} value={fullName} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nama Mahasiswa" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Tempat Lahir</span>
                                            <input type="text" name="birth_place" onChange={handleChange} value={formData.birth_place} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tempat Lahir" />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black block mt-1">Tanggal Lahir</span>
                                            <div className="relative">
                                                <ReactDatePicker selected={formData.birth_date} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateChange("birth_date", date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                                <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Jenis Kelamin</span>
                                            <select name="gender" onChange={handleChange} value={formData.gender} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                                <option value="default">--Jenis Kelamin--</option>
                                                <option value="laki-laki">Laki-laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Alamat</span>
                                            <input type="text" name="address" onChange={handleChange} value={formData.address} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Alamat" />
                                        </label>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="grid grid-cols-3 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Email</span>
                                            <input type="email" name="email" value={formData.email} className="mt-1 px-3 py-2 bg-gray-200 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed" placeholder="Email" disabled />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Handphone</span>
                                            <input type="text" name="phone_number" onChange={handleChange} value={formData.phone_number} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Handphone" />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Telpon</span>
                                            <input type="text" name="telephone_number" onChange={handleChange} value={formData.telephone_number} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Telpon" />
                                        </label>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="grid grid-cols-3 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Program Studi</span>
                                            <select name="major" onChange={handleChange} value={formData.major} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                                <option value="default" disabled>
                                                    --Pilih Program Studi--
                                                </option>
                                                <option value="informatika">Teknik Informatika</option>
                                                <option value="pdsi">Perpustakaan dan Sains Informasi (PdSI)</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Total SKS</span>
                                            <input type="text" name="credit_course" onChange={handleChange} value={formData.credit_course} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Total SKS" />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">IPK</span>
                                            <input type="text" name="gpa" onChange={handleChange} value={formData.gpa} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="IPK" />
                                        </label>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <label className="block">
                                        <span className="text-sm font-bold text-black">Judul Skripsi</span>
                                        <input type="text" name="thesis_title" onChange={handleChange} value={formData.thesis_title} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Judul Skripsi" />
                                    </label>
                                </div>

                                <div className="col-span-12">
                                    <div className="grid grid-cols-2 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Pembimbing Ilmu</span>
                                            <select name="advisor" onChange={handleChange} value={formData.advisor} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                                <option value="default">--Pilih Pembimbing--</option>
                                                <option value="1">Fulan</option>
                                                <option value="2">Fulan</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Pembimbing Agama</span>
                                            <select name="religion_advisor" onChange={handleChange} value={formData.religion_advisor} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
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
                                            <span className="text-sm font-bold text-black">Dosen Penguji</span>
                                            <select name="examiner" onChange={handleChange} value={formData.examiner} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                                <option value="default" disabled>
                                                    --Pilih Dosen Penguji--
                                                </option>
                                                <option value="1">Fulan</option>
                                                <option value="2">Fulan</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black">Tahun Akademik</span>
                                            <select name="tahunAkademik" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                                                <option value="default" disabled>
                                                    --Pilih Tahun Akademik--
                                                </option>
                                                <option value="1">2020/2021</option>
                                                <option value="2">2021/2022</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="grid grid-cols-2 gap-2 my-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-black block mt-1">Tanggal Lulus</span>
                                            <div className="relative">
                                                <ReactDatePicker selected={formData.graduate_date} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateChange("graduate_date", date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                                <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-black block mt-1">Tanggal Wisuda</span>
                                            <div className="relative">
                                                <ReactDatePicker selected={formData.commencement_date} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateChange("commencement_date", date)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10" wrapperClassName="w-full" />
                                                <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="bg-blue-600 text-white font-medium text-sm p-1 rounded-md mt-2">
                                    Simpan
                                </button>
                            </div>
                        </form>
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
                </section>
            </div>
        </AdminLayout>
    );
};

export default PendaftaranWisuda;
