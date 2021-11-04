import React from "react";

const Header = ({ sidebar, setSidebar }) => {
  return (
    <div
      className={`fixed top-0 z-10 left-0 w-screen bg-white shadow-sm py-2 ${
        sidebar ? "pl-60" : "pl-24"
      }`}
    >
      <p>Header</p>
    </div>
  );
};

export default Header;
