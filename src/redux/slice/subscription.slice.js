import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PaymentService } from "../../services";
import StatusConstants from "../../constants/status.constants";

const checkSubscription = createAsyncThunk(
    "subscription/checkSubscription",
    async (payload, thunkApi) => {
        try {
            const response = await PaymentService.getSubscriptionDetails()
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const checkSetUpfeeDetails = createAsyncThunk(
    "subscription/checkSetupFeeDetails",
    async (payload, thunkApi) => {
        try {
            const response = await PaymentService.fetchSetupFeeDetails()
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const cancelSubscription = createAsyncThunk(
    "subscription/cancelSubscription",
    async (payload, thunkApi) => {
        try {
            const response = await PaymentService.cancelSubscription(
                payload
            )
            // toast.success(response.data.message);
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
        setupFeeStatus: false,
        data: {},
        setUpfeeData: {},
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
    extraReducers: {
        [checkSubscription.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [checkSubscription.fulfilled]: (state, action) => {
            state.status = StatusConstants.FULFILLED;
            state.data = action.payload;
        },
        [checkSubscription.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [checkSetUpfeeDetails.pending]: (state) => {
            state.setupFeeStatus = StatusConstants.PENDING;
        },
        [checkSetUpfeeDetails.fulfilled]: (state, action) => {
            state.setupFeeStatus = StatusConstants.FULFILLED;
            state.setUpfeeData = action.payload;
        },
        [checkSetUpfeeDetails.rejected]: (state) => {
            state.setupFeeStatus = StatusConstants.REJECTED;
        },
    },
});

export const SubscriptionActions = {
    ...SubscriptionSlice.actions,
    cancelSubscription,
    checkSubscription,
    checkSetUpfeeDetails,
}

export default SubscriptionSlice.reducer;
