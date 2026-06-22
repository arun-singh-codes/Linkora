import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./reducer/postReducer/index.js";
import authReducer from "./reducer/authReducer/index.js";
import connectionReducer from "./reducer/connectionReducer/index.js";

export const store = configureStore({
    reducer:{
        auth : authReducer,          //   here auth is not necerally the name of slice
        post:  postReducer,
        connection: connectionReducer 
    }
})