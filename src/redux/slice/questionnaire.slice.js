import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { QuestionnaireService } from "../../services";
import statusConstants from "../../constants/status.constants";

const fetchQuestionnaireAnswers = createAsyncThunk(
    "questionnaire/fetchQuestionnaireAnswers",
    async (payload, thunkApi) => {
        try {
            const response = await QuestionnaireService.getAnswers(payload);
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const fetchBasicQuestionnaire = createAsyncThunk(
    "questionnaire/fetchBasicQuestionnaire",
    async (payload, thunkApi) => {
        try {
            const response = await QuestionnaireService.getQuestionnaire(payload);
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

const QuestionnaireSlice = createSlice({
    name: "questionnaire",
    initialState: {
        status: null,
        basicQuestionnaire: [],
        answers: [],
    },
    extraReducers: {
        [fetchQuestionnaireAnswers.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchQuestionnaireAnswers.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.answers = action.payload;
        },
        [fetchQuestionnaireAnswers.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [fetchBasicQuestionnaire.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchBasicQuestionnaire.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.basicQuestionnaire = action.payload;
        },
        [fetchBasicQuestionnaire.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        }
    },
});

export const QuestionnaireActions = {
    fetchBasicQuestionnaire,
    fetchQuestionnaireAnswers,
};

export default QuestionnaireSlice.reducer;
