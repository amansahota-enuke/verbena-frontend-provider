import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { BoxedWidthContainer } from "../..";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
    return (
        <>
            <BoxedWidthContainer>
                <SignUpForm />
            </BoxedWidthContainer>
        </>
    );
};

export default SignUp;
