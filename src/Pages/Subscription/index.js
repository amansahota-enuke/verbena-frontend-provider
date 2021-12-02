import React from "react";
import { Route, Switch } from "react-router-dom";

import { Subscription, SubscriptionBooked, SetupFee } from "../../Components";

function SubscriptionPage(props) {
    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/setupfee`} component={SetupFee} />
                <Route path={`${props.match.path}/thankyou`} component={SubscriptionBooked} />
                <Route path={props.match.path} component={Subscription} />
            </Switch>

        </>
    );
}

export default SubscriptionPage;
