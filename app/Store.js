import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import contactReducer from "./Features/Contact/ContactSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactReducer,
    },
});