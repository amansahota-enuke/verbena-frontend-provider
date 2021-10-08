import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import { ButtonLoader } from "../../Components";

function RescheduleAppointment() {
    const dispatch = useDispatch();
    const selectedAppointment = useSelector(selector.selectedAppointment);
    const appointmentCancelReasons = useSelector(
        selector.appointmentCancelReasons
    );
    const [cancelReason, setCancelReason] = useState(null);
    const [cancelReasonText, setCancelReasonText] = useState("");
    const [processing, setProcessing] = useState(null);

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentCancelReasons());
    }, [dispatch]);

    const closeModal = () => {
        dispatch(ConfirmationActions.closeConfirmation());
    };

    const handleChange = (e) => {
        setCancelReason(e.target.value);
    };

    const handleChecked = (option) => {
        if (option === Number(cancelReason) || option === cancelReason) {
            return true;
        }

        return false;
    };

    const saveAppointment = async () => {
        setProcessing(true);
        const actionResult = await dispatch(
            AppointmentActions.cancelAppointment({
                id: selectedAppointment.id,
                body: {
                    ...(cancelReason === "other"
                        ? { appointment_cancel_reason_text: cancelReasonText }
                        : {
                              appointment_cancel_reason_id:
                                  Number(cancelReason),
                          }),
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
                as="h2"
                className="hepta-slab xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl text-lg mb-6 text-center primary-text-color"
            >
                Cancel Appointment
            </Dialog.Title>
            <p>
                We understand life can get in the way. Cancelling or missing
                your appointments too many times will result in your account
                being locked.
            </p>
            <div className="bg-white mb-10">
                <div className="p-10 px-5 py-5 border-b">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <div className="input-label calibre-bold mb-4">
                                Whats the reason for your cancellation ?
                            </div>
                            {appointmentCancelReasons.length === 0 ? (
                                <ButtonLoader color="#000" />
                            ) : (
                                <>
                                    {appointmentCancelReasons.map((reason) => (
                                        <div
                                            className="radio-default mb-4"
                                            key={reason.id}
                                        >
                                            <input
                                                className="disabled:opacity-50"
                                                disabled={processing}
                                                type="radio"
                                                id={`radio-default-${reason.id}`}
                                                name={`custom-radio-cancel`}
                                                onChange={handleChange}
                                                value={reason.id}
                                                checked={handleChecked(
                                                    reason.id
                                                )}
                                            />
                                            <label
                                                htmlFor={`radio-default-${reason.id}`}
                                            >
                                                {reason.name}
                                            </label>
                                        </div>
                                    ))}
                                    <div className="radio-default mb-4">
                                        <input
                                            className="disabled:opacity-50"
                                            disabled={processing}
                                            type="radio"
                                            id="radio-default-other"
                                            name="custom-radio-cancel"
                                            onChange={handleChange}
                                            value="other"
                                            checked={handleChecked("other")}
                                        />
                                        <label htmlFor="radio-default-other">
                                            Other
                                        </label>
                                    </div>
                                    {cancelReason === "other" && (
                                        <input
                                            className="custom-input input-border-color border"
                                            placeholder="Enter reason"
                                            value={cancelReasonText}
                                            onChange={(e) =>
                                                setCancelReasonText(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-10 px-5 py-5 border-b">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="btn-create-account calibre-regular font-16 uppercase primary-text-color mr-3"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={!cancelReason || processing}
                            type="button"
                            className="disabled:opacity-50 btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
                            onClick={saveAppointment}
                        >
                            {processing ? (
                                <ButtonLoader />
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RescheduleAppointment;
