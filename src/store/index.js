import { legacy_createStore as createStore ,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import MainReducer from "../mainreduce";



const store = createStore(MainReducer,{
    item:[],
    totalamount:0
},applyMiddleware(thunk))

export default store