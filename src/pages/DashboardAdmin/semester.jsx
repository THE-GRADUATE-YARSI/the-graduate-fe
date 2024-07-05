import { useEffect, useState } from "react";
import "../../assets/css/style.css";
import {
  faPencilAlt,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminLayout from "../../layout/admin-layout";
import Modal from "../../components/modal";
import { TextField } from "@mui/material";
import { BASE_URL } from "../../config/network";
import axios from "axios";
import Swal from "sweetalert2";

function Semester() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [semester, setSemester] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [nidn, setNidn] = useState("");
  const [semesterData, setSemesterData] = useState({
    academic_year: "",
    semester: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    icon: "success",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleChange = (e) => {
    setSemesterData({
      ...semesterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalUpdate = () => {
    setShowModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };

  const [data, setData] = useState([
    {
      id: 1,
      nidn: "0314097003",
      nama: "Elan Suherlan, M.Si",
    },
    {
      id: 2,
      nidn: "0319048701",
      nama: "Chandra Prasetyo Utomo,S.Kom., M.Sc",
    },
    {
      id: 3,
      nidn: "0319028501",
      nama: "Andreas Febrian,S.Kom, M.Kom., PhD",
    },
  ]);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmitSemester = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${BASE_URL}/semester/create`, {
          academic_year: semesterData.academic_year,
          semester: semesterData.semester,
        })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Berhasil menambah data semester!",
          });
          setTriggerFetch(!triggerFetch);
          handleCloseModal();
        });

      setSemesterData({
        academic_year: "",
        semester: "",
      });
    } catch (e) {
      console.log(e);
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan saat menambahkan data semester!",
      });
    }
  };

  const handleDeleteSemester = async (e, id) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Verifikasi",
        text: "Apakah Anda yakin ingin menghapus data semester ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/semester/${id}`).then(() => {
          Toast.fire({
            icon: "success",
            title: "Berhasil menghapus data semester!",
          });
          setTriggerFetch(!triggerFetch);
          handleCloseModalUpdate();
        });
      }
    } catch (e) {
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan saat menghapus data semester!",
      });
    }
  };

  // const handleUpdateSemester = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios
  //       .patch(`${BASE_URL}/lecturer/update/${nidn}`, {
  //         nidn: lecturerData.nidn,
  //         lecturer_name: lecturerData.nama,
  //       })
  //       .then(() => {
  //         Toast.fire({
  //           icon: "success",
  //           title: "Berhasil merubah data dosen!",
  //         });
  //         setTriggerFetch(!triggerFetch);
  //         handleCloseModalUpdate();
  //       });

  //     setLecturerData({
  //       nidn: "",
  //       nama: "",
  //     });
  //   } catch (e) {
  //     Toast.fire({
  //       icon: "error",
  //       title: "Terjadi kesalahan saat mengubah data dosen!",
  //     });
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/semester/list`);

        if (response.data.data === null) return;

        setSemester(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    fetchData();
  }, [triggerFetch]);

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
    return data;
  };

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* berkas */}
        <div className="berkas p-5 bg-[#f4f6f9] h-full">
          <div className="judul">
            <h1 className="lg:text-3xl text-3xl mb-5 font-medium text-[#212529]">
              Semester
            </h1>
          </div>
          <div className="card border-4 border-t-[#007bff] border-x-0 border-b-0 rounded-md bg-white">
            <div className="p-5 flex">
              <h5 className="text-md text-medium">Semester</h5>
              <button
                onClick={handleOpenModal}
                className="text-white bg-[#0069d9] px-2 py-1 rounded text-xs ml-auto"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Tambah
              </button>
              <Modal
                show={showModal}
                title="Tambah Data Semester"
                onClosed={handleCloseModal}
                onSave={handleSubmitSemester}
              >
                <div className="w-[35rem] flex flex-col gap-5">
                  <h1 className="text-black font-bold text-lg">
                    Tahun Akademik
                  </h1>
                  <TextField
                    id="academic_year"
                    name="academic_year"
                    placeholder="Tahun Akademik"
                    variant="outlined"
                    className="w-full"
                    value={semesterData.academic_year}
                    onChange={handleChange}
                  />
                  <h1 className="text-black font-bold text-lg">Semester</h1>
                  <TextField
                    id="semester"
                    name="semester"
                    placeholder="Semester"
                    variant="outlined"
                    className="w-full"
                    value={semesterData.semester}
                    onChange={handleChange}
                  />
                </div>
              </Modal>
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
                      Nama
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
                      Status
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
                  {semester.length === null
                    ? "Tidak ada data semester"
                    : semester.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{`Tahun Akademik ${item.academic_year} Semester ${item.semester}`}</td>
                          <td>{item.status}</td>
                          <td>
                            <div className="flex gap-1 justify-center h-full p-2">
                              <span
                                onClick={(e) => {
                                  handleDeleteSemester(e, item.id);
                                }}
                                className="items-center cursor-pointer hover:bg-[#ae4853]  bg-[#dc3545] px-2 py-1 rounded text-xs font-medium text-white ring-1 ring-inset ring-[#dc3545]"
                              >
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

export default Semester;
