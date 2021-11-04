import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterByCategory } from "../../redux/action/productAction/actions";

const FilterByCategory = () => {
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { filterTerm } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  return (
    <select
      value={filterTerm}
      onChange={(e) => dispatch(filterByCategory(e.target.value))}
      className="p-3 rounded border border-coolGray-200 border-solid w-1/3 focus:outline-none focus:border-sky-600"
    >
      {categoryList.length > 0 &&
        [...categoryList, { name: "All" }].map((item, idx) => (
          <option key={idx} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default FilterByCategory;
