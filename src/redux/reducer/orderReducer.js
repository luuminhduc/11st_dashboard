import * as actions from '../action/orderAction/actionTypes';

const initialState = {
    orderList:"",
    searchTerm:"",
    sortName:{name:"",method:""},
}

export default function orderReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type){
        case actions.FETCH_ORDER_LIST:return {...state,orderList:payload}
        case actions.SEARCH_ORDER:return{...state,searchTerm:payload};
        case actions.SORT_ORDER:return{...state,sortName:payload};
    default: return state;
    }
}