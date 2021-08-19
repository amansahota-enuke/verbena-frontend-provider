import React from "react";
import { useSelector } from "react-redux";

import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import { BoxedWidthContainer, Loader } from "..";
import ForgotPassForm from "./ForgotPassForm";

const ForgotPassword = () => {
    const userStatus = useSelector(selector.userStatus);
    return (
        <>
            <BoxedWidthContainer>
                {userStatus === statusConstants.PENDING && <Loader />}
                <ForgotPassForm />
            </BoxedWidthContainer>
        </>
    );
};

export default ForgotPassword;
