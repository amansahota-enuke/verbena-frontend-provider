import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { BoxedWidthContainer } from "../..";
import PaymentForms from "./PaymentForms";
import { useHistory } from "react-router";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payments = () => {
    const history = useHistory();
    return (
        <>
            <button
                onClick={() => history.goBack()}
                type="button"
                className="px-4 py-2 rounded-full mb-3 calibre-regular leading-none font-18 uppercase primary-bg-color text-white"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
            <BoxedWidthContainer>
                <Elements stripe={promise}>
                    <PaymentForms />
                </Elements>
            </BoxedWidthContainer>
        </>
    );
};

export default Payments;
