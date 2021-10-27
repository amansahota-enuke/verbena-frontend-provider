const selector = {
    //User Reducer
    userStatus: (state) => state.user.status,
    user: (state) => state.user.data,
    //Confirmation Reducer
    confirmationStatus: (state) => state.confirmation.status,
    confirmationType: (state) => state.confirmation.type,
    //Appointment Reducer
    appointmentStatus: (state) => state.appointment.status,
    appointmentList: (state) => state.appointment.list,
    appointmentCount: (state) => state.appointment.count,
    selectedAppointment: (state) => state.appointment.selectedAppointment,
    appointmentCancelReasons: (state) => state.appointment.cancelReasons,
    chatMessages:(state)=>state.appointment.messages,
    chatNotifications:(state)=>state.appointment.notifications,
    //Patient Reducer
    patientStatus: (state) => state.patient.status,
    patientList: (state) => state.patient.patientList,
    patientCount: (state) => state.patient.count,
    selectedPatient: (state) => state.patient.selectedPatient,
    //Questionnaire Reducer
    questionnaireStatus: (state) => state.questionnaire.status,
    basicQuestionnaire: (state) => state.questionnaire.basicQuestionnaire,
    questionnaireAnswers: (state) => state.questionnaire.answers,
};

export default selector;