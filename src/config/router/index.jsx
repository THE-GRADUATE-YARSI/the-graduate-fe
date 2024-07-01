import React from "react";
import { Route, Routes } from "react-router-dom";
import Beranda from "../../pages/Beranda/index";
import Persyaratan from "../../pages/persyaratan/persyaratan";
import DashboardMahasiswa from "../../pages/DashboardMahasiswa";
import PendaftaranWisuda from "../../pages/PendaftaranWisudaMahasiswa";
import Login from "../../pages/Auth/Login";
import Berkas from "../../pages/DashboardAdmin/berkas";
import DashboardAdmin from "../../pages/DashboardAdmin/dashboard-admin";
import Dosen from "../../pages/DashboardAdmin/dosen";
import Mahasiswa from "../../pages/DashboardAdmin/mahasiswa";
import Tendik from "../../pages/DashboardAdmin/tendik";
import SKLMahasiswa from "../../pages/SKLMahasiswa";
import PengambilanIjazahMahasiswa from "../../pages/PengambilanIjazahMahasiswa";
import PersyaratanAdmin from "../../pages/DashboardAdmin/persyaratan-admin";
import PendaftaranMasuk from "../../pages/DashboardAdmin/pendaftaran-masuk";
import DashboardDosen from "../../pages/Dashboard Dosen/dashboard-dosen";
import BerkasDosen from "../../pages/Dashboard Dosen/berkas-dosen";
import SertifikatKompetensi from "../../pages/Dashboard Dosen/sertifikat-kompetensi";
import CalonWisuda from "../../pages/DashboardAdmin/calon-wisuda";
import Register from "../../pages/Auth/Register";
import DetailMahasiswa from "../../layout/detail-mahasiswa";
import SKL from "../../pages/DashboardAdmin/skl";
import CetakIjazah from "../../pages/PengambilanIjazahMahasiswa/cetak-ijazah";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/persyaratan" element={<Persyaratan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Dashboard Admin */}
      <Route path="/admin/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/admin/dosen" element={<Dosen />} />
      <Route path="/admin/mahasiswa" element={<Mahasiswa />} />
      <Route path="/admin/tendik" element={<Tendik />} />
      <Route path="/admin/berkas" element={<Berkas />} />
      <Route path="/admin/pendaftaran" element={<PendaftaranMasuk />} />
      <Route path="/admin/skl" element={<SKL />} />
      <Route path="/admin/persyaratan" element={<PersyaratanAdmin />} />
      <Route path="/admin/calon-wisuda" element={<CalonWisuda />} />
      <Route
        path="/admin/pendaftaran/mahasiswa/:studentId"
        element={<DetailMahasiswa />}
      />
      {/* Dashboard Mahasiswa */}
      <Route
        path="/mahasiswa/dashboard-mahasiswa"
        element={<DashboardMahasiswa />}
      />
      <Route
        path="/mahasiswa/pendaftaran-wisuda"
        element={<PendaftaranWisuda />}
      />
      <Route path="/mahasiswa/skl" element={<SKLMahasiswa />} />
      <Route
        path="/mahasiswa/pengambilan-ijazah"
        element={<PengambilanIjazahMahasiswa />}
      />
      <Route
        path="/mahasiswa/pengambilan-ijazah/cetak-ijazah"
        element={<CetakIjazah />}
      />
      {/* Dashboard Dosen */}
      <Route path="/dosen/dashboard-dosen" element={<DashboardDosen />} />
      <Route path="/dosen/berkas" element={<BerkasDosen />} />
      <Route path="/dosen/sertifikat" element={<SertifikatKompetensi />} />
    </Routes>
  );
};

export default Router;
