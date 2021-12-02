import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Loader } from "../../..";
import confirmationConstants from "../../../constants/confirmation.constants";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { ConfirmationActions } from "../../../redux/slice/confirmation.slice";
import PaymentService  from "../../../services/payment.service";
import ButtonLoader from "../../Common/ButtonLoader";
import { UserService } from "../../../services";

function PaymentForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors, setErrors] = useState({
        number: "",
        expiry: "",
        cvc: "",
    });
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState({
        number: true,
        expiry: true,
        cvc: true,
    });
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const fetchClientSecret = async () => {
        try {
            const response = await PaymentService.fetchPaymentIntent();
            setClientSecret(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchClientSecret();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });

        console.log("payload", payload);

        setProcessing(false);
        if (payload.error) {
            toast.error(payload.error.message);
            //save error
            //payment failed pop-up
        } else {
            //save payload
            saveTransaction(payload)
            //payment success pop-up
            // dispatch(
            //     ConfirmationActions.setConfirmationType(
            //         confirmationConstants.PAYMENT_SUCCESS
            //     )
            // );
            // dispatch(ConfirmationActions.openConfirmation());
        }
    };

    const saveTransaction = async payload => {
        try {
            const requestBody = {
                payment_intent_id: payload.paymentIntent.id,
                amount: payload.paymentIntent.amount,
                currency: payload.paymentIntent.currency,
                status: payload.paymentIntent.status,
                res_body: JSON.stringify(payload.paymentIntent)
            }
            const response = await PaymentService.saveTransaction(requestBody)
            history.push(`/subscription`)
            toast.success(response.data.messageF)
        } catch (error) {
            toast.error(error)
        }
    }

    const handleChange = ({ elementType, error, empty }) => {
        const handleDisable = (prop) => {
            setDisabled((prevState) => {
                return {
                    ...prevState,
                    [prop]: empty,
                };
            });
        };

        const handleError = (prop) => {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    [prop]: error ? error.message : "",
                };
            });
        };

        switch (elementType) {
            case "cardNumber":
                handleDisable("number");
                handleError("number");
                break;
            case "cardExpiry":
                handleDisable("expiry");
                handleError("expiry");
                break;
            case "cardCvc":
                handleDisable("cvc");
                handleError("cvc");
                break;
        }
    };

    return (
        <div className="bg-white login-box mb-10">
            <div className="p-10 px-8 pt-10 pb-4 border-b">
                <h2 className="hepta-slab leading-tight font-32 primary-text-color mb-5">
                    Payment Information
                </h2>
                <h6 className="mb-4">
                    <strong>Verbena Set up Fee</strong>
                </h6>
                <div className="flex items-center mb-4">
                    <div className="dd w-12">
                        <h3 className="leading-none text-lg calibre-regular">
                            Fee :-
                        </h3>
                    </div>
                    <div className="w-auto">
                        <h3 className="leading-none text-lg calibre-bold">
                            $250
                        </h3>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="p-10 px-8 pt-10 pb-20 border-b"
            >
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                        <div className="input-label calibre-regular mb-4">
                            Card Number
                        </div>

                        <div className="relative">
                            <CardNumberElement
                                className="p-4 rounded-lg input-border-color border text-justify"
                                options={{
                                    showIcon: true,
                                }}
                                onChange={handleChange}
                            />
                            <span className="text-red-500 block mt-2">
                                {errors.number}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="input-label calibre-regular mb-4">
                            Expiration Date
                        </div>
                        <div className="relative">
                            <CardExpiryElement
                                className="p-4 rounded-lg input-border-color border text-justify"
                                onChange={handleChange}
                            />
                            <span className="text-red-500 block mt-2">
                                {errors.expiry}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="input-label calibre-regular mb-4">
                            CVC
                        </div>
                        <div className="relative">
                            <CardCvcElement
                                className="p-4 rounded-lg input-border-color border text-justify"
                                onChange={handleChange}
                            />
                            <span className="text-red-500 block mt-2">
                                {errors.cvc}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start mt-5">
                    <button
                        disabled={
                            processing ||
                            disabled.number ||
                            disabled.cvc ||
                            disabled.expiry ||
                            errors.number ||
                            errors.cvc ||
                            errors.expiry
                        }
                        type="submit"
                        className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                    >
                        <span>{processing ? <ButtonLoader /> : "Confirm"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;
