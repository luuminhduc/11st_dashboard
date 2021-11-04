import * as actions from './actionTypes';

export const fetchOrderList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("orders").orderBy("time","desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_ORDER_LIST,
            payload:docs,
        })
    })
}

export const searchOrder = (term) => {
    return{
        type: actions.SEARCH_ORDER,
        payload:term,
    }
}

export const sortOrder = (term) => {
    return{
        type: actions.SORT_ORDER,
        payload:term,
    }
}