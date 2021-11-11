import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import selector from "../../redux/selector";
import { ButtonLoader } from "../../Components";

function TestConfirmation() {
    const dispatch = useDispatch();
    const selectedAppointment = useSelector(selector.selectedAppointment);
    const [time, setTime] = useState("");
    const [processing, setProcessing] = useState(null);

    const closeModal = () => {
        dispatch(ConfirmationActions.closeConfirmation());
    };

    const completeAppointment = async () => {
        setProcessing(true);
        const actionResult = await dispatch(
            AppointmentActions.completeAppointment({
                id: selectedAppointment.id,
                body: {
                    time_spent:time
                },
            })
        );
        setProcessing(false);
        if (!actionResult.hasOwnProperty("error")) {
            closeModal();
            dispatch(
                AppointmentActions.fetchAppointmentDetail(
                    selectedAppointment.id
                )
            );
        }
    };

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                Complete Appointment
            </Dialog.Title>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    Plese enter the time you spent on this appointment.
                </p>
            </div>

            <div className="mt-2">
                <input
                    type="text"
                    className="custom-input  input-border-color border"
                    placeholder="Enter Time(in minutes)"
                    value={time}
                    onChange={(e) => {
                        if (Number(e.target.value) || e.target.value === "") {
                            setTime(e.target.value);
                        }
                    }}
                />
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    className="btn-create-account calibre-regular font-16 uppercase primary-text-color mr-3"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    disabled={!time || processing}
                    type="button"
                    className="disabled:opacity-50 btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
                    onClick={completeAppointment}
                >
                    {processing ? <ButtonLoader /> : <span>Submit</span>}
                </button>
            </div>
        </>
    );
}

export default TestConfirmation;
