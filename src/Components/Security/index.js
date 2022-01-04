import React from "react";
import { useHistory } from "react-router";

import { BoxedWidthContainer } from "../";
import SecurityElements from "./SecurityElements";

const Security = () => {
    const history = useHistory();
    return (
        <>
            <button
                onClick={() => history.goBack()}
                type="button"
                className="calibre-regular leading-none font-18 uppercase px-4 py-2 rounded-full mb-3 primary-bg-color text-white"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
            <BoxedWidthContainer>
                <SecurityElements/>
            </BoxedWidthContainer>
        </>
    );
};

export default Security;
