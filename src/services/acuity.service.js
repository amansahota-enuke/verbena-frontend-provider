import { ApiService } from ".";

const AcuityService = {
    getDates: (id) => ApiService.get(`/calendar/dates/${id}`),
    getTimes: (id, payload)=> ApiService.get(`/calendar/times/${id}`,payload)
};

export default AcuityService;
