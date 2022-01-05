import React from "react";
import { useSelector } from "react-redux";

import { BoxedWidthContainer } from "..";
import TotpForm from "./TotpForm";
import selector from "../../redux/selector";

const Totp = () => {
    return (
        <>
            <BoxedWidthContainer>
                <TotpForm />
            </BoxedWidthContainer>
        </>
    );
};

export default Totp;
