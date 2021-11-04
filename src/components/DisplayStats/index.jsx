import React from "react";
import { useSelector } from "react-redux";
import { convertMoney } from "../../utils/money";

const DisplayStats = () => {
  const { orderList } = useSelector((state) => state.orderReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { userList } = useSelector((state) => state.userReducer);

  const getProfit = () => {
    let result = 0;
    if (orderList.length > 0)
      result = orderList
        .map((el) => +el.quantity * +el.price)
        .reduce((a, b) => (a += b));
    return result;
  };

  return (
    <div className="grid md:grid-cols-4 gap-10 grid-cols-2">
      <div className="bg-white rounded text-xl shadow-sm p-5">
        <h3 className="text-coolGray-400 mb-3">Profit</h3>
        <p className="font-bold">{convertMoney(getProfit())}$</p>
      </div>
      <div className="bg-white rounded text-xl shadow-sm p-5">
        <h3 className="text-coolGray-400 mb-3">Total Products</h3>
        <p className="font-bold">{productList.length}</p>
      </div>
      <div className="bg-white rounded text-xl shadow-sm p-5">
        <h3 className="text-coolGray-400 mb-3">Total Users</h3>
        <p className="font-bold">{userList.length}</p>
      </div>
      <div className="bg-white rounded text-xl shadow-sm p-5">
        <h3 className="text-coolGray-400 mb-3">Total Orders</h3>
        <p className="font-bold">{orderList.length}</p>
      </div>
    </div>
  );
};

export default DisplayStats;
