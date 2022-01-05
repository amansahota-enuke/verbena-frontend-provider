import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { UserService } from "../../services";
function ScanQRCode() {
    const dispatch = useDispatch();
    const [qrCode, setQRCode] = useState("")

    const getQrCode = async () => {
        const response = await UserService.fetchQrCode()
        setQRCode(response.data.data.url)
    }

    useEffect(() => {
        getQrCode()
    }, [])

    const handleConfirm = () => {
        dispatch(ConfirmationActions.closeConfirmation());
    };

    const handleCancel = async () => {
        await UserService.cancel2FA()
        dispatch(ConfirmationActions.closeConfirmation());
    }


    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 text-center"
            >
                Two Factor Authentication
            </Dialog.Title>

            <div className="mt-4 flex justify-center">
                <img src={qrCode ? qrCode : ""} alt="img" />
            </div>

            <div className="mt-2">
                <p className="text-md text-center text-black-500 font-semibold">
                    Scan the above QR Code using a trusted authenticator app such as Google Authenticator to enable 2FA for your account. You must click confirm to turn on authentication after scanning the QR code, otherwise it will not register.
                </p>
            </div>

            <div className="mt-4 text-center">
                <button
                    type="button"
                    className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white mr-2"
                    onClick={handleConfirm}
                >
                    confirm
                </button>
                <button
                    type="button"
                    className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                    onClick={handleCancel}
                >
                    cancel
                </button>
            </div>
        </>
    );
}

export default ScanQRCode;
