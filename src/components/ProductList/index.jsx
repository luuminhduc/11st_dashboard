import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  hideLoading,
  showLoading,
} from "../../redux/action/loadingAction/actions";
import { reset } from "../../redux/action/productAction/actions";

import FilterByCategory from "../FilterByCategory";
import ProductPagination from "../ProductPagination";
import ProductTable from "../ProductTable";
import SearchProduct from "../SearchProduct";

const ProductList = () => {
  const { productList, filterTerm, searchTerm, sortTerm } = useSelector(
    (state) => state.productReducer
  );

  const { name, method } = sortTerm;

  const [finalList, setFinalList] = useState([]);
  const [pagList, setPagList] = useState([]);
  const limit = 5;
  const [numOfPag, setNumOfPag] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length > 0) {
      setFinalList(productList);
    }
  }, [productList]);

  // Condition to run
  useEffect(() => {
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
    }, [800]);
    let arr = [];
    if (filterTerm === "All") {
      arr = [...productList];
    } else {
      arr = [...productList].filter((el) => el.category === filterTerm);
    }
    if (sortTerm.name) {
      sortingList(arr);
    } else {
      filterBySearch(arr);
    }
    // eslint-disable-next-line
  }, [filterTerm, productList, searchTerm, sortTerm, dispatch]);

  useEffect(() => {
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
    }, [800]);
    setListWithPag();
    // eslint-disable-next-line
  }, [finalList, currentPage, limit, numOfPag, dispatch]);

  const filterBySearch = (arr) => {
    const list = arr.filter(
      (el) => el.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
    );
    setFinalList(list);
  };

  const setListWithPag = () => {
    let list;
    let start = 0;
    let end = 5;
    if (currentPage === 1) {
    } else {
      start = (currentPage - 1) * limit;
      end = start + 5;
      console.log(start, end);
    }
    list = [...finalList].slice(start, end);
    setPagList(list);
  };

  const sortingList = (arr) => {
    switch (name) {
      case "price":
        sortByPrice(arr);
        break;
      case "category":
        sortByCategory(arr);
        break;
      default:
        sortByTitle(arr);
    }
  };

  const sortByTitle = (arr) => {
    if (name === "title") {
      if (method === "asc") {
        arr.sort(
          (a, b) =>
            a.title.toUpperCase().charCodeAt(0) -
            b.title.toUpperCase().charCodeAt(0)
        );
      } else {
        arr.sort(
          (a, b) =>
            b.title.toUpperCase().charCodeAt(0) -
            a.title.toUpperCase().charCodeAt(0)
        );
      }
      filterBySearch(arr);
    }
  };
  const sortByPrice = (arr) => {
    if (name === "price") {
      if (method === "asc") {
        arr.sort((a, b) => +a.price - +b.price);
      } else {
        arr.sort((a, b) => +b.price - +a.price);
      }
      filterBySearch(arr);
    }
  };
  const sortByCategory = (arr) => {
    if (name === "category") {
      if (method === "asc") {
        arr.sort(
          (a, b) =>
            a.category.toUpperCase().charCodeAt(0) -
            b.category.toUpperCase().charCodeAt(0)
        );
      } else {
        arr.sort(
          (a, b) =>
            b.category.toUpperCase().charCodeAt(0) -
            a.category.toUpperCase().charCodeAt(0)
        );
      }
      filterBySearch(arr);
    }
  };

  useEffect(() => {
    if (finalList.length > 0) {
      setNumOfPag(Math.ceil(finalList.length / limit));
    } else {
      setNumOfPag(1);
    }
  }, [finalList, limit]);

  return (
    <div className="w-full">
      <div className="w-full mb-12 mx-auto mt-10">
        <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded-md">
          <div className="rounded-t mb-0 px-4 py-8 border-0">
            <button
              onClick={() => dispatch(reset())}
              className="mb-5 px-3 py-1 bg-coolGray-200 rounded"
            >
              Reset
            </button>
            <div className="flex flex-row justify-between items-center">
              <SearchProduct />
              <FilterByCategory />
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <ProductTable list={pagList} />
            <ProductPagination
              numOfPag={numOfPag}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
