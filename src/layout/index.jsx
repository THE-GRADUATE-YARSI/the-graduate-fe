import React from "react";

const MainLayouts = (props) => {
  return (
    //containernya kusaya hapus bgnya jadi ndak bisa full
    <section className="">
      <div className="grid grid-cols-1">
        <div className="col-span-full">{props.children}</div>
      </div>
    </section>
  );
};

export default MainLayouts;
