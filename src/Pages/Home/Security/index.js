import React from "react";
import { Route, Switch } from "react-router-dom";

import { Security } from "../../../Components";

function SecurityPage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Security} />
            </Switch>
        </>
    );
}

export default SecurityPage;
