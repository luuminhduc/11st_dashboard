import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { timeStamp } from "../../firebase/config";
import { addNewCategory } from "../../redux/action/categoryAction/actions";
const AddCategory = () => {
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onAddCategory = () => {
    if (name) {
      if (
        !categoryList
          .map((el) => el.name.toUpperCase())
          .includes(name.toUpperCase())
      ) {
        const newCategory = { name, time: timeStamp() };
        dispatch(addNewCategory(newCategory, setName));
      } else {
        alert("Ngu");
      }
    }
  };

  return (
    <div className="bg-white shadow p-5 rounded-sm w-full">
      <h3 className="font-semibold">Add new category</h3>
      <div className="mt-3 flex flex-row justify-between items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="flex-grow focus:outline-none focus:shadow-sm bg-coolGray-100 rounded p-2"
          placeholder="Category..."
        />
        <button
          onClick={onAddCategory}
          className="py-2 px-5 bg-coolGray-800 rounded text-white ml-3"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
