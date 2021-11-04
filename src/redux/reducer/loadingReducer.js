import * as actions from '../action/loadingAction/actionTypes';

const initialState = {
 isLoading:false,
}

export default function loadingReducer(state=initialState,action){
    const{type,payload} = action;
    switch(type){
        case actions.SHOW_LOADIND:case actions.HIDE_LOADING: return{...state,isLoading:payload};
        default: return state;
    }
}