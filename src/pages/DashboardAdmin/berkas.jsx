import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import MainLayouts from "../../layout";
import "../../assets/css/style.css";
import {
  faBars,
  faTimes,
  faExpandArrowsAlt,
  faSignOutAlt,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell, BsCaretDownFill } from "react-icons/bs";
import AdminFooter from "../../components/admin-footer";
import AdminLayout from "../../layout/admin-layout";
import { BASE_URL } from "../../config/network";
import axios from "axios";
import Modal from "../../components/modal";
import { openLink } from "../../utils/helpers";
import Swal from "sweetalert2";
import Search from "../../components/search";

function Berkas() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [semester, setSemester] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/semester/list`);

        if (response.data.data === null) return;
        setSemester(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  const handleOpenModal = (item, student) => {
    setSelectedItem(item);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setSelectedStudent(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [data, setData] = useState([]);
  const [sortInfo, setSortInfo] = useState({ column: "id", type: "asc" });
  const [selectedYear, setSelectedYear] = useState("default");

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

  const items = [
    {
      name: "Berita Acara",
      condition: "Berita Acara",
      endPoint: "/admin/docs/offreport",
      body: "official_report",
    },
    {
      name: "Undangan",
      condition: "Undangan",
      endPoint: "/admin/docs/invitation",
      body: "invitation",
    },
    {
      name: "Surat Tugas",
      condition: "Surat Tugas",
      endPoint: "/admin/docs/examinerletter",
      body: "examiner_letter",
    },
    {
      name: "SKL",
      condition: "SKL",
      endPoint: "/admin/docs/tempgrad",
      body: "temp_grad",
    },
    {
      name: "Surat Tugas Penguji",
      condition: "Surat Tugas Penguji",
      endPoint: "/admin/docs/advisorletter",
      body: "advisor_letter",
    },
  ];

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    icon: "success",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const [triggerFetch, setTriggerFetch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitDocument = async (e, nidn, npm) => {
    e.preventDefault();

    if (!file) {
      return alert("Mohon pilih file terlebih dahulu.");
    }

    setIsLoading(true); // Set isLoading to true before making the API request

    const formData = new FormData();
    formData.append(selectedItem.body, file);
    formData.append("nidn", nidn);
    formData.append("npm", npm);

    try {
      await axios
        .patch(BASE_URL + selectedItem.endPoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async () => {
          Toast.fire({
            icon: "success",
            title: "Berkas berhasil diupload!",
          });
          await setTriggerFetch(!triggerFetch);
          setFile(null);
          handleCloseModal();
        });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mengunggah file!",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecturer/document/list?name=${query}`, {
          signal: controller.signal
        });

        if(!response.data.data) setData([])

        setData(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    const timeoutId = setTimeout(fetchData, 300); // Menambahkan delay 300ms

    return function () {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredData =
  selectedYear === "default"
    ? data || []
    : (data &&
        data.filter(
          (item) => {const [year, semester] = selectedYear.split('-');
            return item.student.academic_year === year && item.student.semester === semester;}
        )) ||
      [];

  return (
    <AdminLayout isSidebarOpen={isSidebarOpen}>
      <div className={`min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10 `}>
        <div className="berkas p-5 bg-[#f4f6f9] h-full ">
          <div className="judul">
            <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">
              Berkas
            </h1>
          </div>
          <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
            <div className="p-5 flex justify-between">
              <h5 className="text-md text-medium">Berkas</h5>
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
            <hr />
            <div className="p-5">
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
              <table className="table-auto w-full tabel-costum mt-5">
                <thead>
                  <tr className="text-center">
                    <th className="p-2 w-[5%] relative">
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
                    <th className="p-2 relative">
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
                    <th className="p-2 relative">
                      Nama Mahasiswa
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
                    <th className="p-2 relative">
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
                    <th className="p-2 relative">
                      Berkas
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
                    <th className="p-2 relative">
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
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? filteredData.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student.student.student_id}</td>
                      <td>{`${student.student.first_name} ${student.student.last_name}`}</td>
                      <td>{student.student.major}</td>
                      <td className="flex gap-1 justify-center h-full p-3">
                        <span
                          className={`items-center bg-[#1e7e34] hover:bg-[#1e7e34c0] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#1c7430] ${
                            student.document.official_report
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() =>
                            openLink(student.document.official_report)
                          }
                        >
                          Berita Acara
                        </span>
                        <span
                          className={`items-center bg-[#007bff] hover:bg-[#007bff83] ${
                            student.document.invitation
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#007bff]`}
                          onClick={() => openLink(student.document.invitation)}
                        >
                          Undangan
                        </span>
                        <span
                          className={`items-center bg-[#17a2b8] hover:bg-[#17a3b89a] ${
                            student.document.examiner_assignment_letter
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          } px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#17a2b8]`}
                          onClick={() =>
                            openLink(
                              student.document.examiner_assignment_letter
                            )
                          }
                        >
                          Surat Tugas
                        </span>
                        <span
                          className={`items-center bg-[#ffc107] hover:bg-[#ffc10798] ${
                            student.document.temp_grad
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          } px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-[#ffc107]`}
                          onClick={() => openLink(student.document.temp_grad)}
                        >
                          SKL
                        </span>
                        <span
                          className={`items-center bg-[#dc3545] hover:bg-[#dc3546b7] ${
                            student.document.advisor_assignment_letter
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#dc3545]`}
                          onClick={() =>
                            openLink(student.document.advisor_assignment_letter)
                          }
                        >
                          Surat Tugas Penguji
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center p-2 mx-auto text-xs text-white rounded bg-[#17a2b8] hover:bg-[#138496] group ring-1 ring-inset ring-[#17a2b8] hover:ring-[#117a8b]"
                        >
                          <span>Upload</span>
                          <BsCaretDownFill className="ml-3" />
                        </button>
                        {dropdownIndex === index && (
                          <div className="transition duration-300 absolute bg-white shadow-lg border rounded translate-x-[-36%]">
                            {items
                              .filter((item) => {
                                if (item.name === "SKL") {
                                  return (
                                    student.student.verification_skl !==
                                    "NOT_VERIFIED"
                                  );
                                }
                                return true;
                              })
                              .map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() =>
                                    handleOpenModal(item, student.student)
                                  }
                                  className="p-2 w-full text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                                >
                                  {item.name}
                                </button>
                              ))}
                          </div>
                        )}
                        {showModal && (
                          <Modal
                            show={showModal}
                            title="Dokumen Persyaratan"
                            isLoading={isLoading}
                            onClosed={handleCloseModal}
                            onSave={(e) => {
                              handleSubmitDocument(
                                e,
                                selectedStudent.nidn_advisor_one,
                                selectedStudent.student_id
                              );
                            }}
                          >
                            <div className="w-[35rem] flex flex-col gap-4 justify-start items-start">
                              <h1 className="text-black font-bold text-lg">
                                {selectedItem?.condition}
                              </h1>
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="bg-white border-2 border-gray-300 rounded p-2 w-full"
                              />
                            </div>
                          </Modal>
                        )}
                      </td>
                    </tr>
                  )) : <tr>
                  <td colSpan={7} className="text-center p-3">
                    Data Kosong
                  </td>
                </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Berkas;
