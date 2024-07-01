import { useEffect, useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../config/network";
import { jwtDecode } from "jwt-decode";
import { openLink } from "../../utils/helpers";

function BerkasDosen() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { npm } = decodedToken;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/lecturer/document/list?nidn${npm}`
        );

        const filteredData = response.data.data.filter((item) => {
          const { document } = item;
          return (
            document.official_report &&
            document.temp_grad &&
            document.invitation &&
            document.advisor_assignment_letter
          );
        });

        setData(filteredData);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    fetchData();
  }, [npm]);

  const toggleDropdown = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  //   const [data, setData] = useState([
  //     {
  //       id: 1,
  //       npm: "1502019002",
  //       nama: "Afifah Nurhayati",
  //       prodi: "Perpustakaan dan Sains Informasi (PdSI)",
  //     },
  //     {
  //       id: 2,
  //       npm: "1502019004",
  //       nama: "Aliifah Putri Pravity",
  //       prodi: "Perpustakaan dan Sains Informasi (PdSI)",
  //     },
  //     {
  //       id: 3,
  //       npm: "1502019001",
  //       nama: "Adinda Triani Septianti",
  //       prodi: "Perpustakaan dan Sains Informasi (PdSI)",
  //     },
  //   ]);

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
      // Perbarui sortInfo dengan kolom dan tipe pengurutan yang baru
      setSortInfo({ column, type: "desc" });
    }
    setData(newData);
  };

  // Fungsi untuk mengurutkan data berdasarkan tipe pengurutan dan kolom yang dipilih
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

  console.log(sortInfo);
  return (
    <AdminLayout>
      <div className="in-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* berkas */}
        <div className="berkas p-5 bg-[#f4f6f9] h-full">
          <div className="judul">
            <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">
              Berkas
            </h1>
          </div>
          <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
            <div className="p-5">
              <h5 className="text-md text-medium">Berkas</h5>
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
                  </tr>
                </thead>
                <tbody>
                  {sortedData().map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.student.student_id}</td>
                      <td>{`${item.student.first_name} ${item.student.last_name}`}</td>
                      <td>{item.student.major}</td>
                      <td className="flex gap-1 justify-center h-full p-3">
                        <span
                          className={`items-center bg-[#1e7e34] hover:bg-[#1e7e34c0] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#1c7430] ${
                            item.document.official_report
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() =>
                            openLink(item.document.official_report)
                          }
                        >
                          Berita Acara
                        </span>
                        <span
                          className={`items-center bg-[#007bff] hover:bg-[#007bff83] ${
                            item.document.invitation
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#007bff]`}
                          onClick={() => openLink(item.document.invitation)}
                        >
                          Undangan
                        </span>
                        <span
                          className={`items-center bg-[#17a2b8] hover:bg-[#17a3b89a] ${
                            item.document.examiner_assignment_letter
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          } px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#17a2b8]`}
                          onClick={() =>
                            openLink(item.document.examiner_assignment_letter)
                          }
                        >
                          Surat Tugas
                        </span>
                        <span
                          className={`items-center bg-[#ffc107] hover:bg-[#ffc10798] ${
                            item.document.temp_grad
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          } px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-[#ffc107]`}
                          onClick={() => openLink(item.document.temp_grad)}
                        >
                          SKL
                        </span>
                        <span
                          className={`items-center bg-[#dc3545] hover:bg-[#dc3546b7] ${
                            item.document.advisor_assignment_letter
                              ? "cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          }  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#dc3545]`}
                          onClick={() =>
                            openLink(item.document.advisor_assignment_letter)
                          }
                        >
                          Surat Tugas Penguji
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default BerkasDosen;
