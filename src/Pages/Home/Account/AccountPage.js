import React from "react";
import { Route, Switch } from "react-router-dom";

import { Account } from "../../../Components";

function AccountPage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Account} />
            </Switch>
        </>
    );
}

export default AccountPage;
