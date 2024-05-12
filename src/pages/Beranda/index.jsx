import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import MainLayouts from "../../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IoBookOutline } from "react-icons/io5";
import { BsMortarboard, BsCheck } from "react-icons/bs";
import "../../assets/css/style.css";
import AnimasiAngka from "../../components/animasi-angka";
import SyaratComponent from "../../components/syarat-component";
import Footer from "../../components/footer";
import AOS from "aos";
import "aos/dist/aos.css";

function Beranda() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
      once: true, // Animasi hanya akan dimainkan sekali
    });
  }, []);

  return (
    <MainLayouts>
      <div className="mx-auto">
        <Navbar />
        <div className="beranda">
          <div className="container mx-auto lg:grid lg:grid-cols-2 flex flex-col-reverse gap-5 h-full">
            <div className="teks-beranda lg:m-auto mx-auto mb-auto">
              <h1
                className="text-primary lg:text-5xl text-3xl mb-5 font-semibold"
                data-aos="fade-up"
              >
                Pendaftaran Wisuda <br /> UNIVERSITAS YARSI
              </h1>
              <button
                className="bg-primary tombol-cta text-white tracking-wide font-medium rounded text-md px-8 py-3 text-center"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Daftar Wisuda
                <FontAwesomeIcon icon={faArrowRight} className="ml-3 fa-icon" />
              </button>
            </div>
            <img
              src="https://students-apps.yarsi.ac.id/students02/graduate/public//3738337.webp"
              alt="gambar-beranda"
              className="lg:my-auto mt-auto"
              data-aos="zoom-out"
              data-aos-delay="200"
            />
          </div>
        </div>
        <div className="data-wisuda max-w-screen-xl px-5 mx-auto lg:my-10 mt-5 lg:pt-6">
          <div
            className="list-wisuda grid lg:grid-cols-3 gap-8 bg-white"
            data-aos="fade-up"
          >
            <div className="flex items-center bg-white px-8 py-10">
              <IoBookOutline size={42} color="#4154f1" className="mr-5" />
              <div>
                <h1 className="lg:text-4xl text-3xl text-primary">
                  <AnimasiAngka end={2} />
                </h1>
                <p className="text-sm">Program Studi</p>
              </div>
            </div>

            <div className="flex items-center bg-white px-8 py-10">
              <BsMortarboard size={42} color="#ee6c20" className="mr-5" />
              <div>
                <h1 className="lg:text-4xl text-3xl text-primary">
                  <AnimasiAngka end={138} />
                </h1>
                <p className="text-sm">Wisudawan</p>
              </div>
            </div>

            <div className="flex items-center bg-white px-8 py-10">
              <BsMortarboard size={42} color="#008000" className="mr-5" />
              <div>
                <h1 className="lg:text-4xl text-3xl text-primary">
                  <AnimasiAngka end={521} />
                </h1>
                <p className="text-sm">Alumni</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="judul-syarat max-w-screen-xl mx-auto text-center lg:pt-10 pt-8"
          data-aos="fade-up"
        >
          <h2 className="text-blue2 text-sm font-bold tracking-wide">
            UNIVERSITAS YARSI
          </h2>
          <h1 className="text-primary text-3xl font-bold">
            Persyaratan Pendaftaran Wisuda
          </h1>
        </div>

        <SyaratComponent />
        <Footer />
      </div>
    </MainLayouts>
  );
}

export default Beranda;
