import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/productReducer'

const reducer = combineReducers({
    products:productReducer,
    productDetail:productDetailsReducer,
})

let initialstate = []
const middleware = [thunk]
const Store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))



export default Store