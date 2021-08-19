import React from "react";
import { useSelector } from "react-redux";

import { BoxedWidthContainer, Loader } from "..";
import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import NewPassForm from "./NewPassForm";

const ResetPassword = () => {
    const userStatus = useSelector(selector.userStatus);
    return (
        <>
            <BoxedWidthContainer>
                {userStatus === statusConstants.PENDING && <Loader />}
                <NewPassForm />
            </BoxedWidthContainer>
        </>
    );
};

export default ResetPassword;
