export default {
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
};
