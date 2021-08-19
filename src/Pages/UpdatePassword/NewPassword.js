import React from "react";
import { Route, Switch } from "react-router-dom";

import { ResetPassword } from "../../Components";

const UpdatePasswordPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/:token/:email`} component={ResetPassword} />
            </Switch>
        </>
    );
};

export default UpdatePasswordPage;
