import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AppointmentService } from "../../services";
import statusConstants from "../../constants/status.constants";

const fetchAppointmentCancelReasons = createAsyncThunk(
    "appointment/fetchAppointmentCancelReasons",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.getAppointmentCancelReason();
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const fetchAppointmentList = createAsyncThunk(
    "appointment/fetchAppointmentList",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.getAppointmentList(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const fetchAppointmentDetail = createAsyncThunk(
    "appointment/fetchAppointmentDetail",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.getAppointmentDetail(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const updateAppointment = createAsyncThunk(
    "appointment/updateAppointment",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.updateAppointment(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const updateAppointmentStatus = createAsyncThunk(
    "appointment/updateAppointmentStatus",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.updateAppointmentStatus(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const rescheduleAppointment = createAsyncThunk(
    "appointment/rescheduleAppointment",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.rescheduleAppointment(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const cancelAppointment = createAsyncThunk(
    "appointment/cancelAppointment",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.cancelAppointment(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const sendMessage = createAsyncThunk(
    "user/message",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.sendMessage(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const getMessages = createAsyncThunk(
    "user/messages",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.getMessages(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const getNotifications = createAsyncThunk(
    "user/notifications",
    async (payload, thunkApi) => {
        try {
            const response = await AppointmentService.getNotifications(
                payload
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const AppointmentActions = {
    fetchAppointmentCancelReasons,
    fetchAppointmentList,
    fetchAppointmentDetail,
    updateAppointment,
    updateAppointmentStatus,
    rescheduleAppointment,
    cancelAppointment,
    getMessages,
    sendMessage,
    getNotifications
};

const AppointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        status: null,
        cancelReasons: [],
        count: 0,
        list: [],
        selectedAppointment: {},
        messages:[],
        notifications:[]
    },
    extraReducers: {
        [fetchAppointmentCancelReasons.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchAppointmentCancelReasons.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.cancelReasons = action.payload;
        },
        [fetchAppointmentCancelReasons.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [fetchAppointmentList.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchAppointmentList.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.count = action.payload.count;
            state.list = action.payload.rows;
        },
        [fetchAppointmentList.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [fetchAppointmentDetail.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchAppointmentDetail.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.selectedAppointment = action.payload;
        },
        [fetchAppointmentDetail.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        
        [updateAppointment.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [updateAppointment.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
        },
        [updateAppointment.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [updateAppointmentStatus.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [updateAppointmentStatus.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
        },
        [updateAppointmentStatus.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [rescheduleAppointment.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [rescheduleAppointment.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
        },
        [rescheduleAppointment.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [cancelAppointment.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [cancelAppointment.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
        },
        [cancelAppointment.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [getMessages.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [getMessages.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.messages = action.payload.rows;
        },
        [getMessages.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [sendMessage.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [sendMessage.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
        },
        [sendMessage.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [getNotifications.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [getNotifications.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.notifications = action.payload.rows;
        },
        [getNotifications.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
    },
});

export default AppointmentSlice.reducer;
