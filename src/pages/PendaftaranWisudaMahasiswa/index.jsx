import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import MainLayouts from "../../layout";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const PendaftaranWisuda = () => {
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [tanggalLulus, setTanggalLulus] = useState(new Date());
  const [tanggalWisuda, setTanggalWisuda] = useState(new Date());

  return (
    <MainLayouts>
      <Sidebar />
      <div className="w-5/6 h-[92vh] ml-auto">
        <section className="form-pendaftaran-wisuda bg-[#f4f6f9]">
          <h1 className="font-medium text-black text-2xl my-4">
            Pendaftaran Wisuda
          </h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-md w-full"
            role="alert"
          >
            <h1 className="font-medium text-black text-xl">
              Form Pendaftaran Wisuda
            </h1>
            <hr />
            <div className="grid grid-cols-12 my-4">
              <label className="col-span-2 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-center">Foto</span>
                <img
                  src="images/blank.jpg"
                  alt="foto"
                  className="w-[150px] h-[200px] border-4 border-black"
                />
              </label>

              <div className="col-span-10">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">NPM</span>
                    <input
                      type="text"
                      name="npm"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="NPM"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">NIK</span>
                    <input
                      type="text"
                      name="nik"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="NIK"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Nama Mahasiswa
                    </span>
                    <input
                      type="text"
                      name="nama"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Nama Mahasiswa"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Tempat Lahir
                    </span>
                    <input
                      type="text"
                      name="tempat"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Tempat Lahir"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black block mt-1">
                      Tanggal Lahir
                    </span>
                    <div className="relative">
                      <ReactDatePicker
                        selected={tanggalLahir}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setTanggalLahir(date)}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                        wrapperClassName="w-full"
                      />
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Jenis Kelamin
                    </span>
                    <select
                      name="jenisKelamin"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
                      <option value="default">--Jenis Kelamin--</option>
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">Alamat</span>
                    <input
                      type="text"
                      name="alamat"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Alamat"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-12">
                <div className="grid grid-cols-3 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">Email</span>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Email"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Handphone
                    </span>
                    <input
                      type="text"
                      name="handphone"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Handphone"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">Telpon</span>
                    <input
                      type="text"
                      name="telpon"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Telpon"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-12">
                <div className="grid grid-cols-3 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Program Studi
                    </span>
                    <select
                      name="prodi"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
                      <option value="informatika">Teknik Informatika</option>
                      <option value="pdsi">
                        Perpustakaan dan Sains Informasi (PdSI)
                      </option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Total SKS
                    </span>
                    <input
                      type="text"
                      name="sks"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Total SKS"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">IPK</span>
                    <input
                      type="text"
                      name="ipk"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="IPK"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-12">
                <label className="block">
                  <span className="text-sm font-bold text-black">
                    Judul Skripsi
                  </span>
                  <input
                    type="text"
                    name="judul"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Judul Skripsi"
                  />
                </label>
              </div>

              <div className="col-span-12">
                <div className="grid grid-cols-2 gap-2 my-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Pembimbing Ilmu
                    </span>
                    <select
                      name="pembimbingIlmu"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
                      <option value="default">--Pilih Pembimbing--</option>
                      <option value="1">Fulan</option>
                      <option value="2">Fulan</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Pembimbing Agama
                    </span>
                    <select
                      name="pembimbingAgama"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
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
                    <span className="text-sm font-bold text-black block mt-1">
                      Tanggal Lulus
                    </span>
                    <div className="relative">
                      <ReactDatePicker
                        selected={tanggalLulus}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setTanggalLulus(date)}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                        wrapperClassName="w-full"
                      />
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black block mt-1">
                      Tanggal Wisuda
                    </span>
                    <div className="relative">
                      <ReactDatePicker
                        selected={tanggalWisuda}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => tanggalWisuda(date)}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                        wrapperClassName="w-full"
                      />
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white font-medium text-sm p-1 rounded-md mt-2"
              >
                Simpan
              </button>

              <div className="col-span-12 mt-5">
                <div className="grid grid-cols-[80fr,20fr]">
                  <div className="p-4 border">Kolom Pertama</div>
                  <div className="p-4 border">Kolom Kedua</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayouts>
  );
};

export default PendaftaranWisuda;
