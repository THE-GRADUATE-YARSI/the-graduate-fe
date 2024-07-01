import { Button, Divider } from "@mui/material";
import AdminLayout from "./admin-layout";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/network";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { openLink } from "../utils/helpers";

function DetailMahasiswa({ npm }) {
  const { studentId } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { role } = decodedToken;
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      condition: "FotoCopy Berwarna Ijazah SMA",
      link: "",
    },
    {
      id: 2,
      condition: "FotoCopy Berwarna Akte Kelahiran",
      link: "",
    },
    {
      id: 3,
      condition: "FotoCopy Berwarna Kartu Keluarga",
      link: "",
    },
    {
      id: 4,
      condition: "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)",
      link: "",
    },
    {
      id: 5,
      condition: "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)",
      link: "",
    },
    {
      id: 6,
      condition: "Pas Foto Berwarna",
      link: "",
    },
    {
      id: 7,
      condition: "Surat Keterangan Kelulusan (SKL)",
      link: "",
    },
    {
      id: 8,
      condition: "Sertifikat TOEIC",
      link: "",
    },
    {
      id: 9,
      condition: "File Skripsi",
      link: "",
    },
  ]);

  const [
    {
      student_id,
      first_name,
      last_name,
      email,
      major,
      national_id,
      address,
      birth_date,
      birth_place,
      phone_number,
      telephone_number,
      credit_course,
      gpa,
      gender,
      verification,
      thesis_title,
      advisor,
      religion_advisor,
      examiner,
      academic_year,
      graduate_date,
      commencement_date,
    },
    setStudent,
  ] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/students/${studentId || npm}`
        );
        setStudent(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [npm, studentId]);

  const handleAcceptRegistration = async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Verifikasi",
        text: "Apakah Anda yakin ingin menerima pendaftaran ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Terima!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.patch(`${BASE_URL}/students/${student_id}`, {
          verification: "VERIFIED",
        });

        Swal.fire("Berhasil", "Berhasil menerima pendaftaran!!", "success");
        navigate(-1);
      }
    } catch (e) {
      Swal.fire(
        "Gagal",
        `Terjadi kesalahan saat menerima pendaftaran`,
        "error"
      );
    }
  };

  const handleRejectRegistration = async () => {
    try {
      const { value: message } = await Swal.fire({
        title: "Tolak Pendaftaran",
        text: "Masukkan alasan penolakan",
        input: "textarea",
        inputPlaceholder: "Masukkan alasan penolakan...",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tolak",
        cancelButtonText: "Batal",
      });

      if (message) {
        await axios.patch(`${BASE_URL}/students/${student_id}`, {
          verification: "REJECTED",
          message,
        });

        Swal.fire("Berhasil", "Berhasil menolak pendaftaran!!", "success");
        navigate(-1);
      }
    } catch (e) {
      Swal.fire("Gagal", `Terjadi kesalahan saat menolak pendaftaran`, "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/students/docs/${studentId || npm}`
        );

        const updatedData = data.map((item) => {
          switch (item.condition) {
            case "FotoCopy Berwarna Ijazah SMA":
              return {
                ...item,
                link: response.data.data.graduation_certificate,
              };
            case "FotoCopy Berwarna Akte Kelahiran":
              return {
                ...item,
                link: response.data.data.birth_certificate,
              };
            case "FotoCopy Berwarna Kartu Keluarga":
              return {
                ...item,
                link: response.data.data.family_card,
              };
            case "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)":
              return {
                ...item,
                link: response.data.data.id_card,
              };
            case "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)":
              return {
                ...item,
                link: response.data.data.student_card,
              };
            case "Pas Foto Berwarna":
              return {
                ...item,
                link: response.data.data.photo,
              };
            case "Surat Keterangan Kelulusan (SKL)":
              return {
                ...item,
                link: response.data.data.temp_graduation_certificate,
              };
            case "Sertifikat TOEIC":
              return {
                ...item,
                link: response.data.data.toeic_certificate,
              };
            case "File Skripsi":
              return {
                ...item,
                link: response.data.data.thesis_file,
              };
            default:
              return item;
          }
        });
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data[5].link)

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="form-pendaftaran-wisuda bg-[#f4f6f9] pt-1 px-5 pb-5">
          <h1 className="font-medium text-black text-2xl my-4">
            Pendaftaran Wisuda
          </h1>
          <div className="bg-white border-t-4 border-blue-600 rounded-b text-black py-3 shadow-sm w-full flex flex-col gap-5">
            <h1 className="font-medium text-black text-xl px-5 py-3">
              Formulir Pendaftaran
            </h1>
            <Divider />
            {role === "student" && (
              <div className="px-5">
                {verification === "NOT_VERIFIED" ? (
                  <div className="w-full bg-blue-500 px-5 py-4 text-white my-5 flex flex-col gap-3 rounded-md">
                    <p className="text-2xl flex gap-5">
                      <FontAwesomeIcon icon={faInfo} />
                      <span className="text-xl">
                        Silahkan Menunggu Verifikasi Dokumen
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="w-full bg-green-500 px-5 py-4 text-white my-5 flex flex-col gap-3 rounded-md">
                    <p className="text-2xl flex gap-5">
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="text-xl">
                        Pendaftaran Anda Diverifikasi
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col py-5 px-5 w-full gap-8">
              <h1 className="text-2xl text-black font-bold text-center">
                Formulir Pendaftaran Wisuda
              </h1>
              <div className="flex justify-start items-start gap-28 px-20">
                <img
                  src={data[5].link}
                  alt="foto"
                  className="w-[190px] h-[250px] border-4 border-black object-cover"
                />

                <div className="w-full text-lg">
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">NPM</label>
                    <span>: &nbsp;{student_id} </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">NIK</label>
                    <span>: &nbsp;{national_id} </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Nama</label>
                    <span>: &nbsp;{`${first_name} ${last_name}`}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">
                      Tempat/Tanggal Lahir
                    </label>
                    <span>: &nbsp;{`${birth_place}, ${birth_date}`}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Jenis Kelamin</label>
                    <span>: &nbsp;{gender}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Alamat</label>
                    <span>: &nbsp;{address}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">E-Mail</label>
                    <span>: &nbsp;{email}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">No Hanphone</label>
                    <span>: &nbsp;{phone_number}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">No Telepon</label>
                    <span>: &nbsp;{telephone_number}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Program Studi</label>
                    <span>: &nbsp;{major}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Total SKS</label>
                    <span>: &nbsp;{credit_course}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">IPK</label>
                    <span>: &nbsp;{gpa}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Judul Skripsi</label>
                    <span>: &nbsp;{thesis_title}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Pembimbing Ilmu</label>
                    <span>: &nbsp;{advisor}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Pembimbing Agama</label>
                    <span>: &nbsp;{religion_advisor}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Dosen Penguji</label>
                    <span>: &nbsp;{examiner}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Tahun Akademik</label>
                    <span>: &nbsp;{academic_year}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Tanggal Lulus</label>
                    <span>: &nbsp;{commencement_date}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-48 font-bold">Tanggal Wisuda</label>
                    <span>: &nbsp;{graduate_date}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-12 mt-5">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="w-11/12 border py-2">Dokumen</th>
                      <th className="w-1/12 border py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td className="border flex items-center p-2">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-green-500 me-2"
                          />

                          {item.condition}
                        </td>
                        <td className="border text-center">
                          <button
                            className={`px-2 text-center rounded-lg py-1 ${
                              item.status
                                ? "bg-gray-300 cursor-not-allowed text-xs"
                                : "bg-blue-500 hover:bg-blue-600 text-white text-xs focus:outline-none"
                            }`}
                            onClick={() => openLink(item.link)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {role === "admin" && verification !== "VERIFIED" && (
                <div className="col-span-12 mt-5 flex gap-5">
                  <Button
                    variant="contained"
                    sx={{
                      height: "40px",
                      backgroundColor: "green",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                        cursor: "pointer",
                      },
                    }}
                    onClick={handleAcceptRegistration}
                  >
                    Verifikasi Pendaftaran
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      height: "40px",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "darkred",
                        cursor: "pointer",
                      },
                    }}
                    onClick={handleRejectRegistration}
                  >
                    Tolak Pendaftaran
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default DetailMahasiswa;
