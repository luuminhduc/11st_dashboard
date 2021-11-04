import * as actions from '../action/productAction/actionTypes';

const initialState = {
    productList:[],
    isAdd:false,
    selectedProduct:"",
    filterTerm:"All",
    searchTerm:"",
    sortTerm:{name:"",method:""},
}

export default function productReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_PRODUCT_LIST: return {...state,productList:payload};
        case actions.SHOW_ADD_PRODUCT: case actions.HIDE_ADD_PRODUCT: return{...state,isAdd:payload};
        case actions.SELECT_PRODUCT: return {...state,selectedProduct:payload};
        case actions.FILTER_BY_CATEGORY:return{...state,filterTerm:payload};
        case actions.SEARCH_PRODUCT:return{...state,searchTerm:payload};
        case actions.SWITCH_SORT:return {...state,sortTerm:payload};
        case actions.RESET:return {...state, filterTerm:"All",searchTerm:"",sortTerm:{name:"",method:""}}
        default: return state;
    }
}