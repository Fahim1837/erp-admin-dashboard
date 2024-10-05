import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "features/api";
import globalReducer from "features/globalSlice";

const store = configureStore ({
    reducer:{ 
        global: globalReducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: (getDefault) => getDefault().concat(adminApi.middleware)
})
setupListeners(store.dispatch)

export default store