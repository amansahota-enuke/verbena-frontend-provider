import React from "react";
import { Route, Switch } from "react-router-dom";

import { AppointmentList, AppointmentDetail } from "../../../Components";

function AppointmentPage(props) {
    return (
        <>
            <Switch>
                <Route
                    path={`${props.match.path}/:id`}
                    component={AppointmentDetail}
                />
                <Route path={props.match.path} component={AppointmentList} />
            </Switch>
        </>
    );
}

export default AppointmentPage;
