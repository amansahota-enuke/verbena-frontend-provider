import { Dialog } from "@headlessui/react";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import selector from "../../redux/selector";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { SubscriptionActions } from "../../redux/slice/subscription.slice";
import { ButtonLoader } from "../../Components";

function SubscriptionCancel() {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(null);
  const subscriptionId = useSelector(selector.subscribedId)

  const closeModal = () => {
    dispatch(ConfirmationActions.closeConfirmation());
  };

  const handleSubscription = async() => {
    setProcessing(true);

    const actionResult = await dispatch(SubscriptionActions.cancelSubscription({
      subscriptionId
    }))
    setProcessing(false);
    if (!actionResult.hasOwnProperty("error")) {
      closeModal();
  }
  }

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Cancel Subscription
      </Dialog.Title>
      <div className="mt-2 text-center">
        <p className="text-md text-black-500">
          Subscription gets cancelled after current period, Are you sure, want to cancel subscription
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white mr-8"
          onClick={closeModal}
        >
          No
        </button>
        <button
          type="button"
          className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
          onClick={handleSubscription}
        >
          {processing ? (
            <ButtonLoader />
          ) : (
            <span className="calibre-regular">Yes</span>
          )}
        </button>
      </div>
    </>
  );
}

export default SubscriptionCancel;
