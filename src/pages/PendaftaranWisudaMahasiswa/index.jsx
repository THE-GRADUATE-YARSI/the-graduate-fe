import {
  faBan,
  faCalendarAlt,
  faCheck,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "../../layout/admin-layout";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../config/network";
import Modal from "../../components/modal";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import DetailMahasiswa from "../../layout/detail-mahasiswa";
import { parseDate } from "../../utils/helpers";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  student_id: yup.string().required("NPM harus diisi"),
  major: yup
    .string()
    .notOneOf(["default"], "Jurusan harus dipilih")
    .required("Jurusan harus diisi"),
  national_id: yup.string().required("NIK harus diisi"),
  address: yup.string().required("Alamat harus diisi"),
  birth_place: yup.string().required("Tempat lahir harus diisi"),
  phone_number: yup.string().required("Nomor telepon harus diisi"),
  telephone_number: yup.string().required("Nomor telepon rumah harus diisi"),
  credit_course: yup.string().required("SKS harus diisi"),
  gpa: yup.string().required("IPK harus diisi"),
  thesis_title: yup.string().required("Judul skripsi harus diisi"),
  advisor: yup.string().required("Nama pembimbing harus diisi"),
  nidn_advisor_one: yup.string().required("NIDN pembimbing 1 harus diisi"),
  nidn_advisor_two: yup.string().required("NIDN pembimbing 2 harus diisi"),
  nidn_religion: yup.string().required("NIDN pembimbing agama harus diisi"),
  examiner: yup.string().required("Nama penguji harus diisi"),
  academic_year: yup
    .string()
    .notOneOf(["default"], "Tahun akademik harus dipilih")
    .required("Tahun akademik harus diisi"),
  gender: yup.string().required("Jenis kelamin harus dipilih"),
  semester: yup.string().required("Semester harus dipilih"),
  religion_advisor: yup.string().required("Nama pembimbing agama harus diisi"),
  email: yup.string().email("Email tidak valid").required("Email harus diisi"),
});

