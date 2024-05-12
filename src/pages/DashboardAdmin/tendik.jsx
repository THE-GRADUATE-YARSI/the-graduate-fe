import { useState } from "react";
import "../../assets/css/style.css";
import {
  faBars,
  faTimes,
  faExpandArrowsAlt,
  faSignOutAlt,
  faPencilAlt,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell, BsCaretDownFill } from "react-icons/bs";
import AdminLayout from "../../layout/admin-layout";

function Tendik() {
  const [collapsed, setCollapsed] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      nama: "Tendik A",
      username: "admin",
      password: "7110eda4d09e062aa5e4a390b0a572ac0d2c0220",
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
    <AdminLayout>
      <div className="w-5/6 h-[93vh] ml-auto">
        {/* navbar */}
        <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
          <div className="flex items-center relative w-full">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-black focus:outline-none"
            >
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
            <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">
              Tendik
            </h1>
          </div>
          <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
            <div className="p-5 flex">
              <h5 className="text-md text-medium">Tendik</h5>
              <button className="text-white bg-[#0069d9] px-2 py-1 rounded text-xs ml-auto">
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Tambah
              </button>
            </div>
            <hr />
            <div className="p-5">
              <table className="table-auto w-full tabel-costum">
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
                      Nama Tendik
                      <div className="absolute bottom-2 right-2">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          onClick={() => toggleSort("asc", "nidn")}
                          className={`text-xs ${
                            sortInfo.column === "nidn" &&
                            sortInfo.type === "asc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          onClick={() => toggleSort("desc", "nidn")}
                          className={`text-xs ${
                            sortInfo.column === "nidn" &&
                            sortInfo.type === "desc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                    <th className="p-2 relative">
                      Username
                      <div className="absolute bottom-2 right-2">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          onClick={() => toggleSort("asc", "nidn")}
                          className={`text-xs ${
                            sortInfo.column === "nidn" &&
                            sortInfo.type === "asc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          onClick={() => toggleSort("desc", "nidn")}
                          className={`text-xs ${
                            sortInfo.column === "nidn" &&
                            sortInfo.type === "desc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                    <th className="p-2 relative">
                      Password
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
                      Aksi
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
                      <td className="text-center">{item.id}</td>
                      <td className="text-center">{item.nama}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>
                        <div className="flex gap-1 justify-center h-full p-2">
                          <span className="items-center bg-[#ffc107] px-2 py-1 rounded text-xs font-medium text-black ring-1 ring-inset ring-[#ffc107]">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </span>
                          <span className="items-center bg-[#dc3545] px-2 py-1 rounded text-xs font-medium text-white ring-1 ring-inset ring-[#dc3545]">
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </div>
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

export default Tendik;
