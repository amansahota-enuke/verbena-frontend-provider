import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statusConstants from "../../constants/status.constants";
import { ChatService } from "../../services";

const getMessages = createAsyncThunk(
  "chat/messages",
  async (payload, thunkApi) => {
    try {
      const response = await ChatService.getMessages(payload);
      // toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const getNotifications = createAsyncThunk(
  "chat/notifications",
  async (payload, thunkApi) => {
    try {
      const response = await ChatService.getNotifications(payload);
      // toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const updateNotification = createAsyncThunk(
  "chat/updateNotification",
  async (payload, thunkApi) => {
    try {
      const response = await ChatService.updateNotification(payload);
      // toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    status: null,
    messages: [],
    notificationCount: 0,
    notifications: [],
    socketData: "",
    emitMessage: {},
    receiveMessage: {},
  },
  reducers: {
    UserSocket: (state, action) => {
      state.socketData = action.payload;
    },
    EmitMessage: (state, action) => {
      state.emitMessage = action.payload;
    },
    ReceiveMessage: (state, action) => {
      state.receiveMessage = action.payload;
    },
  },
  extraReducers: {
    [getMessages.pending]: (state) => {
      state.status = statusConstants.PENDING;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.status = statusConstants.FULFILLED;
      state.messages = action.payload;
    },
    [getMessages.rejected]: (state) => {
      state.status = statusConstants.REJECTED;
    },
    [getNotifications.pending]: (state) => {
      state.status = statusConstants.PENDING;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.status = statusConstants.FULFILLED;
      state.notifications = action.payload.messages;
      state.notificationCount = action.payload.unseenMessagesCount;
    },
    [getNotifications.rejected]: (state) => {
      state.status = statusConstants.REJECTED;
    },
    [updateNotification.pending]: (state) => {
      state.status = statusConstants.PENDING;
    },
    [updateNotification.fulfilled]: (state, action) => {
      state.status = statusConstants.FULFILLED;
    },
    [updateNotification.rejected]: (state) => {
      state.status = statusConstants.REJECTED;
    },
  },
});

export const ChatActions = {
  ...ChatSlice.actions,
  getMessages,
  getNotifications,
  updateNotification,
};

export default ChatSlice.reducer;
