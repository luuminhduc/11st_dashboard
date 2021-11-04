import * as actions from '../action/modalAction/actionTypes';

const initialState = {
    active:false,
    title:"",
    content:"",
    action:"",
}

export default function modalReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.SHOW_MODAL: return{...payload,active:true};
        case actions.HIDE_MODAL:return initialState;
        default: return state;
    }
}