const PendaftaranWisuda = () => {
  const [fullName, setFullName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { npm, first_name, last_name, email } = decodedToken;

  const [formData, setFormData] = useState({
    student_id: npm,
    major: "default",
    first_name: "",
    last_name: "",
    national_id: "",
    address: "",
    semester: "",
    birth_date: null,
    birth_place: "",
    phone_number: "",
    telephone_number: "",
    credit_course: "",
    gpa: "",
    thesis_title: "",
    advisor: "",
    nidn_advisor_one: "",
    nidn_advisor_two: "",
    nidn_religion: "",
    examiner: "",
    academic_year: "default",
    gender: "",
    religion_advisor: "",
    graduate_date: null,
    commencement_date: null,
    email: "",
  });

  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [lecturer, setLecturer] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);

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

  const handleOpenModal = (item) => {
    setShowModal(true);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setFileInputKey(fileInputKey + 1);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [data, setData] = useState([
    {
      id: 1,
      condition: "FotoCopy Berwarna Ijazah SMA",
      fieldName: "grad_certificate",
      endPoint: "/students/doc/gradcert",
      status: false,
    },
    {
      id: 2,
      condition: "FotoCopy Berwarna Akte Kelahiran",
      fieldName: "birth_certificate",
      endPoint: "/students/doc/birth",
      status: false,
    },
    {
      id: 3,
      condition: "FotoCopy Berwarna Kartu Keluarga",
      fieldName: "family_card",
      endPoint: "/students/doc/familycard",
      status: false,
    },
    {
      id: 4,
      condition: "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)",
      fieldName: "idcard",
      endPoint: "/students/doc/idcard",
      status: false,
    },
    {
      id: 5,
      condition: "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)",
      fieldName: "student_card",
      endPoint: "/students/doc/studentcard",
      status: false,
    },
    {
      id: 6,
      condition: "Pas Foto Berwarna",
      fieldName: "photo",
      endPoint: "/students/doc/photo",
      status: false,
    },
    {
      id: 7,
      condition: "Surat Keterangan Kelulusan (SKL)",
      fieldName: "temp_grad",
      endPoint: "/students/doc/tempgrad",
      status: false,
    },
    {
      id: 8,
      condition: "Sertifikat TOEIC",
      fieldName: "toeic",
      endPoint: "/students/doc/toeic",
      status: false,
    },
    {
      id: 9,
      condition: "File Skripsi",
      fieldName: "thesis",
      endPoint: "/students/doc/thesis",
      status: false,
    },
  ]);

 
  const fetchDataDocs = useCallback(async () => {
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

        setPhoto(responseData.photo);

        const updatedStatus = {
          grad_certificate:
            responseData.graduation_certificate !==
            "No file uploaded for this field",
          birth_certificate:
            responseData.birth_certificate !==
            "No file uploaded for this field",
          family_card:
            responseData.family_card !== "No file uploaded for this field",
          idcard: responseData.id_card !== "No file uploaded for this field",
          student_card:
            responseData.student_card !== "No file uploaded for this field",
          photo: responseData.photo !== "No file uploaded for this field",
          temp_grad:
            responseData.temp_graduation_certificate !==
            "No file uploaded for this field",
          toeic:
            responseData.toeic_certificate !==
            "No file uploaded for this field",
          thesis:
            responseData.thesis_file !== "No file uploaded for this field",
        };

        const updatedData = data.map((item) => ({
          ...item,
          status:
            selectedItem && item.fieldName === selectedItem.fieldName
              ? true
              : updatedStatus[item.fieldName],
        }));

        setData(updatedData);
        const allFieldsUploaded = Object.values(updatedStatus).every(Boolean);
        setShowSubmitButton(allFieldsUploaded);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    fetchDataDocs();
  }, [triggerFetch]);

  useEffect(() => {
    if (token) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: email,
      }));
    }
  }, [email, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "full_name") {
      setFullName(value);
    } else if (
      name === "nidn_advisor_one" ||
      name === "nidn_religion" ||
      name === "nidn_advisor_two"
    ) {
      const selectedLecturer = lecturer.find((data) => data.nidn === value);
      const lecturerName = selectedLecturer
        ? selectedLecturer.lecturer_name
        : "";

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        [name === "nidn_advisor_one"
          ? "advisor"
          : name === "nidn_advisor_two"
          ? "examiner"
          : "religion_advisor"]: lecturerName,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const postData = {
      ...formData,
      credit_course: parseInt(formData.credit_course),
      gpa: parseFloat(formData.gpa),
      birth_date: formData.birth_date
        ? format(formData.birth_date, "dd MMMM yyyy", { locale: id })
        : null,
      commencement_date: formData.commencement_date
        ? format(formData.commencement_date, "dd MMMM yyyy", { locale: id })
        : null,
      graduate_date: formData.graduate_date
        ? format(formData.graduate_date, "dd MMMM yyyy", { locale: id })
        : null,
    };

    try {
      await validationSchema.validate(postData);

      if (isStudent) {
        await axios.patch(
          `${BASE_URL}/students/${npm}`,
          JSON.stringify(postData),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(BASE_URL + "/students", JSON.stringify(postData), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      Toast.fire({
        icon: "success",
        title: "Berhasil update profile!",
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.message;
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
      } else {
        console.error("Error:", error);
        Toast.fire({
          icon: "error",
          title: "Terjadi kesalahan saat update profile",
        });
      }
    }
    console.log(postData);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmitDocument = async () => {
    const token = localStorage.getItem("token");

    if (!selectedFile) {
      Toast.fire({
        icon: "error",
        title: "Pilih file terlebih dahulu!",
      });
      return;
    }

    const formData = new FormData();
    formData.append(selectedItem.fieldName, selectedFile);

    setLoading(true);

    try {
      await axios.post(BASE_URL + selectedItem.endPoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Toast.fire({
        icon: "success",
        title: "Berhasil upload file!",
      });
      setTriggerFetch(!triggerFetch);
      handleCloseModal();
      setSelectedFile(null);
      await fetchDataDocs();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Gagal upload file!",
      });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmitRegister = useCallback(async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Verifikasi",
        text: "Apakah anda yakin ingin mengirim file pendaftaran ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.patch(`${BASE_URL}/students/${npm}`, {
          verification: "NOT_VERIFIED",
        });
        setStatus("NOT_VERIFIED");
        Swal.fire(
          "Berhasil",
          "Berhasil mengirim file, menunggu verifikasi!!",
          "success"
        );
      }
    } catch (e) {
      Swal.fire("Gagal", `Terjadi kesalahan saat mengirim`, "error");
    }
  }, [npm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(`${BASE_URL}/students/${npm}`);
          console.log(response.data.data);
          if (Object.keys(response.data.data).length === 0) {
            return;
          }

          setFullName(
            `${response.data.data.first_name} ${response.data.data.last_name}`
          );
          setIsStudent(true);
          setMessage(response.data.data.message);
          setStatus(response.data.data.verification);
          setFormData({
            ...formData,
            nidn_advisor_one: response.data.data.nidn_advisor_one,
            nidn_religion: response.data.data.nidn_religion,
            nidn_advisor_two: response.data.data.nidn_advisor_two,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            email: response.data.data.email,
            major: response.data.data.major,
            national_id: response.data.data.national_id,
            address: response.data.data.address,
            birth_date: parseDate(response.data.data.birth_date),
            birth_place: response.data.data.birth_place,
            phone_number: response.data.data.phone_number,
            telephone_number: response.data.data.telephone_number,
            credit_course: response.data.data.credit_course,
            gpa: response.data.data.gpa,
            verification: response.data.data.verification,
            academic_year: response.data.data.academic_year,
            semester: response.data.data.semester,
            examiner: response.data.data.examiner,
            gender: response.data.data.gender,
            thesis_title: response.data.data.thesis_title,
            advisor: response.data.data.advisor,
            religion_advisor: response.data.data.religion_advisor,
            graduate_date: parseDate(response.data.data.graduate_date),
            commencement_date: parseDate(response.data.data.commencement_date),
          });
        }
      } catch (err) {
        setFullName(`${first_name} ${last_name}`);
        throw new Error(err.message);
      }
    };

    fetchData();
  }, [first_name, last_name, npm, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecturer/list`);

        setLecturer(response.data.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    fetchData();
  }, []);

  return status === "NOT_VERIFIED" || status === "VERIFIED" ? (
    <DetailMahasiswa npm={npm} />
  ) : (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="form-pendaftaran-wisuda bg-[#f4f6f9] pt-1 px-3 pb-5">
          <h1 className="font-medium text-black text-2xl my-4">
            Pendaftaran Wisuda
          </h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <h1 className="font-medium text-black text-xl">
              Form Pendaftaran Wisuda
            </h1>
            <hr />
            {status === "REJECTED" && (
              <div className="w-full bg-red-500 px-5 py-4 text-white my-5 flex flex-col gap-3">
                <p className="text-2xl flex gap-5">
                  <FontAwesomeIcon icon={faBan} />
                  <span className="text-xl">Pendaftaran Anda Ditolak</span>
                </p>
                <p className="text-md flex flex-col">
                  <span>Catatan:</span> <span>{message}</span>
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 my-4">
                <label className="col-span-2 flex flex-col items-center justify-center">
                  <span className="text- sm font-bold text-center">Foto</span>
                  <img
                    src={photo}
                    alt="foto"
                    className="w-[150px] h-[200px] border-4 border-black"
                  />
                </label>
                <div className="col-span-10">
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">NPM</span>
                      <input
                        type="text"
                        name="student_id"
                        value={npm}
                        className="mt-1 px-3 py-2 bg-gray-200 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed+"
                        placeholder="NPM"
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">NIK</span>
                      <input
                        type="text"
                        name="national_id"
                        onChange={handleChange}
                        value={formData.national_id}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="NIK"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Nama Mahasiswa
                      </span>
                      <input
                        type="text"
                        name="full_name"
                        onChange={handleChange}
                        value={fullName}
                        className="mt-1 px-3 py-2 bg-gray-200 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Nama Mahasiswa"
                        disabled
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Tempat Lahir
                      </span>
                      <input
                        type="text"
                        name="birth_place"
                        onChange={handleChange}
                        value={formData.birth_place}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Tempat Lahir"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black block mt-1">
                        Tanggal Lahir
                      </span>
                      <div className="relative">
                        <ReactDatePicker
                          selected={formData.birth_date}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) =>
                            handleDateChange("birth_date", date)
                          }
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                          wrapperClassName="w-full"
                        />
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Jenis Kelamin
                      </span>
                      <select
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default">--Jenis Kelamin--</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Alamat
                      </span>
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Alamat"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Semester
                      </span>
                      <select
                        type="text"
                        name="semester"
                        onChange={handleChange}
                        value={formData.semester}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Semester"
                      >
                        <option value="" disabled>
                          --Pilih Semester--
                        </option>
                        <option value="Ganjil">Ganjil</option>
                        <option value="Genap">Genap</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="mt-1 px-3 py-2 bg-gray-200 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed"
                        placeholder="Email"
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Handphone
                      </span>
                      <input
                        type="text"
                        name="phone_number"
                        onChange={handleChange}
                        value={formData.phone_number}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Handphone"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Telpon
                      </span>
                      <input
                        type="text"
                        name="telephone_number"
                        onChange={handleChange}
                        value={formData.telephone_number}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Telpon"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Program Studi
                      </span>
                      <select
                        name="major"
                        onChange={handleChange}
                        value={formData.major}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default" disabled>
                          --Pilih Program Studi--
                        </option>
                        <option value="Teknik Informatika">
                          Teknik Informatika
                        </option>
                        <option value="PdSI">
                          Perpustakaan dan Sains Informasi (PdSI)
                        </option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Total SKS
                      </span>
                      <input
                        type="text"
                        name="credit_course"
                        onChange={handleChange}
                        value={formData.credit_course}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Total SKS"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">IPK</span>
                      <input
                        type="text"
                        name="gpa"
                        onChange={handleChange}
                        value={formData.gpa}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="IPK"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-span-12">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Judul Skripsi
                    </span>
                    <input
                      type="text"
                      name="thesis_title"
                      onChange={handleChange}
                      value={formData.thesis_title}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Judul Skripsi"
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Pembimbing Ilmu
                      </span>
                      <select
                        name="nidn_advisor_one"
                        onChange={handleChange}
                        value={formData.nidn_advisor_one}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default">--Pilih Pembimbing--</option>
                        {lecturer.map((data) => (
                          <option key={data.nidn} value={data.nidn}>
                            {data.lecturer_name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Pembimbing Agama
                      </span>
                      <select
                        name="nidn_religion"
                        onChange={handleChange}
                        value={formData.nidn_religion}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default">--Pilih Pembimbing--</option>
                        {lecturer.map((data) => (
                          <option key={data.nidn} value={data.nidn}>
                            {data.lecturer_name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Dosen Penguji
                      </span>
                      <select
                        name="nidn_advisor_two"
                        onChange={handleChange}
                        value={formData.nidn_advisor_two}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default">--Pilih Dosen Penguji--</option>
                        {lecturer.map((data) => (
                          <option key={data.nidn} value={data.nidn}>
                            {data.lecturer_name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black">
                        Tahun Akademik
                      </span>
                      <select
                        name="academic_year"
                        onChange={handleChange}
                        value={formData.academic_year}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      >
                        <option value="default" disabled>
                          --Pilih Tahun Akademik--
                        </option>
                        <option value="2020/2021">2020/2021</option>
                        <option value="2021/2022">2021/2022</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <label className="block">
                      <span className="text-sm font-bold text-black block mt-1">
                        Tanggal Lulus
                      </span>
                      <div className="relative">
                        <ReactDatePicker
                          selected={formData.graduate_date}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) =>
                            handleDateChange("graduate_date", date)
                          }
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                          wrapperClassName="w-full"
                        />
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-black block mt-1">
                        Tanggal Wisuda
                      </span>
                      <div className="relative">
                        <ReactDatePicker
                          selected={formData.commencement_date}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) =>
                            handleDateChange("commencement_date", date)
                          }
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                          wrapperClassName="w-full"
                        />
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium text-sm p-1 rounded-md mt-2"
                >
                  Simpan
                </button>
              </div>
            </form>
            {/* Tabel Dokumen */}
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
                        {item.status ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-green-500 me-2"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-red-500 me-2"
                          />
                        )}
                        {item.condition}
                      </td>
                      <td className="border text-center">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className={`px-4 py-1 ${
                            item.status
                              ? "bg-gray-300 cursor-not-allowed text-xs"
                              : "bg-blue-500 hover:bg-blue-600 text-white text-xs focus:outline-none"
                          }`}
                        >
                          <FontAwesomeIcon icon={faUpload} className="me-1" />
                          <span>Upload</span>
                        </button>
                        <Modal
                          show={showModal}
                          title="Dokumen Persyaratan"
                          isLoading={loading}
                          onClosed={handleCloseModal}
                          onSave={async (e) => {
                            e.preventDefault();
                            await handleSubmitDocument();
                          }}
                        >
                          <div className="w-[35rem] flex flex-col gap-4 justify-start items-start">
                            <h1 className="text-black font-bold text-lg">
                              {selectedItem?.condition}
                            </h1>
                            <input
                              key={fileInputKey}
                              type="file"
                              accept={
                                selectedItem?.condition === "Pas Foto Berwarna"
                                  ? "image/*"
                                  : "application/pdf"
                              }
                              className="bg-white border-2 border-gray-300 rounded p-2 w-full"
                              onChange={handleFileChange}
                            />
                          </div>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-12 mt-5">
              {showSubmitButton ? (
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
                  onClick={handleSubmitRegister}
                >
                  Kirim Pendaftaran
                </Button>
              ) : (
                <div
                  className="bg-white border-l-4 flex items-center p-4 shadow-md border-red-500"
                  role="alert"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="me-2 text-red-500"
                  />
                  <h5 className="font-medium fo text-black">
                    Pendaftaran Belum Bisa Dikirim Sebelum Melengkapi Upload
                    Dokumen Persyaratan !!!!
                  </h5>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default PendaftaranWisuda;
