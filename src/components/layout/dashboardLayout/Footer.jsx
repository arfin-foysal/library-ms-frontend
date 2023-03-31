import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="py-2 shadow-lg d-flex justify-content-between px-3">
      <div>
        {" "}
        <p className="p-0 m-0 fw-bold "> Arfin Foysal. © {year}.</p>
      </div>
      <div>
        <p className="p-0 m-0 fw-bold ">Powered by Arfin Foysal.</p>
      </div>
    </div>
  );
};

export default Footer;
