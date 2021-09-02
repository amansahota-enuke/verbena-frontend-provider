import { ApiService } from "./index";

const QuestionnaireService = {
    getQuestionnaire: (id) => ApiService.get(`/questionnaire/basic/${id}`),
    getAnswers: (id) => ApiService.get(`/questionnaire/appointment/${id}`),
};

export default QuestionnaireService;
