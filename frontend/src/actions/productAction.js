import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
}
    from '../constants/productConstant'
import axios from 'axios'
export const getProduct = (keyword='',currentPage=1, price=[0,11000],category) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST })
        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}`
       
       if(category){
        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}`
       }
        const {data}  = await axios.get(link)
//  if(category)

        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        // console.log(id);
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const {data}  = await axios.get(`http://localhost:5000/api/v1/products/${id}`)
        // console.log(data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}