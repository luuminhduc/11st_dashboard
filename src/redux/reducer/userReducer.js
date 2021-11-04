import * as actions from '../action/userAction/actionTypes';

const initialState = {
    userList: [],
    searchTerm:"",
    sortTerm:{name:"",method:""},
}

export default function userReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_USER_LIST: return {...state,userList:payload};
        case actions.SEARCH_USER:return{...state,searchTerm:payload};
        case actions.SORT_USER: return {...state,sortTerm:payload};
        default: return state;
    }
}