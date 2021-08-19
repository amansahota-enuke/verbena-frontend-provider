import React from "react";
import { useSelector } from "react-redux";

import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import { BoxedWidthContainer, Loader } from "..";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
    const userStatus = useSelector(selector.userStatus);
    return (
        <>
            <BoxedWidthContainer>
                {userStatus === statusConstants.PENDING && <Loader />}
                <SignUpForm />
            </BoxedWidthContainer>
        </>
    );
};

export default SignUp;
