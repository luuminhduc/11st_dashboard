import { firebaseReducer } from "react-redux-firebase";
import {combineReducers} from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import orderReducer from './orderReducer';

export default combineReducers({
    firebaseReducer,
    productReducer,
    categoryReducer,
    modalReducer,
    userReducer,
    loadingReducer,
    orderReducer,
})