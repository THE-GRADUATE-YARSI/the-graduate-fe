import { faArrowDown, faArrowUp, faBars, faExpandArrowsAlt, faPrint, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { BsBell, BsCaretDownFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "../../assets/css/style.css";
import AdminLayout from "../../layout/admin-layout";

function SertifikatKompetensi() {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showNo, setShowNo] = useState(true);
    const [showNPM, setShowNPM] = useState(true);
    const [showNamaMahasiswa, setShowNamaMahasiswa] = useState(true);
    const [ShowProgramStudi, setShowProgramStudi] = useState(true);
    const [showBerkas, setShowBerkas] = useState(true);

    const toggleDropdownColumn = () => {
        setIsOpen(!isOpen);
    };

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
            case "Berkas":
                setShowAksi(!showBerkas);
                document.querySelectorAll(".berkas").forEach((elem) => {
                    elem.hidden = showBerkas;
                });
                break;
            default:
                break;
        }
    };

    console.log(sortInfo);
    return (
        <AdminLayout>
            <div className="in-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
                {/* berkas */}
                <div className="berkas p-5 bg-[#f4f6f9] h-full  ">
                    <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
                        <div className="p-5">
                            <div className="flex items-center justify-between">
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
                                <div className="flex items-center">
                                    <h5 className="text-md">Search:</h5>
                                    <input type="search" className="py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-sm sm:text-sm focus:ring-1 ms-1" />
                                </div>
                            </div>
                            <div className="flex mt-3 relative">
                                <button className="bg-gray-500 rounded-s py-2 px-3 text-white">Copy</button>
                                <button className="bg-gray-500  py-2 px-3 text-white">CSV</button>
                                <button className="bg-gray-500  py-2 px-3 text-white">Excel</button>
                                <button className="bg-gray-500  py-2 px-3 text-white">PDF</button>
                                <button className="bg-gray-500  py-2 px-3 text-white">Print</button>
                                <button className="bg-gray-500 rounded-e py-2 px-3 text-white flex justify-center items-center" onClick={toggleDropdownColumn}>
                                    Column Visibility
                                    <BsCaretDownFill className="ml-2 text-xs" />
                                </button>
                                {isOpen && (
                                    <div className="absolute left-[20%] z-50 top-7 mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <button className={`block w-full px-4 py-2 text-sm ${showNo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => toggleColumn("No")}>
                                            No
                                        </button>
                                        <button className={`block w-full px-4 py-2 text-sm ${showNPM ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => toggleColumn("NPM")}>
                                            NPM
                                        </button>
                                        <button className={`block w-full px-4 py-2 text-sm ${showNamaMahasiswa ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => toggleColumn("Nama Mahasiswa")}>
                                            Nama Mahasiswa
                                        </button>
                                        <button className={`block w-full px-4 py-2 text-sm ${ShowProgramStudi ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => toggleColumn("Program Studi")}>
                                            Program Studi
                                        </button>
                                        <button className={`block w-full px-4 py-2 text-sm ${showBerkas ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => toggleColumn("Berkas")}>
                                            Berkas
                                        </button>
                                    </div>
                                )}
                            </div>
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
                                                <button onClick={() => toggleDropdown(index)} className="flex items-center px-1 py-2 mx-auto text-xs text-white rounded bg-[#dc3545] hover:bg-[#dc3546cc] group ring-1 ring-inset ring-[#dc3545] hover:ring-[#dc3545]">
                                                    <FontAwesomeIcon icon={faPrint} className="me-1" />
                                                    <span>File Sertifikat</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between my-3">
                                <span>Showing 0 to 0 of 0 entries</span>
                                <div className="flex items-center">
                                    <button className="py-1 px-2 border-[#dee2e6] border-2 rounded-sm">Previous</button>
                                    <button className="py-1 px-2 border-[#dee2e6] border-2 border-s-0 rounded-sm">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default SertifikatKompetensi;
