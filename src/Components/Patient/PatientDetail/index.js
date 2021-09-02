import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FullWidthContainer } from "../..";
import selector from "../../../redux/selector";
import { PatientActions } from "../../../redux/slice/patient.slice";
import BasicHealthInformation from "./BasicHealthInformation";
import InsuranceInformation from "./InsuranceInformation";
import { MailIcon } from "@heroicons/react/outline";
import { PhoneIcon } from "@heroicons/react/solid";
import statusConstants from "../../../constants/status.constants";
import Loader from "../../Common/Loader";

function PatientDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const patientStatus = useSelector(selector.patientStatus);
    const selectedPatient = useSelector(selector.selectedPatient);

    useEffect(() => {
        dispatch(PatientActions.fetchPatientDetail(id));
    }, [dispatch, id]);

    const parseName = (name) => {
        if (!name) return null;
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <FullWidthContainer>
            {patientStatus === statusConstants.PENDING && <Loader />}
            <h4 className="hepta-slab mb-4">Patient Details</h4>
            <div className="bg-white rounded-md mb-3 px-4 py-4">
                <div className="flex flex-wrap justify-between">
                    <div>
                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                            <div>
                                <div
                                    className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                                    style={{
                                        backgroundImage:
                                            selectedPatient &&
                                            `url("${
                                                process.env
                                                    .REACT_APP_API_SERVER_URL +
                                                selectedPatient.profile_image_path
                                            }")`,
                                    }}
                                ></div>
                            </div>
                            <div>
                                <h3 className="hepta-slab mb-1 text-xl">
                                    {`${parseName(
                                        selectedPatient.first_name
                                    )} ${parseName(selectedPatient.last_name)}`}
                                </h3>
                                <div className="flex flex-nowrap mb-1">
                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                        {selectedPatient.gender === "M"
                                            ? "Male"
                                            : "Female"}
                                    </div>
                                    <div className="font-18 light-dark-gray-color leading-tight">
                                        {selectedPatient.dob &&
                                            getAge(selectedPatient.dob)}
                                    </div>
                                </div>
                                <div className="flex flex-nowrap mb-1">
                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight">
                                        <PhoneIcon className="h-5 w-5" />
                                    </div>
                                    <div className="font-18 light-dark-gray-color leading-tight">
                                        {selectedPatient &&
                                            selectedPatient.mobile_number}
                                    </div>
                                </div>
                                <div className="flex flex-nowrap">
                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight">
                                        <MailIcon className="h-5 w-5" />
                                    </div>
                                    <div className="font-18 light-dark-gray-color leading-tight">
                                        {selectedPatient &&
                                            selectedPatient.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InsuranceInformation insuranceDetail={selectedPatient.insurance} />
            <BasicHealthInformation />
        </FullWidthContainer>
    );
}

export default PatientDetail;
