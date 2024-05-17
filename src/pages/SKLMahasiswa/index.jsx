import { faBars, faInfo, faMaximize, faRightFromBracket, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "../../components/modal";
import AdminLayout from "../../layout/admin-layout";

const SKLMahasiswa = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalName, setModalName] = useState("");

    const sembunyikan = () => {
        setIsHidden(true);
    };

    const layarPenuh = () => {
        if (document.fullscreenEnabled) {
            if (document.fullscreenElement === null) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    };

    const tableData = [
        { id: 1, name: "Artikel" },
        { id: 2, name: "Lembar Pengesahan" },
        { id: 3, name: "Sertifikat Kompetensi" },
    ];

    const handleModalOpen = (id, name) => {
        setModal(id);
        setModalName(name);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AdminLayout>
            <div className="w-5/6 h-[92vh] ml-auto">
                {/* Navbar */}
                <nav className="bg-white px-3 py-5 flex items-center justify-between shadow-md relative">
                    <div className="flex items-center">
                        <button onClick={() => setCollapsed(!collapsed)} className="text-[#00000080] hover:text-black focus:outline-none">
                            <FontAwesomeIcon icon={collapsed ? faTimes : faBars} />
                        </button>
                        <span className="ms-3 text-2xl text-[#00000080] hover:text-black">Pendaftaran Online Wisuda</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={layarPenuh} className="text-[#00000080] hover:text-black focus:outline-none">
                            <FontAwesomeIcon icon={faMaximize} />
                        </button>
                        <div onClick={handleLogout} className="flex items-center text-[#00000080] hover:text-black cursor-pointer">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className="text-base ms-2">Logout</span>
                        </div>
                    </div>
                </nav>
                {/* End of Navbar */}

                <section className="skl bg-[#f4f6f9] pt-1 px-3 pb-5 h-full">
                    <h1 className="font-medium text-black text-2xl my-4">Surat Keterangan Lulus</h1>
                    <div className="bg-white border-t-4 border-blue-600 rounded-b text-black px-4 py-3 shadow-sm w-full" role="alert">
                        {!isHidden && (
                            <div className="flex justify-between w-full bg-[#17a2b8] border-[#148ea1] text-white p-3 font-bold">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faInfo} className="me-2 mt-[-4px]" />
                                    <h5>Mohon Lengkapi Persyarayan Dibawha Ini Sebelum Download SKL</h5>
                                </div>
                                <button onClick={sembunyikan} className="text-[#0c5460] hover:text-black">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        )}
                        <table className="table-auto w-full mt-5">
                            <thead>
                                <tr>
                                    <th className="w-1/12 border py-2">No</th>
                                    <th className="w-7/12 border py-2">Berkas</th>
                                    <th className="w-2/12 border py-2">File</th>
                                    <th className="w-2/12 border py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td className="border text-center py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{data.name}</td>
                                        <td className="border py-2"></td>
                                        <td className="border text-center py-2">
                                            <button onClick={() => handleModalOpen(data.id, data.name)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-sm focus:outline-none">
                                                <FontAwesomeIcon icon={faUpload} className="me-1" />
                                                <span>Upload</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <Modal
                title={"Upload"}
                show={modal}
                onClosed={() => {
                    setModal(modal ? false : true);
                }}
            >
                <label>Upload File {modalName}</label>
                <input type="file" />
            </Modal>
        </AdminLayout>
    );
};

export default SKLMahasiswa;
