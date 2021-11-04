import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OrderTable from "../../components/OrderTable";
import { searchOrder } from "../../redux/action/orderAction/actions";
import ProductPagination from "../../components/ProductPagination";

const Orders = () => {
  const dispatch = useDispatch();
  const { orderList, searchTerm, sortName } = useSelector(
    (state) => state.orderReducer
  );
  const { name, method } = sortName;

  const [numOfPag, setNumberOfPag] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [finalList, setFinalList] = useState([]);
  const [pagList, setPagList] = useState([]);
  const limit = 5;

  useEffect(() => {
    if (finalList.length > limit) {
      setNumberOfPag(Math.ceil(finalList.length / limit));
    } else {
      setNumberOfPag(1);
    }
  }, [finalList, limit]);

  useEffect(() => {
    setListWithPag();
    // eslint-disable-next-line
  }, [currentPage, numOfPag, finalList, limit]);

  const setListWithPag = () => {
    let start = 0;
    let end = 5;
    if (currentPage > 1) {
      start = (currentPage - 1) * limit;
      end = start + 5;
    }
    const list = [...finalList].slice(start, end);
    setPagList(list);
  };

  useEffect(() => {
    if (orderList.length > 0) {
      if (sortName.name) {
        const newList = [...orderList];
        sortList(newList);
      } else {
        filterBySearchTerm(orderList);
      }
    }
    // eslint-disable-next-line
  }, [orderList, searchTerm, sortName]);

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
      filterBySearchTerm(arr);
    }
  };

  const sortByPrice = (arr) => {
    if (name === "price") {
      if (method === "asc") {
        arr.sort((a, b) => +a.price - +b.price);
      } else {
        arr.sort((a, b) => +b.price - +a.price);
      }
      filterBySearchTerm(arr);
    }
  };

  const sortByTime = (arr) => {
    if (name === "time") {
      if (method === "asc") {
        arr.sort((a, b) => {
          return a.time.toDate().getTime() - b.time.toDate().getTime();
        });
      } else {
        arr.sort((a, b) => {
          return b.time.toDate().getTime() - a.time.toDate().getTime();
        });
      }
    }
    filterBySearchTerm(arr);
  };

  const sortList = (arr) => {
    const { name } = sortName;
    switch (name) {
      case "time":
        sortByTime(arr);
        break;
      case "price":
        sortByPrice(arr);
        break;
      default:
        sortByTitle(arr);
    }
  };

  const filterBySearchTerm = (list) => {
    const newList = [...list].filter(
      (el) => el.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
    );
    setFinalList(newList);
  };

  return (
    <div className="w-full">
      <div className="w-full mb-12 mx-auto mt-10">
        <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded-md">
          <div className="rounded-t mb-0 px-4 py-8 border-0">
            <div className="flex flex-row justify-between items-center">
              <input
                type="text"
                onChange={(e) => dispatch(searchOrder(e.target.value))}
                value={searchTerm}
                placeholder="Search product"
                className="p-3 rounded border border-coolGray-200 border-solid w-1/3 focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <OrderTable list={pagList} />
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

export default Orders;
