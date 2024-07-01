import {
  faBars,
  faCircleArrowRight,
  faDownload,
  faExpandArrowsAlt,
  faFile,
  faFileAlt,
  faInfo,
  faSignOutAlt,
  faTimes,
  faUserGraduate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import "../../assets/css/style.css";
import AdminLayout from "../../layout/admin-layout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../config/network";

function DashboardDosen() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { first_name, last_name } = decodedToken;
  const { npm } = decodedToken;
  const [statistic, setStatistic] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchStatistic = async () => {
      const response = await axios.get(
        `${BASE_URL}/lecturer/statistic?nidn=${npm}`
      );

      setStatistic(response.data.data);
    };
    fetchStatistic();
  }, [npm]);

  return (
    <AdminLayout>
      <div className="in-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* konten */}
        <div className="konten dosen p-5">
          <h1 className="text-3xl">Dashboard Dosen</h1>
          <div className="flex justify-between w-full bg-[#007bff] border-[#007bff] text-white px-3 py-5 font-bold mt-5">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
              <h5> Selamat Datang {`${first_name} ${last_name}`}</h5>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <div className="card bg-[#ffc107] rounded">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistic.total_advisor_letter}
                  </h1>
                  <p>Surat Tugas</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
            </div>
            <div className="card bg-[#17a2b8] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistic.total_invitation}
                  </h1>
                  <p>Surat Undangan</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
            </div>
            <div className="card bg-[#28a745] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistic.total_official_report}
                  </h1>
                  <p>Berita Acara</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
            </div>
            <div className="card bg-[#dc3545] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistic.total_examiner_lette}
                  </h1>
                  <p>Surat Tugas Penguji</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)]"
                />
              </div>
            </div>
            <div className="card bg-[#007bff] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistic.student}
                  </h1>
                  <p>Mahasiswa</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardDosen;
