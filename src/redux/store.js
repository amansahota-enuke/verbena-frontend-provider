import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import ConfirmationReducer from "./slice/confirmation.slice";
import AppointmentReducer from "./slice/appointment.slice";
import PatientReducer from "./slice/patient.slice";
import QuestionnaireReducer from "./slice/questionnaire.slice";
import ChatReducer from "./slice/chat.slice";
import SubscriptionReducer from "./slice/subscription.slice"
const store = configureStore({
    reducer: {
        user: UserReducer,
        confirmation: ConfirmationReducer,
        appointment: AppointmentReducer,
        patient: PatientReducer,
        questionnaire: QuestionnaireReducer,
        chat: ChatReducer,
        subscription: SubscriptionReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
    
});

export default store;
