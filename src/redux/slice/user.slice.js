import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TokenService, UserService } from "../../services";
import StatusConstants from "../../constants/status.constants";

const login = createAsyncThunk("user/login", async (payload, thunkApi) => {
    try {
        const response = await UserService.login(payload);
        TokenService.setToken(response.data.data.token);
        toast.success(response.data.message);
        return response.data.data.patient;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkApi.rejectWithValue("error");
    }
});

const signUp = createAsyncThunk("user/signUp", async (payload, thunkApi) => {
    try {
        const response = await UserService.signUp(payload);
        TokenService.setToken(response.data.data.token);
        toast.success(response.data.message);
        return response.data.data.patient;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkApi.rejectWithValue("error");
    }
});

const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (payload, thunkApi) => {
        try {
            const response = await UserService.forgotPassword(payload);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const updatePassword = createAsyncThunk(
    "user/updatePassword",
    async (payload, thunkApi) => {
        try {
            const response = await UserService.updatePassword(payload);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const getProfile = createAsyncThunk(
    "user/getProfile",
    async (payload, thunkApi) => {
        try {
            const response = await UserService.getProfile();
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (payload, thunkApi) => {
        try {
            const response = await UserService.updateProfile(payload);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const UserActions = {
    login,
    signUp,
    forgotPassword,
    updatePassword,
    getProfile,
    updateProfile,
};

const UserSlice = createSlice({
    name: "user",
    initialState: {
        status: null,
        data: {},
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [login.fulfilled]: (state, action) => {
            state.status = StatusConstants.FULFILLED;
            state.data = action.payload;
        },
        [login.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [signUp.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [signUp.fulfilled]: (state, action) => {
            state.status = StatusConstants.FULFILLED;
            state.data = action.payload;
        },
        [signUp.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [forgotPassword.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [forgotPassword.fulfilled]: (state) => {
            state.status = StatusConstants.FULFILLED;
        },
        [forgotPassword.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [updatePassword.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [updatePassword.fulfilled]: (state) => {
            state.status = StatusConstants.FULFILLED;
        },
        [updatePassword.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [getProfile.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [getProfile.fulfilled]: (state, action) => {
            state.status = StatusConstants.FULFILLED;
            state.data = action.payload;
        },
        [getProfile.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
        [updateProfile.pending]: (state) => {
            state.status = StatusConstants.PENDING;
        },
        [updateProfile.fulfilled]: (state) => {
            state.status = StatusConstants.FULFILLED;
            state.data = {};
        },
        [updateProfile.rejected]: (state) => {
            state.status = StatusConstants.REJECTED;
        },
    },
});

export default UserSlice.reducer;
