import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import ConfirmationReducer from "./slice/confirmation.slice";

const store = configureStore({
    reducer: {
        user: UserReducer,
        confirmation: ConfirmationReducer,
    },
});

export default store;
