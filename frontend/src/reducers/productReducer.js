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
export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCT_SUCCESS: 
            return {
                loading: false,
                products: action.payload.product,
                productsCount: action.payload.productCount,
                productsPerPage: action.payload.productPerPage,
                // productFilter:action.payload.productFilterCount,

            };
        case PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}



export const productDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}