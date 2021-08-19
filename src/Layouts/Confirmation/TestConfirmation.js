import { Dialog } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";

function TestConfirmation() {
    const dispatch = useDispatch();

    const closeModal = () => {
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
                    Your payment has been successfully submitted. We’ve sent
                    your an email with all of the details of your order.
                </p>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                >
                    Got it, thanks!
                </button>
            </div>
        </>
    );
}

export default TestConfirmation;
