import { useState } from "react";
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

function Berkas() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDropdown = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  const [data, setData] = useState([
    {
      id: 1,
      npm: "1502019002",
      nama: "Afifah Nurhayati",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 2,
      npm: "1502019004",
      nama: "Aliifah Putri Pravity",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 3,
      npm: "1502019001",
      nama: "Adinda Triani Septianti",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 4,
      npm: "1502019002",
      nama: "Afifah Nurhayati",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 5,
      npm: "1502019004",
      nama: "Aliifah Putri Pravity",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 6,
      npm: "1502019001",
      nama: "Adinda Triani Septianti",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 7,
      npm: "1502019002",
      nama: "Afifah Nurhayati",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 8,
      npm: "1502019004",
      nama: "Aliifah Putri Pravity",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 9,
      npm: "1502019001",
      nama: "Adinda Triani Septianti",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 10,
      npm: "1502019002",
      nama: "Afifah Nurhayati",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 11,
      npm: "1502019004",
      nama: "Aliifah Putri Pravity",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
    {
      id: 12,
      npm: "1502019001",
      nama: "Adinda Triani Septianti",
      prodi: "Perpustakaan dan Sains Informasi (PdSI)",
    },
  ]);

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

  return (
    <AdminLayout isSidebarOpen={isSidebarOpen}>
      <div className={`min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10 `}>
        {/* berkas */}
        <div className="berkas p-5 bg-[#f4f6f9] h-full ">
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
                  {sortedData().map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.npm}</td>
                      <td>{item.nama}</td>
                      <td>{item.prodi}</td>
                      <td className="flex gap-1 justify-center h-full p-3">
                        <span className="items-center bg-[#1e7e34] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#1c7430]">
                          Berita Acara
                        </span>
                        <span className="items-center bg-[#007bff] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#007bff]">
                          Undangan
                        </span>
                        <span className="items-center bg-[#17a2b8] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#17a2b8]">
                          Surat Tugas
                        </span>
                        <span className="items-center bg-[#ffc107] px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-[#ffc107]">
                          SKL
                        </span>
                        <span className="items-center bg-[#dc3545] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#dc3545]">
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
                            <NavLink
                              to="/dashboard-mahasiswa"
                              className="flex items-center p-2 text-black text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                            >
                              <span>Berita Acara</span>
                            </NavLink>
                            <NavLink
                              to="/dashboard-mahasiswa"
                              className="flex items-center p-2 text-black text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                            >
                              <span>Undangan</span>
                            </NavLink>
                            <NavLink
                              to="/dashboard-mahasiswa"
                              className="flex items-center p-2 text-black text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                            >
                              <span>Surat Tugas</span>
                            </NavLink>
                            <NavLink
                              to="/dashboard-mahasiswa"
                              className="flex items-center p-2 text-black text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                            >
                              <span>SKL</span>
                            </NavLink>
                            <NavLink
                              to="/dashboard-mahasiswa"
                              className="flex items-center p-2 text-black text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black"
                            >
                              <span>Surat Tugas Penguji</span>
                            </NavLink>
                          </div>
                        )}
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

export default Berkas;
