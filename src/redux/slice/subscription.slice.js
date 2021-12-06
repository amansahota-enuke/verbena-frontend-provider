import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PaymentService } from "../../services";
import statusConstants from "../../constants/status.constants";

const cancelSubscription = createAsyncThunk(
    "subscription/cancelSubscription",
    async (payload, thunkApi) => {
        try {
            console.log(payload)
            const response = await PaymentService.cancelSubscription(
                payload
            )
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const SubscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        status: false,
        subscriptionData: {},
        subscriptionId:"",
    },
    reducers: {
        SubscriptionDetails: (state, action) => {
            state.subscriptionData = action.payload;
        },
        SubscriptionId:(state, action) => {
            state.subscriptionId = action.payload
        }
    },
});

export const SubscriptionActions = {
    ...SubscriptionSlice.actions,
    cancelSubscription
}

export default SubscriptionSlice.reducer;
