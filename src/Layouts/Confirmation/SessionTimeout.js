import { Dialog } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { toast } from "react-toastify";
import IdleTimer from "react-idle-timer";
import { useRef } from "react";
import { TokenService } from "../../services";
import { useHistory } from "react-router-dom";

function SessionTimeout() {
  const dispatch = useDispatch();
  const idleTimer = useRef(null);
  const history = useHistory();

  const closeModal = () => {
    dispatch(ConfirmationActions.closeConfirmation());
  };

  const onIdle = () => {
    dispatch(ConfirmationActions.closeConfirmation());
    TokenService.deleteToken();
    history.push("/login");
    toast.success("session timeout");
  };

  return (
    <>
      <IdleTimer ref={idleTimer} timeout={12 * 1000 * 10} onIdle={onIdle}></IdleTimer>

      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Session Timeout
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500 text-center">ARE YOU STILL HERE?</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white "
          onClick={closeModal}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default SessionTimeout;
