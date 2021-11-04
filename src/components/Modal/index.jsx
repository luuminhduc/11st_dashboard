import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hideModal } from "../../redux/action/modalAction/actions";

const Modal = () => {
  const { active, title, content, action } = useSelector(
    (state) => state.modalReducer
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    if (action) action();
    dispatch(hideModal());
  };

  return active ? (
    <div className="fixed top-0 z-40 left-0 h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
      <div className="w-full bg-white rounded shadow-sm px-5 py-8 md:max-w-md">
        <h2 className="font-semibold text-xl mb-3">{title}</h2>
        <p className="mb-5">{content}</p>
        <div className="flex flex-row justify-start items-center">
          {action && (
            <button
              onClick={() => dispatch(hideModal())}
              className="bg-coolGray-200 px-3 py-1 rounded cursor-pointer mr-3"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleOk}
            className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer mr-3"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
