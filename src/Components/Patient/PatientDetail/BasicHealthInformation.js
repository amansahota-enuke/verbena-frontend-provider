import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";

import Loader from "../../Common/Loader";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { QuestionnaireActions } from "../../../redux/slice/questionnaire.slice";

const BasicHealthInformation = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const questionnaireStatus = useSelector(selector.questionnaireStatus);
    const basicQuestionnaire = useSelector(selector.basicQuestionnaire);

    useEffect(() => {
        dispatch(QuestionnaireActions.fetchBasicQuestionnaire(id));
    }, [dispatch, id]);

    const checkQuestion = (question) => {
        if (!question.parent_question_id) {
            return true;
        }
        const parentQuestion = basicQuestionnaire.find(
            (ele) => ele.id === question.parent_question_id
        );
        const answer = parentQuestion.basic_health_responses.find(
            (response) =>
                response.basic_health_answer_id === question.conditional_answer
        );
        if (answer) {
            return true;
        }
        return false;
    };

    return (
        <>
            {questionnaireStatus === statusConstants.PENDING && <Loader />}
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-8 text-sm font-medium text-left rounded-t-lg rounded-b-none bg-white px-2 mb-0 mt-3">
                            <h4 className="hepta-slab mb-0 font-32">
                                Basic Health Information
                            </h4>
                            <ChevronDownIcon
                                className={`${
                                    open ? "transform rotate-180" : ""
                                } w-5 h-5 text-black`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="pb-2 text-sm">
                            <div className="bg-white rounded-t-none rounded-b-lg mb-3">
                                {basicQuestionnaire.map((question) => {
                                    const showQuestion =
                                        checkQuestion(question);
                                    if (showQuestion) {
                                        return (
                                            <div className="health-info border-b-1">
                                                <h3 className="font-18 dark-color px-4 py-2 calibre-bold">
                                                    {question.text}
                                                </h3>
                                                {question.basic_health_responses
                                                    .length > 0 ? (
                                                    question.basic_health_responses.map(
                                                        (response) => (
                                                            <p className="font-16 px-4 pt-0 pb-2 calibre-regular font-16 leading-none">
                                                                {response.answer_text
                                                                    ? response.answer_text
                                                                    : response
                                                                          .basic_health_answer_option
                                                                          .text}
                                                            </p>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="font-16 px-4 pt-0 pb-2 calibre-regular font-16">
                                                        No Response
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default BasicHealthInformation;
