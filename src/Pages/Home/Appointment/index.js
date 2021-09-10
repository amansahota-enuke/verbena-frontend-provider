import React from "react";
import { Route, Switch } from "react-router-dom";

import {
    AppointmentList,
    AppointmentDetail,
    AppointmentVideo,
} from "../../../Components";

function AppointmentPage(props) {
    return (
        <>
            <Switch>
                <Route
                    path={`${props.match.path}/video/:appointmentId`}
                    component={AppointmentVideo}
                />
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
