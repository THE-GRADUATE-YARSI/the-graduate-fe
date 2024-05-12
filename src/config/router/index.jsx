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

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/persyaratan" element={<Persyaratan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/admin/dosen" element={<Dosen />} />
      <Route path="/admin/mahasiswa" element={<Mahasiswa />} />
      <Route path="/admin/tendik" element={<Tendik />} />
      <Route path="/admin/berkas" element={<Berkas />} />
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />} />
      <Route path="/pendaftaran-wisuda" element={<PendaftaranWisuda />} />
    </Routes>
  );
};

export default Router;
