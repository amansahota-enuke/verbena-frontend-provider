import React from "react";
import { Route, Switch } from "react-router-dom";

import { Profile } from "../../../Components";

function ProfilePage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Profile} />
            </Switch>
        </>
    );
}

export default ProfilePage;
