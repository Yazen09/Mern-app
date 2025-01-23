import { combineReducers } from "@reduxjs/toolkit";
import contactReducer from "./contact"
import userReducer from "./user"


const rootReducer = combineReducers({contactReducer, userReducer})


export default rootReducer