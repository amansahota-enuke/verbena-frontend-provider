import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FullWidthContainer } from "../..";
import confirmationConstants from "../../../constants/confirmation.constants";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { ConfirmationActions } from "../../../redux/slice/confirmation.slice";
import Loader from "../../Common/Loader";
import QuestionnaireDetail from "./QuestionnaireDetail";

function AppointmentDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const appointmentStatus = useSelector(selector.appointmentStatus);
    const selectedAppointment = useSelector(selector.selectedAppointment);
    const user = useSelector(selector.user);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const startAppointment = () => {
        dispatch(
            ConfirmationActions.setConfirmationType(
                confirmationConstants.START_APPOINTMENT
            )
        );
        dispatch(ConfirmationActions.openConfirmation());
    };

    const rescheduleAppointment = () => {
        dispatch(
            ConfirmationActions.setConfirmationType(
                confirmationConstants.RESCHEDULE_APPOINTMENT
            )
        );
        dispatch(ConfirmationActions.openConfirmation());
    };

    const cancelAppointment = () => {
        dispatch(
            ConfirmationActions.setConfirmationType(
                confirmationConstants.CANCEL_APPOINTMENT
            )
        );
        dispatch(ConfirmationActions.openConfirmation());
    };

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentDetail(id));
    }, [dispatch, id]);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <FullWidthContainer>
            {appointmentStatus === statusConstants.PENDING && <Loader />}
            <div className="container mx-auto px-4 sm:px-6">
                {/* Appoint ment Detail */}
                {selectedAppointment.status === "cancelled" && (
                    <p className="text-center px-2 py-2 bg-red-500 text-white text-lg">
                        Cancelled
                    </p>
                )}
                <h2 className="hepta-bold primary-text-color mb-4">
                    Appointment Details
                </h2>
                <div className="col-span-4">
                    <h4 className="hepta-slab mb-4">Doctor Details</h4>

                    <div className="bg-white rounded-md mb-3 px-4 py-4">
                        <div className="flex flex-wrap items-center justify-between">
                            <div>
                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                                    <div>
                                        <div
                                            className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                                            style={{
                                                backgroundImage: `url("${
                                                    process.env
                                                        .REACT_APP_API_SERVER_URL +
                                                    user.profile_logo
                                                }")`,
                                            }}
                                        ></div>
                                    </div>
                                    <div>
                                        <h3 className="hepta-slab mb-2 text-xl leading-none">
                                            {`Dr.${
                                                user.first_name &&
                                                parseName(user.first_name)
                                            } ${
                                                user.last_name &&
                                                parseName(user.last_name)
                                            }`}
                                        </h3>
                                        <h6 className="text-base uppercase mb-3 light-dark-gray-color calibre-regular">
                                            {user.provider_speciality_master &&
                                                user.provider_speciality_master
                                                    .name}
                                        </h6>
                                        <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-3 whitespace-nowrap">
                                            <div className="edu-icon mr-3">
                                                <i className="fas fa-graduation-cap"></i>
                                            </div>
                                            <div className="light-gray-color text-base calibre-regular">
                                                {user.hospital_affiliations}
                                            </div>
                                        </div>
                                        <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap">
                                            <div className="address-icon mr-3">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div className="light-gray-color text-base calibre-regular">
                                                {user.address &&
                                                    `${
                                                        user.address
                                                            .address_line1
                                                    }, ${
                                                        user.address
                                                            .address_line2 &&
                                                        JSON.parse(
                                                            user.address
                                                                .address_line2
                                                        ) !== null &&
                                                        user.address
                                                            .address_line2 + ","
                                                    } ${user.address.city}, ${
                                                        user.address.state
                                                    } ${user.address.zipcode}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {["paid", "rescheduled"].includes(
                                selectedAppointment.status
                            ) && (
                                <div>
                                    <div className="quick-btn">
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="modal-open btn-ready-visit px-3 py-2 rounded-full uppercase text-white primary-bg-color mr-3"
                                                onClick={startAppointment}
                                            >
                                                Ready For Visit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                                onClick={rescheduleAppointment}
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-cancel-meet px-3 py-2 rounded-full uppercase primary-text-color primary-light-bg-color"
                                                onClick={cancelAppointment}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

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
                                                    selectedAppointment.patient &&
                                                    `url("${
                                                        process.env
                                                            .REACT_APP_API_SERVER_URL +
                                                        selectedAppointment
                                                            .patient
                                                            .profile_image_path
                                                    }")`,
                                            }}
                                        ></div>
                                    </div>
                                    <div>
                                        <h3 className="hepta-slab mb-1 text-xl">
                                            {selectedAppointment.patient &&
                                                `${parseName(
                                                    selectedAppointment.patient
                                                        .first_name
                                                )} ${parseName(
                                                    selectedAppointment.patient
                                                        .last_name
                                                )}`}
                                        </h3>
                                        <div className="flex flex-nowrap mb-1">
                                            <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                {selectedAppointment.patient &&
                                                selectedAppointment.patient
                                                    .gender === "M"
                                                    ? "Male"
                                                    : "Female"}
                                            </div>
                                            <div className="font-18 light-dark-gray-color leading-tight">
                                                {selectedAppointment.patient &&
                                                    getAge(
                                                        selectedAppointment
                                                            .patient.dob
                                                    )}
                                            </div>
                                        </div>
                                        <div className="flex flex-nowrap mb-1">
                                            <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                {moment(
                                                    selectedAppointment.appointment_datetime
                                                ).format("D MMMM YYYY")}
                                            </div>
                                            <div className="font-18 light-dark-gray-color leading-tight">
                                                {moment(
                                                    selectedAppointment.appointment_datetime
                                                ).format("HH:mm A")}
                                            </div>
                                        </div>
                                        <div className="flex flex-nowrap">
                                            <div className="font-18 light-dark-gray-color">
                                                Reason for your visit{" "}
                                                <span className="text-black calibre-bold">
                                                    {selectedAppointment.appointment_reason_text
                                                        ? selectedAppointment.appointment_reason_text
                                                        : selectedAppointment.appointment_reason &&
                                                          selectedAppointment
                                                              .appointment_reason
                                                              .name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedAppointment.appointment_reason_id && (
                        <QuestionnaireDetail />
                    )}
                    <h4 className="hepta-slab mb-4">Complaint</h4>
                    <div className="bg-white rounded-md mb p-6 mb-6">
                        <textarea
                            className="w-full p-4 border rounded-md"
                            placeholder="Type Here"
                        ></textarea>
                    </div>
                    <h4 className="hepta-slab mb-4">Diagnosis</h4>
                    <div className="bg-white rounded-md mb p-6 mb-6">
                        <textarea
                            className="w-full p-4 border rounded-md"
                            placeholder="Type Here"
                        ></textarea>
                    </div>
                    <h4 className="hepta-slab mb-4">Lab Test</h4>
                    <div className="bg-white rounded-md mb-6">
                        <div className="content">
                            <div class="p-3 border-b-1 mb-3">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            CT Scan
                                        </h2>
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                        >
                                            Download Report
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="p-3 border-b-1 mb-3">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            Ultra Sound
                                        </h2>
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            class="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                        >
                                            Download Report
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="p-3 border-b-1 mb-3">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            Blood Test
                                        </h2>
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            class="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                        >
                                            Download Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="hepta-slab mb-4">Medication</h4>
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-10">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50 calibre-regular thead-bg">
                                <tr>
                                    <th
                                        scope="col"
                                        class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                    >
                                        Medicine Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                    >
                                        Dosage
                                    </th>
                                    <th
                                        scope="col"
                                        class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                    >
                                        duration
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Dolo 6
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Crocin
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Paracetamol
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        ciprofloxacin
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Dolo 6
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Crocin
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Paracetamol
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        ciprofloxacin
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Dolo 6
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Crocin
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Paracetamol
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        ciprofloxacin
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Dolo 6
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Crocin
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        Paracetamol
                                    </td>
                                    <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        ciprofloxacin
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 className="hepta-slab mb-4">Assesment and Plan</h4>
                    <div className="bg-white rounded-md mb p-6 mb-6">
                        <textarea
                            className="w-full p-4 border rounded-md"
                            placeholder="Type Here"
                        ></textarea>
                    </div>
                </div>
                <div className="form-footer xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-4">
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="btn-create-account primary-dim-bg-color calibre-bold font-18 uppercase text-white mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                        >
                            Complete Appointment
                        </button>
                    </div>
                </div>
            </div>
        </FullWidthContainer>
    );
}

export default AppointmentDetail;
