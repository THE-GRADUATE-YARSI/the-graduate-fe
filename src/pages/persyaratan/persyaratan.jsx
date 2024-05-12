import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import SyaratComponent from "../../components/syarat-component";
import "../../assets/css/style.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Persyaratan() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
      once: true, // Animasi hanya akan dimainkan sekali
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="header-persyaratan bg-primary-2">
        <div className="max-w-screen-xl mx-auto lg:py-6 p-5">
          <div className="flex mb-2">
            <a href="/" className="text-white text-sm">
              Home
            </a>
            <span className="mx-3" style={{ color: "#8894f6" }}>
              /
            </span>
            <p className="text-white text-sm">Persyaratan</p>
          </div>
          <h1 className="text-3xl text-white">
            Persyaratan Pendaftaran Wisuda
          </h1>
        </div>
      </div>
      <SyaratComponent />
      <Footer />
    </>
  );
}

export default Persyaratan;
