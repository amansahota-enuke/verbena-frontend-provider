import React from "react";
import { Route, Switch } from "react-router-dom";

import SignUpPageRoutes from "./SignUp";

const SignUpPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/:token`} component={SignUpPageRoutes}/>
            </Switch>
        </>
    );
};

export default SignUpPage;
