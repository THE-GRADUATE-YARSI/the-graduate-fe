import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BsBell,
  BsCaretDownFill,
  BsFillDashCircleFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import {
  faArrowDown,
  faArrowUp,
  faBars,
  faExpandArrowsAlt,
  faEye,
  faPencilAlt,
  faSignOutAlt,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../../layout/admin-layout";
import AdminFooter from "../../components/admin-footer";

const CalonWisuda = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNo, setShowNo] = useState(true);
  const [showNPM, setShowNPM] = useState(true);
  const [showNamaMahasiswa, setShowNamaMahasiswa] = useState(true);
  const [ShowProgramStudi, setShowProgramStudi] = useState(true);
  const [ShowTanggalLulus, setShowTanggalLulus] = useState(true);
  const [ShowFoto, setShowFoto] = useState(true);
  const [showAksi, setShowAksi] = useState(true);

  const [sortInfo, setSortInfo] = useState({ column: "id", type: "asc" });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSort = (type, column) => {
    const newData = [...data];
    if (type === "asc") {
      newData.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
      setSortInfo({ column, type: "asc" });
    } else if (type === "desc") {
      newData.sort((a, b) => {
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
        return 0;
      });
      setSortInfo({ column, type: "desc" });
    }
    setData(newData);
  };

  const sortedData = () => {
    if (sortInfo === "asc") {
      return [...data].sort((a, b) => a.nama.localeCompare(b.nama));
    }
    if (sortInfo === "desc") {
      return [...data].sort((a, b) => b.nama.localeCompare(a.nama));
    }
    return data;
  };

  const toggleColumn = (column) => {
    switch (column) {
      case "No":
        setShowNo(!showNo);
        document.querySelectorAll(".no").forEach((elem) => {
          elem.hidden = showNo;
        });
        break;
      case "NPM":
        setShowNPM(!showNPM);
        document.querySelectorAll(".npm").forEach((elem) => {
          elem.hidden = showNPM;
        });
        break;
      case "Nama Mahasiswa":
        setShowNamaMahasiswa(!showNamaMahasiswa);
        document.querySelectorAll(".nama").forEach((elem) => {
          elem.hidden = showNamaMahasiswa;
        });
        break;
      case "Program Studi":
        setShowProgramStudi(!ShowProgramStudi);
        document.querySelectorAll(".prodi").forEach((elem) => {
          elem.hidden = ShowProgramStudi;
        });
        break;
      case "Tanggal Lulus":
        setShowTanggalLulus(!ShowTanggalLulus);
        document.querySelectorAll(".tglLulus").forEach((elem) => {
          elem.hidden = ShowTanggalLulus;
        });
        break;
      case "Foto":
        setShowFoto(!ShowFsetShowFoto);
        document.querySelectorAll(".foto").forEach((elem) => {
          elem.hidden = ShowFoto;
        });
        break;
      case "Aksi":
        setShowAksi(!showAksi);
        document.querySelectorAll(".aksi").forEach((elem) => {
          elem.hidden = showAksi;
        });
        break;
      default:
        break;
    }
  };

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [data, setData] = useState([
    {
      id: 1,
      npm: "1502019002",
      nik: "3201014304010001",
      nama: "Afifah Nurhayati",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
      ttl: "Bogor / 03 April 2001",
      jenisKelamin: "Perempuan",
      alamat:
        "Perum Dephankam Jl. Asri VA Blok D2 No.6 Pondok Rajeg, Cibinong, Bogor",
      email: "Afifahnrhyt@gmail.com",
      noHP: "085311843375",
      noTelp: "085311843375",
      sks: 144,
      ipk: 3.7,
      judulSkripsi:
        "PENERAPAN MODEL THE SEVEN PILLARS UNTUK MENGUKUR TINGKAT LITERASI INFORMASI PADA MAHASISWA S-1 UNIVERSITAS YARSI",
      pembimbingIlmu: "Agus Rifai, SS., M.Ag., Ph.D",
      pembimbingAgama: "Aya Yahya Maulana, Lc., MH",
      tglLulus: "25 July 2023",
    },
    {
      id: 2,
      npm: "1502019004",
      nik: "3171035001010007",
      nama: "Aliifah Putri Pravity",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
      ttl: "Jakarta / 10 January 2001",
      jenisKelamin: "Perempuan",
      alamat:
        "Jl. Cempaka Raya F.5 No. 49 RT.005/009 Cempaka baru, Kemayoran, Jakarta Pusat",
      email: "liifahput19@gmail.com",
      noHP: "087787069202",
      noTelp: "-",
      sks: 146,
      ipk: 3.8,
      judulSkripsi:
        "Persepsi Pemustaka Tentang Kepuasan Tata Ruang Perpustakaan Universitas YARSI",
      pembimbingIlmu: "Ario Adi Prakoso, S.Hum., M.A.",
      pembimbingAgama: "Aya Yahya Maulana, Lc., MH",
      tglLulus: "29 July 2023",
    },
  ]);

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="konten-persyaratan pt-1 px-3 h-full">
          <h1 className="text-xl my-4">Pendaftaran Masuk</h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <h3>Pendaftaran Masuk</h3>
            <hr className="my-2" />
            <div className="flex items-center justify-between mt-3">
              <h5 className="text-md">
                show
                <select
                  name="show-entries"
                  id="show-entries"
                  className="bg-white border-2 border-[#ced4da] focus:border-[#ced4da] text-xs outline-none p-2 mx-2"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </h5>
              <div className="flex items-center">
                <h5 className="text-md">Search:</h5>
                <input
                  type="search"
                  className="py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1 ms-1"
                />
              </div>
            </div>
            <div className="flex mt-3 relative">
              <button className="bg-gray-500 rounded-s py-2 px-3 text-white">
                Copy
              </button>
              <button className="bg-gray-500  py-2 px-3 text-white">CSV</button>
              <button className="bg-gray-500  py-2 px-3 text-white">
                Excel
              </button>
              <button className="bg-gray-500  py-2 px-3 text-white">PDF</button>
              <button className="bg-gray-500  py-2 px-3 text-white">
                Print
              </button>
              <button
                className="bg-gray-500 rounded-e py-2 px-3 text-white flex justify-center items-center"
                onClick={toggleDropdown}
              >
                Column Visibility
                <BsCaretDownFill className="ml-2 text-xs" />
              </button>
              {isOpen && (
                <div className="absolute left-[20%] z-50 top-7 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      showNo
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("No")}
                  >
                    No
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      showNPM
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("NPM")}
                  >
                    NPM
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      showNamaMahasiswa
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("Nama Mahasiswa")}
                  >
                    Nama Mahasiswa
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      ShowProgramStudi
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("Program Studi")}
                  >
                    Program Studi
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      ShowTanggalLulus
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("Tanggal Lulus")}
                  >
                    Tanggal Lulus
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      ShowFoto
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("Foto")}
                  >
                    Foto
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-sm ${
                      showAksi
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("Aksi")}
                  >
                    Aksi
                  </button>
                </div>
              )}
            </div>
            <table className="table-auto w-full tabel-costum">
              <thead>
                <tr className="text-center">
                  <th className="p-2  w-[5%] relative z-10 no">
                    No
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "id")}
                        className={`text-xs ${
                          sortInfo.column === "id" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "id")}
                        className={`text-xs ${
                          sortInfo.column === "id" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative npm">
                    NPM
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "npm")}
                        className={`text-xs ${
                          sortInfo.column === "npm" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "npm")}
                        className={`text-xs ${
                          sortInfo.column === "npm" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative npm">
                    NIK
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "npm")}
                        className={`text-xs ${
                          sortInfo.column === "npm" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "npm")}
                        className={`text-xs ${
                          sortInfo.column === "npm" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative nama w-[10%]">
                    Nama Mahasiswa
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "nama")}
                        className={`text-xs ${
                          sortInfo.column === "nama" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "nama")}
                        className={`text-xs ${
                          sortInfo.column === "nama" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    Program Studi
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    Tempat/Tanggal Lahir
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative tglLulus">
                    Jenis Kelamin
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "tglLulus")}
                        className={`text-xs ${
                          sortInfo.column === "tglLulus" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "tglLulus")}
                        className={`text-xs ${
                          sortInfo.column === "tglLulus" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative foto">
                    Alamat
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "foto")}
                        className={`text-xs ${
                          sortInfo.column === "foto" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "foto")}
                        className={`text-xs ${
                          sortInfo.column === "foto" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    Email
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    No HP
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    No Telepon
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                  <th className="p-2 relative prodi">
                    Total SKS
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "prodi")}
                        className={`text-xs ${
                          sortInfo.column === "prodi" &&
                          sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  sortedData().map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="no p-3">
                          {item.id}
                          <div
                            className="mt-3 ring-2 ring-slate-300 bg-white p-[2px] w-fit rounded-full"
                            onClick={() => toggleRowExpansion(index)}
                          >
                            {expandedRows[index] ? (
                              <BsFillDashCircleFill className="text-[#dc3545]" />
                            ) : (
                              <BsPlusCircleFill className="text-[#0275d8]" />
                            )}
                          </div>
                        </td>
                        <td className="text-center npm p-3">{item.npm}</td>
                        <td className="text-center nik p-3">{item.nik}</td>
                        <td className="nama p-3">{item.nama}</td>
                        <td className="studi p-3">{item.prodi}</td>
                        <td className="ttl p-3">{item.ttl}</td>
                        <td className="jenis-kelamin p-3">
                          {item.jenisKelamin}
                        </td>
                        <td className="alamat p-3">{item.alamat}</td>
                        <td className="email p-3">{item.email}</td>
                        <td className="no-hp p-3">{item.noHP}</td>
                        <td className="no-telp p-3">{item.noTelp}</td>
                        <td className="sks p-3">{item.sks}</td>
                      </tr>
                      {expandedRows[index] && (
                        <tr>
                          <td colSpan="12" className="p-5">
                            <h5>
                              <strong className="mr-5">IPK</strong> {item.ipk}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Judul Skripsi</strong>{" "}
                              {item.judulSkripsi}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Pembimbing Ilmu</strong>{" "}
                              {item.pembimbingIlmu}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Pembimbing Agama</strong>{" "}
                              {item.pembimbingAgama}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Tanggal Lulus</strong>{" "}
                              {item.tglLulus}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-5">Aksi</strong>
                              <button className="bg-[#007bff] ring-2 ring-[#007bff] text-white p-1">
                                <FontAwesomeIcon icon={faEye} /> View
                              </button>
                            </h5>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr key="empty">
                    <td colSpan={12} className="text-center p-3">
                      Data Kosong
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex items-center justify-between my-3">
              <span>Showing 0 to 0 of 0 entries</span>
              <div className="flex items-center">
                <button className="py-1 px-2 border-[#dee2e6] border-2 rounded-sm">
                  Previous
                </button>
                <button className="py-1 px-2 border-[#dee2e6] border-2 border-s-0 rounded-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default CalonWisuda;
