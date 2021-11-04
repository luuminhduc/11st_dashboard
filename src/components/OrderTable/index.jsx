import React from "react";
import ArrowSort from "../ArrowSort";
import { useSelector } from "react-redux";

import { sortOrder } from "../../redux/action/orderAction/actions";

const OrderTable = ({ list }) => {
  const { sortName } = useSelector((state) => state.orderReducer);
  const getDate = (time) => {
    const date = time.toDate();
    return (
      <p>
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </p>
    );
  };

  return (
    <table className="items-center bg-transparent w-full border-collapse ">
      <thead>
        <tr>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Photo
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Title</p>
              <ArrowSort
                sortTerm={sortName}
                switchSort={sortOrder}
                term={"title"}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Price</p>
              <ArrowSort
                sortTerm={sortName}
                term={"price"}
                switchSort={sortOrder}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Date</p>
              <ArrowSort
                sortTerm={sortName}
                term={"time"}
                switchSort={sortOrder}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="text-left flex justify-end items-end">Action</div>
          </th>
        </tr>
      </thead>

      <tbody>
        {list.length > 0 &&
          list.map((item, idx) => (
            <tr className="hover:bg-coolGray-50" key={idx}>
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                <img src={item.photo} className="w-12" alt="" />
              </th>

              <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                <p className="w-44 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.title}
                </p>
              </td>
              <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.price} $
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.time && getDate(item.time)}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex flex-row justify-end items-center">
                  <button className="ml-3 bg-blue-500 text-white px-2 py-1 rounded">
                    Detail
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
