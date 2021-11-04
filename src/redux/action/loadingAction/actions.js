import * as actions from './actionTypes';

export const showLoading = () => {
    return{
        type: actions.SHOW_LOADIND,
        payload:true
    }
}

export const hideLoading = () => {
    return{
        // type: actions.HIDE_LOADIND,
        type:actions.HIDE_LOADING,
        payload:false
    }
}