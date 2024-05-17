import { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import MainLayouts from "../../layout";
import "../../assets/css/style.css";
import { faBars, faTimes, faExpandArrowsAlt, faSignOutAlt, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell, BsCaretDownFill } from "react-icons/bs";
import AdminFooter from "../../components/admin-footer";
import AdminLayout from "../../layout/admin-layout";

function BerkasDosen() {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState(null);

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

    console.log(sortInfo);
    return (
        <AdminLayout>
            <div className="w-5/6 h-[93vh] ml-auto">
                {/* navbar */}
                <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
                    <div className="flex items-center relative w-full">
                        <button onClick={() => setCollapsed(!collapsed)} className="text-black focus:outline-none">
                            <FontAwesomeIcon icon={collapsed ? faTimes : faBars} />
                        </button>
                        <div className="relative ml-auto ">
                            <BsBell className="text-slate-600" />

                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="mx-8 text-slate-600">
                            <FontAwesomeIcon icon={faExpandArrowsAlt} />
                        </div>
                        <a href="" className="text-slate-600">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                            Logout
                        </a>
                    </div>
                </nav>

                {/* berkas */}
                <div className="berkas p-5 bg-[#f4f6f9] h-full">
                    <div className="judul">
                        <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">Berkas</h1>
                    </div>
                    <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
                        <div className="p-5">
                            <h5 className="text-md text-medium">Berkas</h5>
                        </div>
                        <hr />
                        <div className="p-5">
                            <h5 className="text-md">
                                show
                                <select name="show-entries" id="show-entries" className="bg-white border-2 border-[#ced4da] focus:border-[#ced4da] text-xs outline-none p-2 mx-2">
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
                                                <FontAwesomeIcon icon={faArrowUp} onClick={() => toggleSort("asc", "id")} className={`text-xs ${sortInfo.column === "id" && sortInfo.type === "asc" ? "text-black" : "text-gray-400"}`} />
                                                <FontAwesomeIcon icon={faArrowDown} onClick={() => toggleSort("desc", "id")} className={`text-xs ${sortInfo.column === "id" && sortInfo.type === "desc" ? "text-black" : "text-gray-400"}`} />
                                            </div>
                                        </th>
                                        <th className="p-2 relative">
                                            NPM
                                            <div className="absolute bottom-2 right-2">
                                                <FontAwesomeIcon icon={faArrowUp} onClick={() => toggleSort("asc", "npm")} className={`text-xs ${sortInfo.column === "npm" && sortInfo.type === "asc" ? "text-black" : "text-gray-400"}`} />
                                                <FontAwesomeIcon icon={faArrowDown} onClick={() => toggleSort("desc", "npm")} className={`text-xs ${sortInfo.column === "npm" && sortInfo.type === "desc" ? "text-black" : "text-gray-400"}`} />
                                            </div>
                                        </th>
                                        <th className="p-2 relative">
                                            Nama Mahasiswa
                                            <div className="absolute bottom-2 right-2">
                                                <FontAwesomeIcon icon={faArrowUp} onClick={() => toggleSort("asc", "nama")} className={`text-xs ${sortInfo.column === "nama" && sortInfo.type === "asc" ? "text-black" : "text-gray-400"}`} />
                                                <FontAwesomeIcon icon={faArrowDown} onClick={() => toggleSort("desc", "nama")} className={`text-xs ${sortInfo.column === "nama" && sortInfo.type === "desc" ? "text-black" : "text-gray-400"}`} />
                                            </div>
                                        </th>
                                        <th className="p-2 relative">
                                            Program Studi
                                            <div className="absolute bottom-2 right-2">
                                                <FontAwesomeIcon icon={faArrowUp} onClick={() => toggleSort("asc", "prodi")} className={`text-xs ${sortInfo.column === "prodi" && sortInfo.type === "asc" ? "text-black" : "text-gray-400"}`} />
                                                <FontAwesomeIcon icon={faArrowDown} onClick={() => toggleSort("desc", "prodi")} className={`text-xs ${sortInfo.column === "prodi" && sortInfo.type === "desc" ? "text-black" : "text-gray-400"}`} />
                                            </div>
                                        </th>
                                        <th className="p-2 relative">
                                            Berkas
                                            <div className="absolute bottom-2 right-2">
                                                <FontAwesomeIcon icon={faArrowUp} onClick={() => toggleSort("asc", "id")} className={`text-xs ${sortInfo.column === "id" && sortInfo.type === "asc" ? "text-black" : "text-gray-400"}`} />
                                                <FontAwesomeIcon icon={faArrowDown} onClick={() => toggleSort("desc", "id")} className={`text-xs ${sortInfo.column === "id" && sortInfo.type === "desc" ? "text-black" : "text-gray-400"}`} />
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
                                            <td>
                                                <button onClick={() => toggleDropdown(index)} className="flex items-center p-2 mx-auto text-xs text-white rounded bg-[#17a2b8] hover:bg-[#138496] group ring-1 ring-inset ring-[#17a2b8] hover:ring-[#117a8b]">
                                                    <span>Upload</span>
                                                    <BsCaretDownFill className="ml-3" />
                                                </button>
                                                {dropdownIndex === index && (
                                                    <div className="transition duration-300 absolute bg-white shadow-lg border rounded translate-x-[-36%]">
                                                        <NavLink to="/dashboard-mahasiswa" className="flex items-center p-2 text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black">
                                                            <span>Berita Acara</span>
                                                        </NavLink>
                                                        <NavLink to="/dashboard-mahasiswa" className="flex items-center p-2 text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black">
                                                            <span>Undangan</span>
                                                        </NavLink>
                                                        <NavLink to="/dashboard-mahasiswa" className="flex items-center p-2 text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black">
                                                            <span>Surat Tugas</span>
                                                        </NavLink>
                                                        <NavLink to="/dashboard-mahasiswa" className="flex items-center p-2 text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black">
                                                            <span>SKL</span>
                                                        </NavLink>
                                                        <NavLink to="/dashboard-mahasiswa" className="flex items-center p-2 text-sm rounded hover:bg-gray-200 group text-gray-500 hover:text-black">
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

export default BerkasDosen;
