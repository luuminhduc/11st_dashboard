import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Category from "../../pages/Category";
import Home from "../../pages/Home";
import Orders from "../../pages/Orders";
import Products from "../../pages/Products";
import Users from "../../pages/Users";
import { fetchCategoryList } from "../../redux/action/categoryAction/actions";
import { fetchOrderList } from "../../redux/action/orderAction/actions";
import { fetchProductList } from "../../redux/action/productAction/actions";
import { fetchUserList } from "../../redux/action/userAction/actions";
import AddProduct from "../AddProduct";
import Header from "../Header";
import Loading from "../Loading";
import Modal from "../Modal";
import Sidebar from "../Sidebar";
import Notfound from "../../pages/NotFound";
import SingleUser from "../../pages/SingleUser";

const DashBoard = () => {
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchProductList());
    dispatch(fetchUserList());
    dispatch(fetchOrderList());
  }, [dispatch]);

  return (
    <div
      className={`bg-coolGray-100 pb-10 pr-10 text-coolGray-800 min-h-screen min-w-full pt-20 ${
        sidebar ? "pl-60" : "pl-24"
      }`}
    >
      <BrowserRouter>
        <AddProduct />
        <Loading />
        <Modal />
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/category">
            <Category />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/sales">
            <Orders />
          </Route>
          <Route exact path="/users/:userId">
            <SingleUser />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default DashBoard;
