import {
  faAngleLeft,
  faDownload,
  faFile,
  faFileAlt,
  faFileWaveform,
  faGaugeHigh,
  faTable,
  faTh,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BsCircle } from "react-icons/bs";
// import { NavLink } from "react-router-dom";
import {
  BrowserRouter as Router,
  NavLink,
  useLocation,
} from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Periksa jika lokasi saat ini berada di bawah jalur dropdown
    if (
      location.pathname.startsWith("/admin/dosen") ||
      location.pathname.startsWith("/admin/mahasiswa") ||
      location.pathname.startsWith("/admin/tendik")
    ) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-1/6 px-3 py-4 h-full overflow-y-auto bg-gray-50 transition-transform ${
          isOpen ? "" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <ul className="space-y-2 font-medium">
          <li>
            <div className="flex items-center p-2">
              <img
                src="/images/graduate.png"
                alt="Logo The Graduate"
                className="rounded-full drop-shadow-md w-[40px] bg-white"
              />
              <span className="ms-2 text-black text-xl">The Graduate</span>
            </div>
          </li>
          <li>
            <hr className="mb-3" />
            <span className="text-black font-medium">Tamara Yuniar Asmah</span>
            <hr className="mt-3" />
          </li>
          {location.pathname.startsWith("/admin") ? (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard-admin"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/admin/dashboard-admin"
                      ? "true"
                      : "false"
                  }
                >
                  <FontAwesomeIcon icon={faGaugeHigh} />
                  <span className="ms-3">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center w-full p-2 text-black rounded-lg hover:bg-gray-200 group focus:bg-blue-600 focus:text-white 
                  ${
                    location.pathname.startsWith("/admin/dosen") ||
                    location.pathname.startsWith("/admin/mahasiswa") ||
                    location.pathname.startsWith("/admin/tendik")
                      ? "bg-blue-600 text-white hover:bg-blue-600"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTable} />
                  <span className="ms-3">Master Data</span>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={`ms-auto ${
                      isDropdownOpen ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                </button>
              </li>
              {isDropdownOpen && (
                <div className="transition duration-300">
                  <li>
                    <NavLink
                      to="/admin/dosen"
                      className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group text-gray-500 hover:text-black"
                      current-page={
                        location.pathname === "/admin/dosen" ? "true" : "false"
                      }
                    >
                      <BsCircle />
                      <span className="ms-3">Dosen</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/mahasiswa"
                      className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group text-gray-500 hover:text-black"
                      current-page={
                        location.pathname === "/admin/mahasiswa"
                          ? "true"
                          : "false"
                      }
                    >
                      <BsCircle />
                      <span className="ms-3">Mahasiswa</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/tendik"
                      className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group text-gray-500 hover:text-black"
                      current-page={
                        location.pathname === "/admin/tendik" ? "true" : "false"
                      }
                    >
                      <BsCircle />
                      <span className="ms-3">Tendik</span>
                    </NavLink>
                  </li>
                </div>
              )}
              <li>
                <NavLink
                  to="/admin/berkas"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/admin/berkas" ? "true" : "false"
                  }
                >
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ms-3">Berkas</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={location.pathname === "/" ? "true" : "false"}
                >
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="ms-3">Pendaftaran Masuk</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={location.pathname === "/" ? "true" : "false"}
                >
                  <FontAwesomeIcon icon={faUserGraduate} />
                  <span className="ms-3">Calon Wisudawan</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={location.pathname === "/" ? "true" : "false"}
                >
                  <FontAwesomeIcon icon={faTh} />
                  <span className="ms-3">Persyaratan</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard-mahasiswa"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/dashboard-mahasiswa"
                      ? "true"
                      : "false"
                  }
                >
                  <FontAwesomeIcon icon={faGaugeHigh} />
                  <span className="ms-3">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pendaftaran-wisuda"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/pendaftaran-wisuda"
                      ? "true"
                      : "false"
                  }
                >
                  <FontAwesomeIcon icon={faFileWaveform} />
                  <span className="ms-3">Pendaftaran</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/skl-mahasiswa"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/admin/skl-mahasiswa"
                      ? "true"
                      : "false"
                  }
                >
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ms-3">SKL</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/skl-mahasiswa"
                  className="sidebar-item flex items-center p-2 text-black rounded-lg hover:bg-gray-200 group active:bg-blue-600 active:text-white"
                  current-page={
                    location.pathname === "/skl-mahasiswa" ? "true" : "false"
                  }
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span className="ms-3">Pengambilan Ijazah</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
