import React from "react";
import { useSelector } from "react-redux";
import CategoryItem from "../CategoryItem";

const CategoryList = () => {
  const categoryReducer = useSelector((state) => state.categoryReducer);

  const { categoryList } = categoryReducer;

  return (
    <div className="p-5 rounded bg-white shadow">
      {categoryList.length > 0 &&
        categoryList.map((item, idx) => <CategoryItem item={item} key={idx} />)}
    </div>
  );
};

export default CategoryList;
