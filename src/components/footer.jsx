import "../assets/css/style.css";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="max-w-screen-xl mx-auto">
          <div className="lg:flex lg:gap-8 gap-5 lg:px-0 px-5">
            <div className="lg:w-5/12">
              <h1 className="flex">
                <img
                  src="https://students-apps.yarsi.ac.id/students02/graduate/public//graduate.png"
                  className="h-10"
                />
                <span className="self-center text-2xl text-xl font-semibold whitespace-nowrap tracking-wide lg:text-3xl text-primary">
                  The Graduate
                </span>
              </h1>
              <p className="mt-5 text-sm">
                The Graduate adalah sebuah perangkat lunak berbasis website yang
                dirancang khusus untuk memberikan kemudahan kepada mahasiswa FTI
                YARSI dalam proses pengumpulan data pendaftaran Wisuda. Platform
                ini membantu mahasiswa untuk dengan mudah mengumpulkan informasi
                penting yang dibutuhkan, sehingga mengurangi beban administratif
                di tengah kesibukan akademis.
              </p>
            </div>
            <div className="lg:w-3/12 lg:text-left text-center lg:mt-0 mt-8">
              <h5 className="font-bold text-md text-primary">CONTACT US</h5>
              <p className="font-semibold text-md mt-5">Universitas YARSI</p>
              <p className="text-sm my-1">
                Menara YARSI, Kav. 13, Jl. Let. Jend. Suprapto. Cempaka Putih,
                Jakarta Pusat, DKI Jakarta. Indonesia. 10510
              </p>
              <p className="text-sm my-1">
                <b>Phone:</b> +62 (21) 4206675
              </p>
              <p className="text-sm my-1">
                <b>Email:</b> registrar@yarsi.ac.id
              </p>
              <p className="text-sm my-1">
                <b>Fax:</b> +62 (21) 4243171
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright text-center py-7 text-primary">
        <div className="container mx-auto">
          <p className="text-sm">© Copyright 2024. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
