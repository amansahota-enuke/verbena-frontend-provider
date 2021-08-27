import { ApiService } from "./index";

const CommonService = {
    getTypes: () => ApiService.get("/common/types"),
    getSpeciality: () => ApiService.get("/common/speciality"),
};

export default CommonService;
