import React from "react";
import AddCategory from "../../components/AddCategory";
import CategoryList from "../../components/CategoryList";

const Category = () => {
  return (
    <div className="md:grid grid-cols-2 gap-14">
      <CategoryList />

      <div>
        <AddCategory />
      </div>
    </div>
  );
};

export default Category;
