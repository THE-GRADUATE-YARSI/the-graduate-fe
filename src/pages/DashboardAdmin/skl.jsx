import AdminLayout from "../../layout/admin-layout";
import { useCallback, useEffect, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faCheckCircle,
  faEye,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../config/network";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

function SKL() {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNo, setShowNo] = useState(true);
  const [showNPM, setShowNPM] = useState(true);
  const [showNamaMahasiswa, setShowNamaMahasiswa] = useState(true);
  const [ShowProgramStudi, setShowProgramStudi] = useState(true);
  const [ShowTanggalLulus, setShowTanggalLulus] = useState(true);
  const [ShowFile, setShowFile] = useState(true);
  const [showAksi, setShowAksi] = useState(true);
  const [student, setStudent] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmitVerification = useCallback(
    async (npm) => {
      try {
        const result = await Swal.fire({
          title: "Konfirmasi Verifikasi",
          text: "Apakah anda yakin ingin memverifikasi data ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
          await axios
            .patch(`${BASE_URL}/students/${npm}`, {
              verification_skl: "VERIFIED",
            })
            .then(() => {
              Swal.fire("Berhasil", "Berhasil menyetujui data SKL!", "success");

              setTriggerFetch(!triggerFetch);
            });
        }
      } catch (e) {
        Swal.fire("Gagal", `Terjadi kesalahan saat memverifikasi`, "error");
      }
    },
    [triggerFetch]
  );

  const handleSubmitReject = useCallback(
    async (npm) => {
      try {
        const { value: message_skl } = await Swal.fire({
          title: "Tolak Pendaftaran",
          text: "Masukkan alasan penolakan",
          input: "textarea",
          inputPlaceholder: "Masukkan alasan penolakan...",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tolak",
          cancelButtonText: "Batal",
        });

        if (message_skl) {
          await axios
            .patch(`${BASE_URL}/students/${npm}`, {
              verification_skl: "REJECTED",
              message_skl,
            })
            .then(() => {
              Swal.fire(
                "Berhasil",
                "Berhasil menolak pendaftaran!!",
                "success"
              );
              setTriggerFetch(!triggerFetch);
            });
        }
      } catch (e) {
        Swal.fire(
          "Gagal",
          `Terjadi kesalahan saat menolak pendaftaran`,
          "error"
        );
      }
    },
    [triggerFetch]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const waitingVerificationData = response.data.data.filter(
          (item) => item.data.verification_skl === "WAITING_VERIFICATION"
        );

        setStudent(waitingVerificationData);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [token, triggerFetch]);

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
      case "File":
        setShowFile(!ShowFsetShowFile);
        document.querySelectorAll(".file").forEach((elem) => {
          elem.hidden = ShowFile;
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

  const openLink = (link) => {
    if (link) {
      const newWindow = window.open(link, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="konten-persyaratan bg-[#f4f6f9] pt-1 px-3 h-full">
          <h1 className="text-xl my-4">Pengumpulan Persyaratan SKL</h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <h3>Pengumpulan Persyaratan SKL</h3>
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
            <div className="flex mt-3 mb-3 relative">
              {/* <button className="bg-gray-500 rounded-s py-2 px-3 text-white">
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
              </button> */}
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
                      ShowFile
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleColumn("File")}
                  >
                    File
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

                  <th className="p-2 relative file">
                    File
                    <div className="absolute bottom-2 right-2">
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={() => toggleSort("asc", "file")}
                        className={`text-xs ${
                          sortInfo.column === "file" && sortInfo.type === "asc"
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={() => toggleSort("desc", "file")}
                        className={`text-xs ${
                          sortInfo.column === "file" && sortInfo.type === "desc"
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
                {student.length > 0 ? (
                  student.map((item, index) => (
                    <tr key={index}>
                      <td className="no">{index + 1}</td>
                      <td className="text-center npm">
                        {item.data.student_id}
                      </td>
                      <td className="nama">{`${item.data.first_name} ${item.data.last_name}`}</td>
                      <td className="studi">{item.data.major}</td>
                      <td className="File">
                        <div className="flex gap-1 justify-center h-full p-2">
                          <span
                            onClick={() => openLink(item.document.article)}
                            className="items-center bg-blue-400 text-white px-2 py-1 rounded font-medium hover:bg-blue-700 transition-all cursor-pointer text-sm"
                          >
                            Artikel
                          </span>
                          <span
                            onClick={() =>
                              openLink(item.document.validity_sheet)
                            }
                            className="items-center bg-green-500 text-white px-2 py-1 rounded font-medium hover:bg-green-700 transition-all cursor-pointer text-sm"
                          >
                            Lembar Pengesahan
                          </span>
                          <span
                            onClick={() =>
                              openLink(item.document.competency_certificate)
                            }
                            className="items-center bg-yellow-500 text-white px-2 py-1 rounded font-medium hover:bg-yellow-700 transition-all cursor-pointer text-sm"
                          >
                            Sertifikat Kompetensi
                          </span>
                        </div>
                      </td>
                      <td className="aksi">
                        <div className="flex gap-2 justify-center h-full p-2">
                          <span
                            onClick={() =>
                              handleSubmitReject(item.data.student_id)
                            }
                            className="items-center justify-center flex px-3 rounded-md bg-red-500 text-xl font-medium cursor-pointer hover:bg-red-700"
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{ color: "white" }}
                            />
                          </span>
                          <span
                            onClick={() =>
                              handleSubmitVerification(item.data.student_id)
                            }
                            className="items-center justify-center flex px-3 py-2 rounded-md bg-green-500 text-xl cursor-pointer font-medium text-black hover:bg-green-700"
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "white" }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
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
}

export default SKL;
