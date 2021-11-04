import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { sortUser } from "../../redux/action/userAction/actions";
import { convertMoney } from "../../utils/money";
import ArrowSort from "../ArrowSort";

const UserTable = ({ list }) => {
  const { orderList } = useSelector((state) => state.orderReducer);
  const { sortTerm } = useSelector((state) => state.userReducer);

  const getMoneySpent = (id) => {
    const list = orderList.filter((el) => el.uid === id);
    let result = 0;
    if (list.length > 0) {
      result = list
        .map((el) => +el.price * +el.quantity)
        .reduce((a, b) => (a += b));
    }
    return convertMoney(result);
  };

  const renderBody = () => {
    return list.map((item, idx) => (
      <tr className="hover:bg-coolGray-50" key={idx}>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {item.email}
        </td>

        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {getMoneySpent(item.id)}$
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.address?.phoneNumber}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-row justify-start items-center">
            <NavLink to={`/users/${item.id}`}>
              <button className="ml-3 bg-blue-500 text-white px-2 py-1 rounded">
                Detail
              </button>
            </NavLink>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <table className="items-center bg-transparent w-full border-collapse ">
      <thead>
        <tr>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Email</p>
              <ArrowSort
                sortTerm={sortTerm}
                term={"email"}
                switchSort={sortUser}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Money spent</p>
              <ArrowSort
                sortTerm={sortTerm}
                term={"money"}
                switchSort={sortUser}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Phone Number
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Status
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {list.length > 0 && renderBody()}

        {/* {list.length > 0 ? (
          list.map((item, idx) => (
            <tr className="hover:bg-coolGray-50" key={idx}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                {item.email}
              </td>

              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {getMoneySpent(item.id)}$
              </td>
              <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item?.address?.phoneNumber}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex flex-row justify-start items-center">
                  <NavLink to={`/users/${item.id}`}>
                    <button className="ml-3 bg-blue-500 text-white px-2 py-1 rounded">
                      Detail
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>No item</tr>
        )} */}
      </tbody>
    </table>
  );
};

export default UserTable;
