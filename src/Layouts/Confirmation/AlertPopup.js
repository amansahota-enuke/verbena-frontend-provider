import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import confirmationConstants from "../../constants/confirmation.constants";
import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import moment from "moment";
import { useHistory } from "react-router-dom";

function AlertPopup() {
    const dispatch = useDispatch()
    const history = useHistory()
    const confirmationType = useSelector(selector.confirmationType);
    const [days, setDays] = useState()
    const user = useSelector(selector.user)
    const handleAlert = () => {
        dispatch(ConfirmationActions.closeConfirmation())
        history.push("/home/security")
    }

    useEffect(() => {
        if(confirmationType === confirmationConstants.PASSWORD_EXPIRY_POPUP){
            const todayDate = moment()
            setDays(90 - Number(todayDate.diff(user.password_updated_at, "days")))
        }
    },[])

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 text-center"
            >
                Alert
            </Dialog.Title>

            <div className="mt-2">
                <p className="text-md text-center text-black-500 font-semibold">
                    {confirmationType === confirmationConstants.TWO_FA_ALERT ? "Activate two factor authentication to make your account more secure" :
                    `Your Password will expire in ${days} days. Please reset your password.`}
                </p>
            </div>

            <div className="mt-4 text-center">
                <button
                    type="button"
                    className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                    onClick={handleAlert}
                >
                    {confirmationType === confirmationConstants.PASSWORD_EXPIRY_POPUP ? "Reset Password" : "Activate"}
                </button>
            </div>
        </>
    );
}

export default AlertPopup;
