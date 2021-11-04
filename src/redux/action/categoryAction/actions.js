import * as actions from './actionTypes';
import firebase from '../../../firebase/config';

export const addNewCategory = (newCategory,setName) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("categories").add({...newCategory,subCategories:[]}).then(() => {
        setName("")
    }).catch(err=>{
        console.log(err);
    })
}

export const addSubCategory = (categoryId,newSub,reset) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("categories").doc(categoryId).update({
        subCategories: firebase.firestore.FieldValue.arrayUnion(newSub),
    }).then(() => {
        reset();
    }).catch(err => {
        console.log(err);
    })
}

export const deleteSubCategory = (categoryId,sub,reset) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("categories").doc(categoryId).update({
        subCategories: firebase.firestore.FieldValue.arrayRemove(sub),
    }).then(() => {
        reset();
    }).catch(err => {
        console.log(err);
    })
}


export const fetchCategoryList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("categories").orderBy("time","desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id:item.id}));
        dispatch({
            type: actions.FETCH_CATEGORY_LIST,
            payload: docs,
        })
    })
}