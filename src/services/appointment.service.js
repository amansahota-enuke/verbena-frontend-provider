import { ApiService } from "./index";

const AppointmentService = {
    getAppointmentCancelReason: () =>
        ApiService.get("/appointment/cancel-reason"),
    getAppointmentList: (payload) => ApiService.post("/appointment", payload),
    getAppointmentDetail: (id) => ApiService.get(`/appointment/${id}`),
    updateAppointment: ({ id, body }) =>
        ApiService.put(`/appointment/${id}`, body),
    updateAppointmentStatus: ({ id, body }) =>
        ApiService.put(`/appointment/update-status/${id}`, body),
    rescheduleAppointment: ({ id, body }) =>
        ApiService.put(`/appointment/reschedule/${id}`, body),
    cancelAppointment: ({ id, body }) =>
        ApiService.put(`/appointment/cancel/${id}`, body),
    saveAppointmentReport: (id, body) =>
        ApiService.post(`/appointment/report/${id}`, body),
    saveAppointmentMedication: (id, body) =>
        ApiService.post(`/appointment/medication/${id}`, body),
    saveAppointmentDetail: (id, body) =>
        ApiService.post(`/appointment/details/${id}`, body),
    getMessages:(id)=>ApiService.get(`/chat/get-messages/${id}`),
    sendMessage: ({id,body}) =>
        ApiService.post(`/chat/add-message/${id}`, body),
    getNotifications:(id)=>ApiService.get(`/chat/notfication`),
    removeNotifications:({id,body})=>ApiService.put(`/chat/notification-status/${id}`, body),
};

export default AppointmentService;
