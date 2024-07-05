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
import { useEffect, useState } from "react";
import AdminFooter from "../../components/admin-footer";
import AdminLayout from "../../layout/admin-layout";
import axios from "axios";
import { BASE_URL } from "../../config/network";
import { useNavigate } from 'react-router-dom';

function DashboardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [lecturer, setlecturer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students/statistic`);
        setStatistics(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecturer/statistic`);
        setlecturer(response.data.data.total_lecturer);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* konten */}
        <div className="konten admin p-5">
          <h1 className="text-3xl">Dashboard Staf</h1>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="card bg-[#ffc107] rounded">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistics.count_not_verified}
                  </h1>
                  <p>Pendaftaran Masuk</p>
                </div>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full" onClick={() => navigate('/admin/pendaftaran')}>
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#17a2b8] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistics.count_not_registed +
                      statistics.count_not_verified +
                      statistics.count_verif}
                  </h1>
                  <p>Mahasiswa</p>
                </div>
                <FontAwesomeIcon
                  icon={faUsers}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full" onClick={() => navigate('/admin/mahasiswa')}>
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#28a745] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">
                    {statistics.count_verif}
                  </h1>
                  <p>Wisudawan</p>
                </div>
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)] icon"
                />
              </div>
              <button className="bg-black/[.1] p-1 w-full" onClick={( ) => navigate('/admin/calon-wisuda')}>
                More Info <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
            <div className="card bg-[#dc3545] rounded text-white">
              <div className="flex p-5">
                <div className="text">
                  <h1 className="text-3xl mb-3 font-bold">{lecturer}</h1>
                  <p>Dosen</p>
                </div>
                {/* <FontAwesomeIcon
                  icon={faDownload}
                  className="ml-auto text-7xl text-[rgba(0,0,0,.15)]"
                /> */}
              </div>
              <button className="bg-black/[.1] p-1 w-full" onClick={() => navigate('/admin/dosen')}>
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
