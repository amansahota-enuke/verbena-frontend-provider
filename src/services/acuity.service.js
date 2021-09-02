import { ApiService } from ".";

const AcuityService = {
    getDates: () => ApiService.get("/calendar/dates"),
    getTimes: (payload)=> ApiService.get("/calendar/times",payload)
};

export default AcuityService;
