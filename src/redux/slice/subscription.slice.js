import { createSlice } from "@reduxjs/toolkit";

const SubscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        status: false,
        subscriptionData: {},
    },
    reducers: {
        SubscriptionDetails: (state, action) => {
            state.subscriptionData = action.payload;
        },
    },
});

export const SubscriptionActions = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
