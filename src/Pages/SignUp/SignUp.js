import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignUp, PrivacyPolicy, TermsAndServices } from "../../Components";

const SignUpPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/privacy-policy`} component={PrivacyPolicy} />
                <Route path={`${props.match.path}/termsandservices`} component={TermsAndServices} />
                <Route path={props.match.path} component={SignUp} />
            </Switch>
        </>
    );
};

export default SignUpPage;
