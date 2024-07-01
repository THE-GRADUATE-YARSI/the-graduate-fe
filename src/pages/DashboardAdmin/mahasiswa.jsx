import { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Sidebar from "../../components/sidebar";

import "../../assets/css/style.css";
import {
  faBars,
  faTimes,
  faExpandArrowsAlt,
  faSignOutAlt,
  faArrowUp,
  faArrowDown,
  faPencilAlt,
  faTrash,
  faPlus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell, BsCaretDownFill } from "react-icons/bs";
import AdminLayout from "../../layout/admin-layout";
import Modal from "../../components/modal";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config/network";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Mahasiswa() {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNo, setShowNo] = useState(true);
  const [showNPM, setShowNPM] = useState(true);
  const [showNamaDosen, setShowNamaDosen] = useState(true);
  const [ShowProgramStudi, setShowProgramStudi] = useState(true);
  const [showAksi, setShowAksi] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        setStudents(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [sortInfo, setSortInfo] = useState({ column: "id", type: "asc" });

  const toggleSort = (type, column) => {
    const newData = [...data];
    if (type === "asc") {
      newData.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
      // Perbarui sortInfo dengan kolom dan tipe pengurutan yang baru
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
    // Jika tidak ada pengurutan, kembalikan data tanpa pengurutan
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
      case "Nama Dosen":
        setShowNamaDosen(!showNamaDosen);
        document.querySelectorAll(".nama").forEach((elem) => {
          elem.hidden = showNamaDosen;
        });
        break;
      case "Program Studi":
        setShowProgramStudi(!ShowProgramStudi);
        document.querySelectorAll(".studi").forEach((elem) => {
          elem.hidden = ShowProgramStudi;
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

  const [selectedYear, setSelectedYear] = useState("default");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredData =
    selectedYear === "default"
      ? students || []
      : (students &&
          students.filter(
            (item) => item.data.academic_year === selectedYear
          )) ||
        [];

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* berkas */}
        <div className="berkas p-5 bg-[#f4f6f9] h-full">
          <div className="judul">
            <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">
              Mahasiswa
            </h1>
          </div>
          <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
            <div className="p-5 flex justify-between items-center">
              <h5 className="text-md text-medium">Mahasiswa</h5>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="bg-white border-2 p-2 rounded-lg border-gray-400"
              >
                <option value="default">--Pilih Tahun Akademik--</option>
                <option value="2020/2021">Tahun Akademik 2020/2021</option>
                <option value="2021/2022">Tahun Akademik 2021/2022</option>
              </select>
              <Modal
                show={showModal}
                title="Modal Title"
                onClosed={handleCloseModal}
              >
                <div className="w-[35rem] flex flex-col gap-5">
                  <h1 className="text-black font-bold text-lg">NPM</h1>
                  <TextField
                    id="outlined-basic"
                    placeholder="NPM"
                    variant="outlined"
                    className="w-full"
                  />
                  <h1 className="text-black font-bold text-lg">
                    Nama Mahasiswa
                  </h1>
                  <TextField
                    id="outlined-basic"
                    placeholder="Nama Mahasiswa"
                    variant="outlined"
                    className="w-full"
                  />
                  <h1 className="text-black font-bold text-lg">
                    Program Studi
                  </h1>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
              </Modal>
            </div>
            <hr />
            <div className="p-5">
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
              <div className="flex mt-3 relative">
                <button className="bg-gray-500 rounded-s py-2 px-3 text-white">
                  Copy
                </button>
                <button className="bg-gray-500  py-2 px-3 text-white">
                  CSV
                </button>
                <button className="bg-gray-500  py-2 px-3 text-white">
                  Excel
                </button>
                <button className="bg-gray-500  py-2 px-3 text-white">
                  PDF
                </button>
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
                        showNamaDosen
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      onClick={() => toggleColumn("Nama Dosen")}
                    >
                      Nama Dosen
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
              <table className="table-auto w-full tabel-costum mt-5">
                <thead>
                  <tr className="text-center">
                    <th className="p-2 w-[5%] relative z-10 no">
                      <span className="mr-3">No</span>
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
                            sortInfo.column === "npm" &&
                            sortInfo.type === "desc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                    <th className="p-2 relative nama">
                      Nama Dosen
                      <div className="absolute bottom-2 right-2">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          onClick={() => toggleSort("asc", "nama")}
                          className={`text-xs ${
                            sortInfo.column === "nama" &&
                            sortInfo.type === "asc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          onClick={() => toggleSort("desc", "nama")}
                          className={`text-xs ${
                            sortInfo.column === "nama" &&
                            sortInfo.type === "desc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                    <th className="p-2 relative studi">
                      Program Studi
                      <div className="absolute bottom-2 right-2">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          onClick={() => toggleSort("asc", "prodi")}
                          className={`text-xs ${
                            sortInfo.column === "prodi" &&
                            sortInfo.type === "asc"
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
                  {filteredData.map((student, index) => (
                    <tr key={index}>
                      <td className="no">{index + 1}</td>
                      <td className="text-center npm">
                        {student.data.student_id}
                      </td>
                      <td className="nama">
                        {student.data.first_name} {student.data.last_name}
                      </td>
                      <td className="studi">{student.data.major}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing
                      <span className="font-medium"> 1 </span>
                      to
                      <span className="font-medium"> 10 </span>
                      of
                      <span className="font-medium"> 97 </span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      {/* <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --> */}
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-[#007bff] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff]"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        9
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        10
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Mahasiswa;
