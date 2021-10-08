import { Dialog } from "@headlessui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { AppointmentActions } from "../../redux/slice/appointment.slice";

function StartAppointment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedAppointment = useSelector(selector.selectedAppointment);

    const joinRoom = async () => {
        const actionResult = await dispatch(
            AppointmentActions.updateAppointmentStatus({
                id: selectedAppointment.id,
                body: { status: "ongoing" },
            })
        );
        if (!actionResult.hasOwnProperty("error")) {
            dispatch(ConfirmationActions.closeConfirmation());
            history.push(`/home/appointments/video/${selectedAppointment.id}`);
        }
    };

    const closeModal = () => {
        dispatch(ConfirmationActions.closeConfirmation());
    };

    return (
        <>
            <Dialog.Title
                as="h2"
                className="hepta-slab xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl text-lg mb-6 text-center primary-text-color"
            >
                Start Consultation
            </Dialog.Title>
            <div className="bg-white mb-10">
                <div className="p-10 px-5 py-5 flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap border-b">
                    <div>
                        <div
                            className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                            style={{
                                backgroundImage:
                                    selectedAppointment.provider &&
                                    `url("${
                                        process.env.REACT_APP_API_SERVER_URL +
                                        selectedAppointment.provider
                                            .profile_logo
                                    }")`,
                            }}
                        ></div>
                    </div>
                    <div>
                        <h3 className="hepta-slab mb-1 text-xl">
                            Dr.{" "}
                            {selectedAppointment.provider &&
                                `${selectedAppointment.provider.first_name} ${selectedAppointment.provider.last_name}`}
                        </h3>
                        <h6 className="text-base uppercase mb-3 light-gray-color">
                            Dermatologist
                        </h6>
                        <div>
                            <div className="flex">
                                <div>
                                    <h3 className="calibre-regular leading-none text-base light-dark-gray-color border-r-2 pr-2 mr-2">
                                        <i className="fas fa-calendar mr-2"></i>
                                        {selectedAppointment.appointment_datetime &&
                                            moment(
                                                selectedAppointment.appointment_datetime
                                            ).format("D MMMM YYYY")}
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="calibre-regular leading-none text-base light-dark-gray-color">
                                        {selectedAppointment.appointment_datetime &&
                                            moment(
                                                selectedAppointment.appointment_datetime
                                            ).format("HH:mm A")}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-10 px-5 py-5 border-b">
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Patient Name
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                {selectedAppointment.patient.first_name}{" "}
                                {selectedAppointment.patient.last_name}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Age
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                29 Years
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Gender
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                Male
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="p-10 px-5 py-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="btn-create-account calibre-regular font-16 uppercase primary-text-color mr-3"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
                            onClick={joinRoom}
                        >
                            <span className="calibre-regular">Start video visit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StartAppointment;
