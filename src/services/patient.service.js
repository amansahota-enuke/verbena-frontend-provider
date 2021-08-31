import { ApiService } from "./index";

const PatientService = {
    getPatientList: (payload) => ApiService.post("/patient", payload),
    getPatientDetail: (id) => ApiService.get(`/patient/${id}`),
};

export default PatientService;
