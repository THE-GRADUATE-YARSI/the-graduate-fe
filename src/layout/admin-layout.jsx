import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import AdminFooter from "../components/admin-footer";
import {
  faBars,
  faExpandArrowsAlt,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBell } from "react-icons/bs";

const AdminLayout = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    //containernya kusaya hapus bgnya jadi ndak bisa full
    <section>
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`ml-auto konten-utama ${
          isSidebarOpen ? "w-5/6" : "w-[95%]"
        }`}
      >
        {/* navbar */}
        <nav className="bg-white px-8 py-4 flex justify-between relative border-2 border-x-0 border-t-0 border-b-[#dee2e6]">
          <div className="flex items-center relative w-full">
            <button
              onClick={toggleSidebar}
              className="text-black focus:outline-none"
            >
              <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} />
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

        {props.children}
      </div>

      <AdminFooter />
    </section>
  );
};

export default AdminLayout;
