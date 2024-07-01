import React, { useEffect, useState } from "react";
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
import { BASE_URL } from "../../config/network";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const token = localStorage.getItem("token");
  const [sortInfo, setSortInfo] = useState({ column: "id", type: "asc" });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [dataWithFullName, setDataWithFullName] = useState([]);

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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setData(
          response.data.data.filter(
            (data) => data.data.verification === "VERIFIED"
          )
        );
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const updatedData = data.map((item) => ({
      ...item,
      fullName: `${item.data.first_name} ${item.data.last_name}`,
    }));
    setDataWithFullName(updatedData);
  }, [data]);

  const toggleSort = (type, column) => {
    let newData = [...dataWithFullName];
    if (type === "asc") {
      newData.sort((a, b) => {
        if (a.data[column] && b.data[column]) {
          return a.data[column].localeCompare(b.data[column]);
        }
        return 0;
      });
    } else if (type === "desc") {
      newData.sort((a, b) => {
        if (a.data[column] && b.data[column]) {
          return b.data[column].localeCompare(a.data[column]);
        }
        return 0;
      });
    }
    setSortInfo({ column, type });
    setDataWithFullName(newData);
  };

  const sortedData = () => {
    if (sortInfo.column) {
      return [...dataWithFullName].sort((a, b) => {
        if (a.data[sortInfo.column] && b.data[sortInfo.column]) {
          if (sortInfo.type === "asc") {
            return a.data[sortInfo.column].localeCompare(
              b.data[sortInfo.column]
            );
          } else if (sortInfo.type === "desc") {
            return b.data[sortInfo.column].localeCompare(
              a.data[sortInfo.column]
            );
          }
        }
        return 0;
      });
    }
    return dataWithFullName;
  };

  const handleViewStudentDetail = (studentId) => {
    navigate(`/admin/pendaftaran/mahasiswa/${studentId}`);
  };

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
                        onClick={() => toggleSort("asc", "student_id")}
                        className={`text-xs ${
                          sortInfo.column === "student_id" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "student_id")}
                        className={`text-xs ${
                          sortInfo.column === "student_id" &&
                          sortInfo.type === "desc"
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
                        onClick={() => toggleSort("asc", "national_id")}
                        className={`text-xs ${
                          sortInfo.column === "national_id" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "national_id")}
                        className={`text-xs ${
                          sortInfo.column === "national_id" &&
                          sortInfo.type === "desc"
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
                        onClick={() => toggleSort("asc", "fullName")}
                        className={`text-xs ${
                          sortInfo.column === "fullName" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "fullName")}
                        className={`text-xs ${
                          sortInfo.column === "fullName" &&
                          sortInfo.type === "desc"
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
                        onClick={() => toggleSort("asc", "major")}
                        className={`text-xs ${
                          sortInfo.column === "major" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "major")}
                        className={`text-xs ${
                          sortInfo.column === "major" &&
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
                        onClick={() => toggleSort("asc", "gender")}
                        className={`text-xs ${
                          sortInfo.column === "gender" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "gender")}
                        className={`text-xs ${
                          sortInfo.column === "gender" &&
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
                        onClick={() => toggleSort("asc", "address")}
                        className={`text-xs ${
                          sortInfo.column === "address" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "address")}
                        className={`text-xs ${
                          sortInfo.column === "address" &&
                          sortInfo.type === "desc"
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
                        onClick={() => toggleSort("asc", "email")}
                        className={`text-xs ${
                          sortInfo.column === "email" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "email")}
                        className={`text-xs ${
                          sortInfo.column === "email" &&
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
                        onClick={() => toggleSort("asc", "phone_number")}
                        className={`text-xs ${
                          sortInfo.column === "phone_number" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "phone_number")}
                        className={`text-xs ${
                          sortInfo.column === "phone_number" &&
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
                        onClick={() => toggleSort("asc", "telephone_number")}
                        className={`text-xs ${
                          sortInfo.column === "telephone_number" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "telephone_number")}
                        className={`text-xs ${
                          sortInfo.column === "telephone_number" &&
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
                        onClick={() => toggleSort("asc", "credit_course")}
                        className={`text-xs ${
                          sortInfo.column === "credit_course" &&
                          sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "credit_course")}
                        className={`text-xs ${
                          sortInfo.column === "credit_course" &&
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
                          {index + 1}
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
                        <td className="text-center npm p-3">
                          {item.data.student_id}
                        </td>
                        <td className="text-center nik p-3">
                          {item.data.national_id}
                        </td>
                        <td className="nama p-3">{`${item.data.first_name} ${item.data.last_name}`}</td>
                        <td className="studi p-3">{item.data.major}</td>
                        <td className="ttl p-3">{`${item.data.birth_place} / ${item.data.birth_date}`}</td>
                        <td className="jenis-kelamin p-3">
                          {item.data.gender}
                        </td>
                        <td className="alamat p-3">{item.data.address}</td>
                        <td className="email p-3">{item.data.email}</td>
                        <td className="no-hp p-3">{item.data.phone_number}</td>
                        <td className="no-telp p-3">
                          {item.data.telephone_number}
                        </td>
                        <td className="sks p-3">{item.data.credit_course}</td>
                      </tr>
                      {expandedRows[index] && (
                        <tr>
                          <td colSpan="12" className="p-5">
                            <h5>
                              <strong className="mr-5">IPK</strong>{" "}
                              {item.data.gpa}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Judul Skripsi</strong>{" "}
                              {item.data.thesis_title}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Pembimbing Ilmu</strong>{" "}
                              {item.data.advisor}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Pembimbing Agama</strong>{" "}
                              {item.data.religion_advisor}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-1">Tanggal Lulus</strong>{" "}
                              {item.data.commencement_date}
                            </h5>
                            <hr className="my-2" />
                            <h5>
                              <strong className="mr-5">Aksi</strong>
                              <button
                                onClick={() =>
                                  handleViewStudentDetail(item.data.student_id)
                                }
                                className="bg-[#007bff] ring-2 ring-[#007bff] text-white p-1"
                              >
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
