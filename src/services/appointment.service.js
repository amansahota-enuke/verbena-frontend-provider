import { ApiService } from "./index";

const AppointmentService = {
    getAppointmentCancelReason: () => ApiService.get("/appointment/cancel-reason"),
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
};

export default AppointmentService;
