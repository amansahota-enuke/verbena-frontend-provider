import React from "react";
import { Route, Switch } from "react-router-dom";

import { SetupFee } from "../../Components";

function SetupFeePage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={SetupFee} />
            </Switch>

        </>
    );
}

export default SetupFeePage;
