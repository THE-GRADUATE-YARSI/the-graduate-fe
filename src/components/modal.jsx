import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal = ({ show, title, children, onClosed, onSave, isLoading, onEdit }) => {
    return (
        <div className={`${show ? "flex" : "hidden"} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50`}>
            <div className="relative p-4 w-full max-w-md">
                <form onSubmit={onEdit ? () => {} : onSave}>
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onClosed}>
                                <FontAwesomeIcon icon={faTimes} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 space-y-4">{children}</div>
                        <div className="flex items-center p-4 border-t border-gray-200 rounded-b justify-between space-x-3 text-sm">
                            <button type="button" className="text-gray-500 border-1 border-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300 font-medium" onClick={onClosed}>
                                Close
                            </button>
                            {onEdit ? (
                                <button type="button" className={`text-white border-1 bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-400 transition-all duration-300 font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading} onClick={onEdit}>
                                    {isLoading ? "Processing" : "Edit"}
                                </button>
                            ) : (
                                <button type="submit" className={`text-white border-1 bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-400 transition-all duration-300 font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
                                    {isLoading ? "Processing" : "Simpan"}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
