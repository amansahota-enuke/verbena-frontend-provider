import React from "react";
import { useHistory } from "react-router";

import { FullWidthContainer } from "../..";
import TermsAndServicesForm from "./TermsAndServicesForm";

const TermsAndServices = () => {
    const history = useHistory();
    return (
        <>
            <FullWidthContainer>
                <button
                    onClick={() => history.goBack()}
                    type="button"
                    className="mt-4 ml-4 px-4 py-2 rounded-full mb-3 calibre-regular leading-none font-18 uppercase primary-bg-color text-white"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Back
                </button>
                <TermsAndServicesForm />
            </FullWidthContainer>
        </>
    );
};

export default TermsAndServices;
