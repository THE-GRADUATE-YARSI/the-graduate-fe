import {
  faFilePdf,
  faInfo,
  faPrint,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../components/modal";
import AdminLayout from "../../layout/admin-layout";
import { BASE_URL } from "../../config/network";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { openLink } from "../../utils/helpers";

const SKLMahasiswa = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [endPointName, setEndPointName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [data, setData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [skl, setSkl] = useState({});
  const [nidn, setNidn] = useState("");
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const { npm } = decodeToken;
  const [loading, setLoading] = useState(false);

  const sembunyikan = () => {
    setIsHidden(true);
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Verifikasi",
        text: "Apakah anda yakin ingin mengirim data pendaftaran SKL ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios
          .patch(`${BASE_URL}/students/${npm}`, {
            verification_skl: "WAITING_VERIFICATION",
          })
          .then(() => {
            Swal.fire(
              "Berhasil",
              "Berhasil mengirim, menunggu verifikasi!",
              "success"
            );
            setTriggerFetch(!triggerFetch);
          });
      }
    } catch (e) {
      Swal.fire("Gagal", `Terjadi kesalahan saat mengirim`, "error");
    }
  }, [npm, triggerFetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students/${npm}`);
        setNidn(response.data.data.nidn_advisor_one);
        setStatus(response.data.data.verification_skl);
        setMessage(response.data.data.message_skl);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    fetchData();
  }, [npm, triggerFetch]);

  const fetchDataDocs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/students/docs/${npm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Object.keys(response.data.data).length === 0) {
        setLoading(false);
        return;
      }

      const { validity_sheet, competency_certificate, article } =
        response.data.data;
      setShowButton(
        validity_sheet !== "No file uploaded for this field" &&
          competency_certificate !== "No file uploaded for this field" &&
          article !== "No file uploaded for this field"
      );
      setData(response.data.data);
    } catch (error) {
      setData(null);
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmitDocument = useCallback(async () => {
    const formData = new FormData();

    formData.append(fieldName, selectedFile);
    setLoadingSubmit(true);
    try {
      await axios
        .post(BASE_URL + endPointName, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setTriggerFetch(!triggerFetch);
        });
      await fetchDataDocs();
      handleCloseModal();
    } catch (error) {
      console.log("Error:", error);
      alert("Error:", error.message);
    } finally {
      setLoadingSubmit(false);
    }
  });

  useEffect(() => {
    fetchDataDocs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/lecturer/skl/${npm}/${nidn}`
        );

        if (Object.keys(response.data.data).length === 0) {
          return;
        }

        setSkl(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    fetchData();
  }, [nidn, npm]);

  const layarPenuh = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const tableData = [
    {
      id: 1,
      name: "Artikel",
      fieldName: "article",
      endPoint: "/students/doc/article",
      link: data?.article,
    },
    {
      id: 2,
      name: "Lembar Pengesahan",
      fieldName: "validity_sheet",
      endPoint: "/students/doc/valsheet",
      link: data?.validity_sheet,
    },
    {
      id: 3,
      name: "Sertifikat Kompetensi",
      fieldName: "competency_certificate",
      endPoint: "/students/doc/comp_cert",
      link: data?.competency_certificate,
    },
  ];

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleModalOpen = (id, name, endPoint, fieldName) => {
    setModal(id);
    setModalName(name);
    setEndPointName(endPoint);
    setFieldName(fieldName);
  };

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="skl bg-[#f4f6f9] pt-1 px-3 pb-5 h-full">
          <h1 className="font-medium text-black text-2xl my-4">
            Surat Keterangan Lulus
          </h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            {!isHidden && status === "NOT_VERIFIED" && (
              <div className="flex justify-between w-full bg-[#17a2b8] border-[#148ea1] text-white p-3 font-bold">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                  <h5>
                    Mohon Lengkapi Persyaratan Dibawah Ini Sebelum Download SKL
                  </h5>
                </div>
                <button
                  onClick={sembunyikan}
                  className="text-[#0c5460] hover:text-black"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            {!isHidden && status === "VERIFIED" && (
              <div className="flex justify-between w-full bg-[#56d676] border-[#42ab5c] text-white p-3 font-bold">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                  <h5>
                    Persyaratan SKL Anda Sudah Disetujui, Silahkan Download File
                    SKL dibawah ini.
                  </h5>
                </div>
                <button
                  onClick={sembunyikan}
                  className="text-[#0c5460] hover:text-black"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            {!isHidden && status === "WAITING_VERIFICATION" && (
              <div className="flex justify-between w-full bg-sky-600 border-sky-800 text-white p-3 font-bold">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                  <h5>
                    Mohon Tunggu Untuk Persetujuan Persyaratan SKL Yang Sudah
                    Anda Kirim!
                  </h5>
                </div>
                <button
                  onClick={sembunyikan}
                  className="text-[#0c5460] hover:text-black"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            {!isHidden && status === "REJECTED" && (
              <div className="flex justify-between w-full bg-red-600 border-red-800 text-white p-3 font-bold">
                <div className="flex items-start flex-col gap-4">
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                    <h5>
                      Persyaratan SKL anda ditolak, Mohon Upload Ulang Kembali
                      Persyaratan SKL Anda.
                    </h5>
                  </div>
                  <p className="text-md flex flex-col">
                    <span>Catatan:</span> <span>{message}</span>
                  </p>
                </div>
                <button
                  onClick={sembunyikan}
                  className="text-[#0c5460] hover:text-black"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="table-auto w-full mt-5">
                  <thead>
                    <tr>
                      <th className="w-1/12 border py-2">No</th>
                      <th className="w-7/12 border py-2">Berkas</th>
                      <th className="w-2/12 border py-2">File</th>
                      <th className="w-2/12 border py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={data.id}>
                        <td className="border text-center py-2">{index + 1}</td>
                        <td className="border px-3 py-2">{data.name}</td>
                        <td className="border py-2 text-center text-lg">
                          {data.link === "No file uploaded for this field" ||
                          data.link === undefined ? null : (
                            <a href={data.link} target="_blank">
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </a>
                          )}
                        </td>
                        <td className="border text-center py-2">
                          <button
                            onClick={() =>
                              handleModalOpen(
                                data.id,
                                data.name,
                                data.endPoint,
                                data.fieldName
                              )
                            }
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-sm focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faUpload} className="me-1" />
                            <span>Upload</span>
                          </button>
                          <Modal
                            title={"Upload"}
                            show={modal}
                            onClosed={handleCloseModal}
                            isLoading={loadingSubmit}
                            onSave={async (e) => {
                              e.preventDefault();
                              await handleSubmitDocument();
                            }}
                          >
                            <label>Upload File {modalName}</label>
                            <input type="file" onChange={handleFileChange} />
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showButton &&
                  (status === "NOT_VERIFIED" || status === "REJECTED") && (
                    <Button
                      variant="contained"
                      sx={{
                        height: "40px",
                        backgroundColor: "green",
                        "&:hover": {
                          backgroundColor: "darkgreen",
                          cursor: "pointer",
                        },
                        marginY: "20px",
                      }}
                      onClick={handleSubmit}
                    >
                      Kirim Data
                    </Button>
                  )}
                {status === "VERIFIED" && (
                  <>
                    <h1 className="text-black font-semibold text-lg">
                      Silahkan Download File SKL Dibawah Ini:
                    </h1>
                    <button
                      onClick={() => openLink(skl.temp_grad)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-1 rounded-sm mt-2 px-2 py-1"
                    >
                      <FontAwesomeIcon icon={faPrint} className="me-1" />
                      <span>File SKL</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default SKLMahasiswa;
