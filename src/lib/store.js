import {configureStore} from "@reduxjs/toolkit";
import pestReducer from "@/lib/features/pest/pestSlice";


export default configureStore({
    reducer: {
        pests : pestReducer,
    },
});