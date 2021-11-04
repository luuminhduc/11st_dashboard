import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.loadingReducer);

  return isLoading ? (
    <div className="fixed top-0 left-0 z-40 bg-coolGray-900 bg-opacity-5 h-screen w-screen flex justify-center items-center">
      <div className="w-14 loading h-14  rounded-full border-4 border-solid border-coolGray-900 border-opacity-5 animate-spin"></div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
