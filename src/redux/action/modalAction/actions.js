import * as actions from './actionTypes';

export const showModal = (data) => {
    return{
        type: actions.SHOW_MODAL,
        payload:data,
    }
}

export const hideModal = () => {
    return{
        type: actions.HIDE_MODAL,
    }
}