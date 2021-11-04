import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addSubCategory,
  deleteSubCategory,
} from "../../redux/action/categoryAction/actions";
import { showModal } from "../../redux/action/modalAction/actions";

const CategoryItem = ({ item }) => {
  const { name, subCategories, id } = item;
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);

  const { productList } = useSelector((state) => state.productReducer);

  const [sub, setSub] = useState("");

  const reset = () => {
    setSub("");
    setIsAdd(false);
  };

  const onAddSub = (e) => {
    e.preventDefault();
    if (sub) {
      dispatch(addSubCategory(id, sub, reset));
    }
  };

  const onDeleteSubCategory = (el) => {
    if (
      productList.filter(
        (e) => e.subCategory.toUpperCase() === el.toUpperCase()
      ).length <= 0
    ) {
      dispatch(
        showModal({
          title: "Delete",
          content: "Are you sure you want to delete this?",
          action: () => dispatch(deleteSubCategory(id, el, reset)),
        })
      );
    } else {
      dispatch(
        showModal({
          title: "Delete",
          content: "You can not delete this subcategory",
        })
      );
    }
  };

  return (
    <div className="mb-3">
      <p className="font-semibold">{name}</p>
      <div className="p-5 rounded-3xl mt-1">
        <div className="flex flex-wrap">
          {subCategories.length > 0 ? (
            subCategories.map((el, i) => (
              <div
                className="px-3 py-1 relative bg-coolGray-100 mb-2 mr-2 text-sm rounded"
                key={i}
              >
                <svg
                  onClick={() => onDeleteSubCategory(el)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 absolute -top-2 p-1 cursor-pointer rounded-full bg-red-100 -right-2 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {el}
              </div>
            ))
          ) : (
            <p className="text-sm mr-3">No sub category</p>
          )}
          {isAdd ? (
            <form onSubmit={onAddSub} className="relative">
              <svg
                onClick={() => setIsAdd(false)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 bg-coolGray-200 p-1 rounded-full cursor-pointer absolute -top-3 -right-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <input
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                className="p-2 rounded border border-solid border-coolGray-200"
                placeholder="Sub category"
              />
            </form>
          ) : (
            <svg
              onClick={() => setIsAdd(true)}
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
