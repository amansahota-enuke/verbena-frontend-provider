import React from "react";
import { Route, Switch } from "react-router-dom";

import { ForgotPassword } from "../../Components";

const ForgotPasswordPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={ForgotPassword} />
            </Switch>
        </>
    );
};

export default ForgotPasswordPage;
