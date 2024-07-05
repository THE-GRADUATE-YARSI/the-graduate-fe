import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsCaretDownFill } from "react-icons/bs";
import {
  faArrowDown,
  faArrowUp,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../../layout/admin-layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/network";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { CSVLink } from "react-csv";
import Search from "../../components/search";

const PendaftaranMasuk = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNo, setShowNo] = useState(true);
  const [showNPM, setShowNPM] = useState(true);
  const [showNamaMahasiswa, setShowNamaMahasiswa] = useState(true);
  const [ShowProgramStudi, setShowProgramStudi] = useState(true);
  const [ShowTanggalLulus, setShowTanggalLulus] = useState(true);
  const [ShowFoto, setShowFoto] = useState(true);
  const [showAksi, setShowAksi] = useState(true);
  const [student, setStudent] = useState([]);
  const [semester, setSemester] = useState([]);
  const tableRef = useRef(null);

  const csvData = student.map((item, index) => ({
    No: index + 1,
    NPM: item.data.student_id,
    "Nama Mahasiswa": item.data.first_name + item.data.last_name,
    "Program Studi": item.data.major,
  }));

  const headers = [
    { label: "No", key: "No" },
    { label: "NPM", key: "NPM" },
    { label: "Nama Mahasiswa", key: "Nama Mahasiswa" },
    { label: "Program Studi", key: "Program Studi" },
  ];

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: tableRef.current });
    doc.save("students.pdf");
  };

  const handleCopy = () => {
    const range = document.createRange();
    range.selectNode(tableRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/semester/list`);
        console.log(response.data.data)

        if (response.data.data === null) return;
        setSemester(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    fetchData();
  }, []);

  const [selectedYear, setSelectedYear] = useState("default");
  const [query, setQuery] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  
  useEffect(() => {
    const controller = new AbortController();
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students?name=${query}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal
        });

        if(!response.data.data) setStudent([])
  
        setStudent(response.data.data.filter(student => student.data.verification === "NOT_VERIFIED"));
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.log("Error fetching data:", error.message);
        }
      }
    };
  
    const timeoutId = setTimeout(fetchData, 300); // Menambahkan delay 300ms
  
    return function () {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    console.log("Query changed:", query);
    console.log("Filtered students:", student);
  }, [query, student]);

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

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleViewStudentDetail = (studentId) => {
    navigate(`/admin/pendaftaran/mahasiswa/${studentId}`);
  };

  const filteredData =
  selectedYear === "default"
    ? student || []
    : (student &&
        student.filter(
          (item) => {const [year, semester] = selectedYear.split('-');
            return item.data.academic_year === year && item.data.semester === semester;}
        )) ||
      [];

      const handlePrint = () => {
        const printWindow = window.open("", "_blank");
    
        const tableHTML = `
                <table>
                  <thead>
                    <tr>
                      <th>NPM</th>
                      <th>Nama</th>
                      <th>Program Studi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${filteredData
                      .map(
                        (student) => `
                      <tr>
                        <td>${student.data.student_id}</td>
                        <td>${student.data.first_name} ${student.data.last_name}</td>
                        <td>${student.data.major}</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              `;
    
        printWindow.document.write(`
                <html>
                  <head>
                    <title>Print</title>
                    <style>
                      table { 
                        border-collapse: collapse; 
                        width: 100%; 
                      }
                      th, td { 
                        border: 1px solid black; 
                        padding: 8px; 
                        text-align: left; 
                      }
                    </style>
                  </head>
                  <body>
                    ${tableHTML}
                  </body>
                </html>
              `);
    
        printWindow.document.close();
        printWindow.print();
      };

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="konten-persyaratan bg-[#f4f6f9] pt-1 px-3 h-full">
          <h1 className="text-xl my-4">Pendaftaran Masuk</h1>
   
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <div className="p-2 flex justify-between items-center">
            <h3>Pendaftaran Masuk</h3>
            <select
                value={selectedYear}
                onChange={handleYearChange}
                className="bg-white border-2 p-2 rounded-lg border-gray-400"
              >
                <option value="default">--Pilih Tahun Akademik--</option>
                {semester.map((data) => (
                  <option 
                    key={`${data.academic_year}-${data.semester}`} 
                  value={`${data.academic_year}-${data.semester}`}>
                    Tahun Akademik {data.academic_year} Semester {data.semester}{" "}
                    {data.status === "AKTIF" && "(Aktif)"}
                  </option>
                ))}
              </select>
              </div>
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
                <Search query={query} setQuery={setQuery} />
              </div>
            </div>
            <div className="flex mt-3 relative">
              <button onClick={handleCopy} className="bg-gray-500 rounded-s py-2 px-3 text-white">
                Copy
              </button>
              <button className="bg-gray-500  py-2 px-3 text-white"><CSVLink
                    headers={headers}
                    data={csvData}
                    filename="students.csv"
                  >
                    CSV
                  </CSVLink></button>
              <button className="bg-gray-500  py-2 px-3 text-white">
              <DownloadTableExcel
                    filename="mahasiswa table"
                    sheet="mahasiswa"
                    currentTableRef={tableRef.current}
                  >
                    Excel
                  </DownloadTableExcel>
              </button>
              <button className="bg-gray-500  py-2 px-3 text-white" onClick={handlePDF}>PDF</button>
              <button className="bg-gray-500  py-2 px-3 text-white" onClick={handlePrint}>
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
            <table ref={tableRef} className="table-auto w-full tabel-costum">
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
                  <th className="p-2 relative nama">
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
                    Prodi
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
                    Tanggal Lulus
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
                    Foto
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
                  <th className="p-2 relative aksi">
                    Aksi
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "aksi")}
                        className={`text-xs ${
                          sortInfo.column === "aksi" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "aksi")}
                        className={`text-xs ${
                          sortInfo.column === "aksi" && sortInfo.type === "desc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ?  (
                  filteredData.map(
                    (item, index) =>
                      item.data.verification === "NOT_VERIFIED" && (
                        <tr key={index}>
                          <td className="no">{index + 1}</td>
                          <td className="text-center npm">
                            {item.data.student_id}
                          </td>
                          <td className="nama">{`${item.data.first_name} ${item.data.last_name}`}</td>
                          <td className="studi">{item.data.major}</td>
                          <td className="tgl-lulus">
                            {item.data.commencement_date}
                          </td>
                          <td className="foto">
                            <img
                              src={item.document.photo}
                              alt="foto"
                              className="w-[150px] h-[200px] border-4 border-black"
                            />
                          </td>
                          <td className="aksi">
                            <div className="flex gap-1 justify-center h-full p-2">
                              <span
                                className="items-center bg-blue-400 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-all cursor-pointer"
                                onClick={() =>
                                  handleViewStudentDetail(item.data.student_id)
                                }
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                  )
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-3">
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



export default PendaftaranMasuk;
