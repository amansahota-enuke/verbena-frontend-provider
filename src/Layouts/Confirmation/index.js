import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import confirmationConstants from "../../constants/confirmation.constants";
import selector from "../../redux/selector";
import StartAppointment from "./StartAppointment";
import RescheduleAppointment from "./RescheduleAppointment";
import CancelAppointment from "./CancelAppointment";
import CompleteAppointment from "./CompleteAppointment";
import SubscriptionSuccess from "./SubscriptionSuccess";
import CancelSubscription from "./CancelSubscription";

const Confirmation = () => {
    const isOpen = useSelector(selector.confirmationStatus);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => console.log("Do nothing")}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <SelectedConfirmation />
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

const SelectedConfirmation = () => {
    const confirmationType = useSelector(selector.confirmationType);

    switch (confirmationType) {
        case confirmationConstants.RESCHEDULE_APPOINTMENT:
            return <RescheduleAppointment />;
        case confirmationConstants.CANCEL_APPOINTMENT:
            return <CancelAppointment />;
        case confirmationConstants.START_APPOINTMENT:
            return <StartAppointment />;
        case confirmationConstants.COMPLETE_APPOINTMENT:
            return <CompleteAppointment />;
        case confirmationConstants.SUBSCRIPTION_SUCCESS:
            return <SubscriptionSuccess />;
        case confirmationConstants.SUBSCRIPTION_CANCEL:
            return <CancelSubscription />;
        default:
            return "";
    }
};

export default Confirmation;
