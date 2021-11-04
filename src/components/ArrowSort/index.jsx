import React from "react";
import { useDispatch } from "react-redux";

const ArrowSort = ({ term, switchSort, sortTerm }) => {
  const { name, method } = sortTerm;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center">
      <svg
        onClick={() => dispatch(switchSort({ name: term, method: "asc" }))}
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          term === name && method === "asc"
            ? "text-sky-600"
            : "text-coolGray-300 hover:text-sky-600"
        } h-4 w-4 cursor-pointer`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
      <svg
        onClick={() => dispatch(switchSort({ name: term, method: "desc" }))}
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          term === name && method === "desc"
            ? "text-sky-600"
            : "text-coolGray-300 hover:text-sky-600"
        } h-4 w-4 cursor-pointer`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
};

export default ArrowSort;
