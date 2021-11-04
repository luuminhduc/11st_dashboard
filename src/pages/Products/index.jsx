import React from "react";
import { useDispatch } from "react-redux";
import ProductList from "../../components/ProductList";
import { showAddProduct } from "../../redux/action/productAction/actions";

const Products = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(showAddProduct())}
        className="px-6 py-3 rounded bg-sky-700 hover:bg-sky-800 text-white"
      >
        Add new product
      </button>
      <ProductList />
    </div>
  );
};

export default Products;
