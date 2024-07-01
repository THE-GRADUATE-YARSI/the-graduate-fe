import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layout/admin-layout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../config/network";

const DashboardMahasiswa = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { first_name, last_name, npm } = decodedToken;

  const [data, setData] = useState([
    {
      id: 1,
      condition: "FotoCopy Berwarna Ijazah SMA",
      fieldName: "grad_certificate",
      status: false,
    },
    {
      id: 2,
      condition: "FotoCopy Berwarna Akte Kelahiran",
      fieldName: "birth_certificate",
      status: false,
    },
    {
      id: 3,
      condition: "FotoCopy Berwarna Kartu Keluarga",
      fieldName: "family_card",
      status: false,
    },
    {
      id: 4,
      condition: "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)",
      fieldName: "idcard",
      status: false,
    },
    {
      id: 5,
      condition: "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)",
      fieldName: "student_card",
      status: false,
    },
    {
      id: 6,
      condition: "Pas Foto Berwarna",
      fieldName: "photo",
      status: false,
    },
    {
      id: 7,
      condition: "Surat Keterangan Kelulusan (SKL)",
      fieldName: "temp_grad",
      status: false,
    },
    {
      id: 8,
      condition: "Sertifikat TOEIC",
      fieldName: "toeic",

      status: false,
    },
    {
      id: 9,
      condition: "File Skripsi",
      fieldName: "thesis",
      status: false,
    },
  ]);

  const fetchData = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/students/docs/${npm}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = response.data.data;

        if (Object.keys(responseData).length === 0) {
          return;
        }

        const updatedStatus = {
          grad_certificate: responseData.graduation_certificate !== "No file uploaded for this field",
          birth_certificate: responseData.birth_certificate !== "No file uploaded for this field",
          family_card: responseData.family_card !== "No file uploaded for this field",
          idcard: responseData.id_card !== "No file uploaded for this field",
          student_card: responseData.student_card !== "No file uploaded for this field",
          photo: responseData.photo !== "No file uploaded for this field",
          temp_grad: responseData.temp_graduation_certificate !== "No file uploaded for this field",
          toeic: responseData.toeic_certificate !== "No file uploaded for this field",
          thesis: responseData.thesis_file !== "No file uploaded for this field",
        };

        const updatedData = data.map((item) => ({
          ...item,
          status: updatedStatus[item.fieldName],
        }));

        setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    }
  }, [token, npm, data]); // Ensure data is stable or memoized

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="dashboard-mahasiswa h-full relative bg-[#f4f6f9] p-4">
          <h1 className="text-2xl text-black mb-4">Dashboard Mahasiswa</h1>
          <div
            className="bg-white border-l-4 border-[#117a8b] text-black p-4 shadow-md"
            role="alert"
          >
            <h2 className="font-medium">
              Selamat Datang{" "}
              <span className="text-blue-600 font-bold">
                {`${first_name} ${last_name}`}
              </span>
            </h2>
          </div>

          <h1 className="text-2xl text-black my-4 font-bold">
            Persyaratan Wisuda
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className={`bg-white border-l-4 flex items-center p-4 shadow-md ${
                  item.status ? "border-green-500" : "border-red-500"
                }`}
                role="alert"
              >
                <FontAwesomeIcon
                  icon={item.status ? faCheck : faTimes}
                  className={`me-2 ${
                    item.status ? "text-green-500" : "text-red-500"
                  }`}
                />
                <h2 className="font-medium text-black">{item.condition}</h2>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default DashboardMahasiswa;
