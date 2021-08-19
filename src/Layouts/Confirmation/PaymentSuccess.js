import { Dialog } from "@headlessui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import selector from "../../redux/selector";
import { AppointmentActions } from "../../redux/slice/appointment.slice";

import { ConfirmationActions } from "../../redux/slice/confirmation.slice";

function PaymentSuccess() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedAppointment = useSelector(selector.selectedAppointment);

    const closeModal = () => {
        dispatch(
            AppointmentActions.updateAppointmentStatus({
                id: selectedAppointment.id,
                body: {
                    status: "paid",
                },
            })
        );
        history.push(`/home/appointment/booked/${selectedAppointment.id}`);
        dispatch(ConfirmationActions.closeConfirmation());
    };

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                Payment successful
            </Dialog.Title>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted.
                </p>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                    onClick={closeModal}
                >
                    Got it, thanks!
                </button>
            </div>
        </>
    );
}

export default PaymentSuccess;
