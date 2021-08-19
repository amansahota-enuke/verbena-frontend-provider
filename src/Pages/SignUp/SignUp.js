import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignUp } from "../../Components";

const SignUpPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={SignUp} />
            </Switch>
        </>
    );
};

export default SignUpPage;
