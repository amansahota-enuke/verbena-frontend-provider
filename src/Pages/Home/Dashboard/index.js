import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../../../Components";

function Index(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Dashboard} />
            </Switch>
        </>
    );
}

export default Index;
