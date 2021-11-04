import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/action/productAction/actions";

const SearchProduct = () => {
  const { searchTerm } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  return (
    <input
      type="text"
      onChange={(e) => dispatch(searchProduct(e.target.value))}
      value={searchTerm}
      placeholder="Search product"
      className="p-3 rounded border border-coolGray-200 border-solid w-1/3 focus:outline-none focus:border-sky-600"
    />
  );
};

export default SearchProduct;
