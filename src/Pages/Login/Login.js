import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Totp } from "../../Components";

const LoginPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/totp/:userId`} component={Totp} />

                <Route path={props.match.path} component={Login} />
            </Switch>
        </>
    );
};

export default LoginPage;
