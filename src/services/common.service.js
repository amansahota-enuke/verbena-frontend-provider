import { ApiService } from "./index";

const CommonService = {
    getTypes: () => ApiService.get("/common/types"),
    getSpeciality: () => ApiService.get("/common/speciality"),
    getStates: () => ApiService.get("/common/states"),
};

export default CommonService;
