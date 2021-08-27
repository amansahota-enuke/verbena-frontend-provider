import React from "react";
import { Route, Switch } from "react-router-dom";

import { PatientList, PatientDetail } from "../../../Components";

function PatientPage(props) {
    return (
        <>
            <Switch>
                <Route
                    path={`${props.match.path}/:id`}
                    component={PatientDetail}
                />
                <Route path={props.match.path} component={PatientList} />
            </Switch>
        </>
    );
}

export default PatientPage;
