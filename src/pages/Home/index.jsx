import React from "react";
import DisplayStats from "../../components/DisplayStats";
import OrderChat from "../../components/OrderChart";

const Home = () => {
  return (
    <div className="">
      <DisplayStats />
      <div className="">
        <OrderChat />
      </div>
    </div>
  );
};

export default Home;
