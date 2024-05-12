import React from "react";
import Sidebar from "../components/sidebar";
import AdminFooter from "../components/admin-footer";

const AdminLayout = (props) => {
  return (
    //containernya kusaya hapus bgnya jadi ndak bisa full
    <section>
      <Sidebar />
      {props.children}

      <AdminFooter />
    </section>
  );
};

export default AdminLayout;
