import React, { useState } from "react";
import MainLayouts from "../../layout";
import Sidebar from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEdit,
  faExpandArrowsAlt,
  faPencilAlt,
  faPlus,
  faSignOutAlt,
  faTimes,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BsBell } from "react-icons/bs";
import AdminLayout from "../../layout/admin-layout";

const PersyaratanAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const data = [
    {
      id: 1,
      syarat: "FotoCopy Berwarna Ijazah SMA",
    },
    {
      id: 2,
      syarat: "FotoCopy Berwarna Akte Kelahiran",
    },
    {
      id: 3,
      syarat: "FotoCopy Berwarna Kartu Keluarga",
    },
    {
      id: 4,
      syarat: "Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)",
    },
    {
      id: 5,
      syarat: "Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)",
    },
    {
      id: 6,
      syarat: "Pas Foto Berwarna",
    },
    {
      id: 7,
      syarat: "Surat Keterangan Kelulusan (SKL)",
    },
    {
      id: 8,
      syarat: "Sertifikat TOEIC",
    },
    {
      id: 9,
      syarat: "File Skripsi",
    },
  ];
  return (
    <AdminLayout>
      <div className="min-h-[93vh] bg-[#f4f6f9] h-full ml-auto pb-10">
        {/* konten syarat */}
        <section className="konten-persyaratan bg-[#f4f6f9] pt-1 px-3 h-full">
          <h1 className="text-xl my-4">Persyaratan</h1>
          <div
            className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full"
            role="alert"
          >
            <div className="flex items-center justify-between">
              <h3>Persyaratan</h3>
              <button
                type="submit"
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-1 rounded-sm"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="text-xs ms-1">Tambah</span>
              </button>
            </div>
            <hr className="mt-3" />
            <table className="table-auto w-full tabel-costum mt-5">
              <thead>
                <tr className="text-center">
                  <th className="p-2 w-auto">No</th>
                  <th className="p-2 w-10/12">Persyaratan</th>
                  <th className="p-2 w-2/12">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center py-2">{index + 1}</td>
                    <td className="py-2">{item.syarat}</td>
                    <td className="flex items-center justify-center gap-1 py-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 rounded-sm px-1">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 rounded-sm text-white px-1">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* end of konten syarat */}
      </div>
    </AdminLayout>
  );
};

export default PersyaratanAdmin;
