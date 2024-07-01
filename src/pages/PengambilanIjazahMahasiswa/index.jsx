import {
  faCalendarAlt,
  faFloppyDisk,
  faInfo,
  faPrint,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import AdminLayout from "../../layout/admin-layout";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../config/network";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Swal from "sweetalert2";
import { parseDate } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const PengambilanIjazahMahasiswa = () => {
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { npm, first_name, last_name } = decodedToken;
  console.log(npm, first_name, last_name);
  const [formData, setFormData] = useState({
    student_id: npm,
    full_name: first_name + " " + last_name,
    birth_date: null,
    birth_place: "",
    gender: "",
    address: "",
    phone_number: "",
    major: "",
    gpa: "",
    religion: "",
    level: "",
    dad: "",
    mother: "",
    parent_telp: "",
    parent_address: "",
    commencement_date: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `${BASE_URL}/graduateform/detail/${npm}`
          );

          setFormData({
            birth_date: parseDate(response.data.data.birth_date),
            birth_place: response.data.data.birth_place,
            gender: response.data.data.gender,
            address: response.data.data.address,
            phone_number: response.data.data.phone_number,
            major: response.data.data.major,
            gpa: response.data.data.gpa,
            religion: response.data.data.religion,
            level: response.data.data.level,
            dad: response.data.data.dad,
            mother: response.data.data.mother,
            parent_telp: response.data.data.parent_telp,
            parent_address: response.data.data.parent_address,
            commencement_date: parseDate(response.data.data.commencement_date),
          });
          setIsUpdate(true);
        }
      } catch (err) {
        setIsUpdate(false);
        throw new Error(err.message);
      }
    };
    fetchData();
  }, [npm, token, triggerFetch]);

  const sembunyikan = () => {
    setIsHidden(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      student_id: npm,
      full_name: first_name + " " + last_name,
      gpa: parseFloat(formData.gpa),
      birth_date: formData.birth_date
        ? format(formData.birth_date, "dd MMMM yyyy", { locale: id })
        : null,
      commencement_date: formData.commencement_date
        ? format(formData.commencement_date, "dd MMMM yyyy", { locale: id })
        : null,
    };

    try {
      if (isUpdate) {
        await axios
          .patch(BASE_URL + "/graduateform/update", postData)
          .then(() => {
            setTriggerFetch(!triggerFetch);
          });
      } else {
        await axios
          .post(BASE_URL + "/graduateform/create", postData)
          .then(() => {
            setTriggerFetch(!triggerFetch);
          });
      }
      Toast.fire({
        icon: "success",
        title: "Berhasil menyimpan data!",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        <section className="form-pengambilan-ijazah bg-[#f4f6f9] pt-1 px-3 pb-5 h-full">
          <h1 className="font-medium text-black text-2xl my-4">
            Formulir Pengambilan Ijazah
          </h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <h4 className="font-bold text-center pb-3">
              Formulir Surat Pernyataan Pengambilan Ijazah
            </h4>
            {!isHidden && (
              <div className="flex justify-between w-full bg-[#17a2b8] border-[#148ea1] text-white p-3 font-bold">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                  <h5>Lengkapi Isian Formulir Sebelum Di Cetak!</h5>
                </div>
                <button
                  onClick={sembunyikan}
                  className="text-[#0c5460] hover:text-black"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">NPM</span>
                    <input
                      type="text"
                      name="student_id"
                      value={npm}
                      className="mt-1 px-3 py-2 bg-[#e9ecef] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed"
                      placeholder="NPM"
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Nama Mahasiswa
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value={first_name + " " + last_name}
                      disabled
                      className="mt-1 px-3 py-2 bg-[#e9ecef] border shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Nama Mahasiswa"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">Agama</span>
                    <input
                      type="text"
                      name="religion"
                      onChange={handleChange}
                      value={formData.religion}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Agama"
                    />
                  </label>
                </div>
              </div>
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Tempat Lahir
                    </span>
                    <input
                      type="text"
                      name="birth_place"
                      value={formData.birth_place}
                      onChange={handleChange}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Tanggal Lahir"
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
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">Alamat</span>
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
                </div>
              </div>
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-4 gap-2">
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
                      <option value="default">--Pilih Program Studi--</option>
                      <option value="Teknik Informatika">
                        Teknik Informatika
                      </option>
                      <option value="Perpustakaan dan Sains Informasi">
                        Perpustakaan dan Sains Informasi (PdSI)
                      </option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Jenjang
                    </span>
                    <input
                      type="text"
                      name="level"
                      onChange={handleChange}
                      value={formData.level}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Jenjang"
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
                  <label className="block">
                    <span className="text-sm font-bold text-black block mt-1">
                      Tanggal Lulus
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
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Nama Ayah
                    </span>
                    <input
                      type="text"
                      name="dad"
                      onChange={handleChange}
                      value={formData.dad}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Nama Ayah"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Nama Ibu
                    </span>
                    <input
                      type="text"
                      name="mother"
                      onChange={handleChange}
                      value={formData.mother}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Nama Ibu"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-black">
                      Telpon Orang Tua
                    </span>
                    <input
                      type="text"
                      name="parent_telp"
                      onChange={handleChange}
                      value={formData.parent_telp}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Telepon Orang Tua"
                    />
                  </label>
                </div>
              </div>
              <div className="col-span 12 mt-4">
                <label className="block">
                  <span className="text-sm font-bold text-black">
                    Alamat Orang Tua
                  </span>
                  <input
                    type="text"
                    name="parent_address"
                    onChange={handleChange}
                    value={formData.parent_address}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Alamat Orang Tua"
                  />
                </label>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-1 rounded-sm mt-2 px-2 py-1"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  <span>Simpan</span>
                </button>
                {isUpdate && (
                  <button
                    onClick={() => {
                      navigate("/mahasiswa/pengambilan-ijazah/cetak-ijazah", {
                        state: formData,
                      });
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm p-1 rounded-sm mt-2 px-2 py-1"
                  >
                    <FontAwesomeIcon icon={faPrint} className="me-1" />
                    <span>Cetak Formulir</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default PengambilanIjazahMahasiswa;
