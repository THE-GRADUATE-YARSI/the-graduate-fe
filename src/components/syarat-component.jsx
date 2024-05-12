import { BsCheck } from "react-icons/bs";
import "../assets/css/style.css";

function SyaratComponent(params) {
  return (
    <div className="syarat-pendaftaran pb-8">
      <div className="max-w-screen-xl mx-auto text-center" data-aos="fade-up">
        {/* <h2 className="text-blue2 text-sm font-bold tracking-wide">
          UNIVERSITAS YARSI
        </h2>
        <h1 className="text-primary text-3xl font-bold">
          Persyaratan Pendaftaran Wisuda
        </h1> */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10 px-5 lg:px-0">
          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              FotoCopy Berwarna Ijazah SMA
            </h2>
          </div>
          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              FotoCopy Berwarna Akte Kelahiran
            </h2>
          </div>

          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              FotoCopy Berwarna Kartu Keluarga
            </h2>
          </div>
          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              Fotocopy Berwarna KTP yg berlaku (diperbesar 4 kali)
            </h2>
          </div>

          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              Fotocopy Berwarna KTM yg berlaku (diperbesar 4 kali)
            </h2>
          </div>
          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              Pas Foto Berwarna
            </h2>
          </div>

          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              Surat Keterangan Kelulusan (SKL)
            </h2>
          </div>
          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              Sertifikat TOEIC
            </h2>
          </div>

          <div
            className="syarat-item flex rounded items-center bg-white lg:px-8 px-5 py-8"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <div className="ikon-ceklis rounded">
              <BsCheck size={24} className="check" />
            </div>
            <h2 className="lg:text-xl text-md text-primary font-bold">
              File Skripsi
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyaratComponent;
