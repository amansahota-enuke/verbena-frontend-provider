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
    //Patient Reducer
    patientStatus: (state) => state.patient.status,
    patientList: (state) => state.patient.patientList,
    patientCount: (state) => state.patient.count,
    selectedPatient: (state) => state.patient.selectedPatient,
    //Questionnaire Reducer
    questionnaireStatus: (state) => state.questionnaire.status,
    basicQuestionnaire: (state) => state.questionnaire.basicQuestionnaire,
    questionnaireAnswers: (state) => state.questionnaire.answers,
    // Chat Reducer
    chatStatus:(state)=>state.chat.status,
    messages:(state)=>state.chat.messages,
    notifications:(state)=>state.chat.notifications,
    notificationCount:(state)=>state.chat.notificationCount,
    chatSocket:(state)=>state.chat.socketData,
    //Subscription Details
    subscriptionData:(state)=>state.subscription.subscriptionData,
    subscribedId:(state)=>state.subscription.subscriptionId,
    userSubscriptionDetails:(state)=>state.subscription.data,
    setUpfeeDetails:(state)=>state.subscription.setUpfeeData,
};

export default selector;