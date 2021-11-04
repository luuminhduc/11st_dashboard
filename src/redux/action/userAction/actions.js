import * as actions from './actionTypes';

export const fetchUserList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("users").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_USER_LIST,
            payload:docs,
        })
    })
}

export const searchUser = (term) => {
    return{
        type: actions.SEARCH_USER,
        payload:term
    }
}

export const sortUser = (data) => {
    return{
        type: actions.SORT_USER,
        payload:data
    }
}