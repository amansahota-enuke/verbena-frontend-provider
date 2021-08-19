import React from "react";
import { useSelector } from "react-redux";

import { BoxedWidthContainer } from "..";
import LoginForm from "./LoginForm";
import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import { Loader } from "..";

const Login = () => {
    const userStatus = useSelector(selector.userStatus);
    return (
        <>
            <BoxedWidthContainer>
                {userStatus === statusConstants.PENDING && <Loader />}
                <LoginForm />
            </BoxedWidthContainer>
        </>
    );
};

export default Login;
