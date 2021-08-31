import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statusConstants from "../../constants/status.constants";
import { PatientService } from "../../services";

const fetchPatientList = createAsyncThunk(
    "patient/fetchPatientList",
    async (payload, thunkApi) => {
        try {
            const response = await PatientService.getPatientList(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const fetchPatientDetail = createAsyncThunk(
    "patient/fetchPatientDetail",
    async (payload, thunkApi) => {
        try {
            const response = await PatientService.getPatientDetail(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

export const PatientActions = {
    fetchPatientList,
    fetchPatientDetail,
};

const PatientSlice = createSlice({
    name: "patient",
    initialState: {
        status: null,
        count: 0,
        patientList: [],
        selectedPatient: {},
    },
    extraReducers: {
        [fetchPatientList.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchPatientList.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.count = action.payload.count;
            state.patientList = action.payload.rows;
        },
        [fetchPatientList.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [fetchPatientDetail.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchPatientDetail.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.selectedPatient = action.payload;
        },
        [fetchPatientDetail.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
    },
});

export default PatientSlice.reducer;
