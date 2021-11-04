import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { searchUser } from "../../redux/action/userAction/actions";
import UserTable from "../UserTable";

const UserList = () => {
  const { userList, searchTerm, sortTerm } = useSelector(
    (state) => state.userReducer
  );
  const { name, method } = sortTerm;
  const [finalList, setFinalList] = useState([]);
  const { orderList } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPag, setNumOfPag] = useState(1);
  const limit = 5;

  const [pagArr, setPagArr] = useState([1]);

  const [pagList, setPagList] = useState([]);

  useEffect(() => {
    if (numOfPag > 1) {
      const arr = [];
      for (let i = 1; i <= numOfPag; i++) {
        arr.push(i);
      }
      setPagArr(arr);
    } else {
      setPagArr([1]);
    }
  }, [numOfPag]);

  useEffect(() => {
    if (finalList.length > 5) {
      const num = Math.ceil(finalList.length / limit);
      setNumOfPag(num);
    } else {
      setNumOfPag(1);
    }
  }, [finalList, limit]);

  useEffect(() => {
    setListWithPag();
    // eslint-disable-next-line
  }, [finalList, currentPage, limit, numOfPag]);

  // console.log(finalList);

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

  const getMoneySpent = (id) => {
    const list = orderList.filter((el) => el.uid === id);
    let result = 0;
    if (list.length > 0) {
      result = list
        .map((el) => +el.price * +el.quantity)
        .reduce((a, b) => (a += b));
    }
    return +result;
  };

  useEffect(() => {
    if (userList.length > 0) {
      if (sortTerm.name) {
        sortList(userList);
      } else {
        filterBySearchTerm(userList);
      }
    }
    // eslint-disable-next-line
  }, [userList, sortTerm, searchTerm]);

  const filterBySearchTerm = (list) => {
    const newList = list.filter(
      (el) =>
        el.email.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 ||
        el?.address?.phoneNumber?.indexOf(searchTerm) > -1
    );
    setFinalList(newList);
  };

  const sortList = (list) => {
    switch (name) {
      case "money":
        sortByMoney(list);
        break;
      default:
        sortByEmail(list);
    }
  };

  const sortByMoney = (list) => {
    if (name === "money") {
      if (method === "asc") {
        list.sort((a, b) => getMoneySpent(a.id) - getMoneySpent(b.id));
      } else {
        list.sort((a, b) => getMoneySpent(b.id) - getMoneySpent(a.id));
      }
      filterBySearchTerm(list);
    }
  };

  const sortByEmail = (list) => {
    if (name === "email") {
      if (method === "asc") {
        list.sort(
          (a, b) =>
            a.email.toUpperCase().charCodeAt() -
            b.email.toUpperCase().charCodeAt(0)
        );
      } else {
        list.sort(
          (a, b) =>
            b.email.toUpperCase().charCodeAt() -
            a.email.toUpperCase().charCodeAt(0)
        );
      }
    }
    filterBySearchTerm(list);
  };

  return (
    <div>
      <div className="w-full mb-12 mx-auto mt-10">
        <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded-md">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="flex w-full py-5 flex-row justify-between items-center">
                <input
                  type="text"
                  onChange={(e) => dispatch(searchUser(e.target.value))}
                  value={searchTerm}
                  placeholder="Search product"
                  className="p-3 rounded md:w-1/3 border border-coolGray-200 border-solid w-1/2 focus:outline-none focus:border-sky-600"
                />
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <UserTable list={pagList} />
          </div>
          <div className="p-6 flex flex-row border-t border-solid border-coolGray-200 justify-between items-center">
            <div></div>
            <div className="flex flex-row justify-end items-center">
              {pagArr.map((el, i) => (
                <p
                  onClick={() => setCurrentPage(el)}
                  className={`h-8 w-8 ml-3 rounded-full ${
                    currentPage === el
                      ? "bg-sky-700 text-white"
                      : "bg-coolGray-100 text-coolGray-500 hover:bg-sky-700 hover:text-white"
                  }  flex justify-center items-center cursor-pointer text-sm`}
                  key={i}
                >
                  {el}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
