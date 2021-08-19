import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../../Components";

const LoginPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Login} />
            </Switch>
        </>
    );
};

export default LoginPage;
