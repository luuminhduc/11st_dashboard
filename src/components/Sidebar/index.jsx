import React from "react";
import { NavLink } from "react-router-dom";
import { getIcon } from "../../utils/getIcon";

const Sidebar = ({ sidebar, setSidebar }) => {
  const arr = ["home", "category", "sales", "users", "products"];
  return (
    <div
      className={`bg-coolGray-900 z-20 transition-all text-coolGray-300 fixed top-0 left-0 h-screen ${
        sidebar ? "w-52" : "w-16"
      } pb-5`}
    >
      <div
        className={`mb-3 p-3 flex flex-row ${
          sidebar ? "justify-start" : "justify-start"
        }`}
      >
        <svg
          onClick={() => setSidebar(!sidebar)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      {arr.map((el) => (
        <NavLink
          activeClassName="bg-coolGray-800"
          className={`capitalize mb-3 flex flex-row ${
            sidebar ? "justify-start" : "justify-start"
          } items-start p-3 hover:bg-coolGray-800`}
          key={el}
          to={`/${el}`}
        >
          <p className="">{getIcon(el)}</p>
          {sidebar && <p className="ml-3">{el}</p>}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
