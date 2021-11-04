import { storage } from '../../../firebase/config';
import { hideLoading, showLoading } from '../loadingAction/actions';
import  * as actions from './actionTypes';

export const fetchProductList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("products").orderBy("time", "desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_PRODUCT_LIST,
            payload:docs,
        })
    })
}

export const addNewProduct = (newProduct,done) => async (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    const file = newProduct.file[0];
    const storageRef = storage.ref(file.name);
    console.log(file.name);
    storageRef.put(file).on('state_changed', (snap) => {
        console.log(snap);
    }, (err) => {
        console.log("Error in storage");
    }, async () => {
        const url = await storageRef.getDownloadURL();
      delete newProduct.file;
      const product = {...newProduct,photo:url};
      firestore.collection("products").add(product).then(() => {
        dispatch(fetchProductList());

          done();
          dispatch(hideLoading());
      })
      .catch(err => {
          console.log(err);
          dispatch(hideLoading());

      })
    })
}

export const deleteProduct = (id) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("products").doc(id).delete()
    .then(() => {

    })
    .catch(err=>{
        console.log(err);
    })
}

export const showAddProduct = () => {
    return {
        type: actions.SHOW_ADD_PRODUCT,
        payload:true,
    }
}


export const hideAddProduct = () => dispatch => {
    dispatch(selectProduct(null));
    dispatch({
        type: actions.HIDE_ADD_PRODUCT,
        payload:false,
    })
}

export const selectProduct = (product) => dispatch => {
    
        dispatch(showAddProduct());
   
    dispatch({
        type: actions.SELECT_PRODUCT,
        payload:product,
    })
}

export const editProduct = (editedProduct) => async (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    const {id,title,price,inventory,description,category,subCategory} = editedProduct;
    firestore.collection("products").doc(id).update({
        title,
        price,
        inventory,
        description,
        category,
        subCategory
    })
    .then(() => {
        dispatch(fetchProductList());
        dispatch(hideAddProduct());
        dispatch(hideLoading());
    })
    .catch(err => {
        dispatch(hideLoading());

        console.log(err);
    })
}

export const filterByCategory = (term) => {
    return{
        type: actions.FILTER_BY_CATEGORY,
        payload:term,
    }
}

export const searchProduct = (term) => {
    return{
        type: actions.SEARCH_PRODUCT,
        payload:term,
    }
}

export const switchSort = (method) => {
    return{
        type: actions.SWITCH_SORT,
        payload:method,
    }
}

export const reset = () => {
    return{
        type: actions.RESET,
    }
}
