import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import ConfirmationReducer from "./slice/confirmation.slice";
import AppointmentReducer from "./slice/appointment.slice";
import PatientReducer from "./slice/patient.slice";
import QuestionnaireReducer from "./slice/questionnaire.slice";

const store = configureStore({
    reducer: {
        user: UserReducer,
        confirmation: ConfirmationReducer,
        appointment: AppointmentReducer,
        patient: PatientReducer,
        questionnaire: QuestionnaireReducer
    },
});

export default store;
