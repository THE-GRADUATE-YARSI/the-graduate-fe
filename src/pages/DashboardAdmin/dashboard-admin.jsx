import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faExpandArrowsAlt,
  faSignOutAlt,
  faDownload,
  faCircleArrowRight,
  faUsers,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/sidebar";
import MainLayouts from "../../layout";
import "../../assets/css/style.css";
import { BsBell } from "react-icons/bs";
import { useState } from "react";
import AdminFooter from "../../components/admin-footer";
import AdminLayout from "../../layout/admin-layout";

function DashboardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
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

        {/* konten */}
        <div className="konten admin p-5">
          <h1 className="text-3xl">Dashboard Staf</h1>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="card bg-[#ffc107] rounded">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">0</h1>
                  <p>Pendaftaran Masuk</p>
                </div>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full">
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#17a2b8] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">212</h1>
                  <p>Mahasiswa</p>
                </div>
                <FontAwesomeIcon
                  icon={faUsers}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full">
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#28a745] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">138</h1>
                  <p>Wisudawan</p>
                </div>
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full">
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#dc3545] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">24</h1>
                  <p>Dosen</p>
                </div>
                {/* <FontAwesomeIcon
                  icon={faDownload}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)]"
                /> */}
              </div>
              <button className="bg-black/[.1] p-1 w-full">
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardAdmin;
