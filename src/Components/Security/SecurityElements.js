import React from "react";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import confirmationConstants from "../../constants/confirmation.constants";
import { useDispatch } from "react-redux";

function SecurityElements() {
    const dispatch = useDispatch()

    const handleQrCode = () => {
        dispatch(
            ConfirmationActions.setConfirmationType(
                confirmationConstants.SCAN_QR_CODE
            )
        )
        dispatch(ConfirmationActions.openConfirmation());
    }

    const handleChangePassord = () => {
        dispatch(
            ConfirmationActions.setConfirmationType(
                confirmationConstants.CHANGE_PASSWORD
            )
        )
        dispatch(ConfirmationActions.openConfirmation());
    }

    return (
        <><h2 className="hepta-slab font-20 text-center primary-text-color mb-5">
            Security is important to Verbena and therefore we require a 2-step verification process. 
        </h2>
            <div className="bg-white login-box mb-10">

                <div className="p-10 px-5 py-5 border-b">
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Two Factor Authentication
                            </h3>
                        </div>
                        <div className="w-auto ml-auto">
                            <button
                                type="button"
                                className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                                onClick={handleQrCode}
                            >
                                Enable
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">Reset Password</h3>
                        </div>
                        <div className="w-auto ml-auto">
                            <button
                                type="button"
                                className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                                onClick={handleChangePassord}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SecurityElements;
