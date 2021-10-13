import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, LeftMenu, Error } from "../Components";
import selector from "../redux/selector";
import { UserActions } from "../redux/slice/user.slice";
import {
    AppointmentPage,
    ProfilePage,
    PatientPage,
    DashboardPage,
} from "../Pages";

const Layout = ({ match }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
    };

    const user = useSelector(selector.user);

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            dispatch(UserActions.getProfile());
        }
    }, [dispatch, user]);

    return (
        <>
            <Header handleToggle={handleToggle} />
            <div className={`main-panel relative ${show ? "expanded" : ""}`}>
                <LeftMenu show={show} />
                <Switch>
                    <Route
                        exact
                        path={`${match.path}`}
                        render={() => (
                            <Redirect to={`${match.path}/dashboard`} />
                        )}
                    />
                    <Route
                        path={`${match.path}/dashboard`}
                        component={DashboardPage}
                    />
                    <Route
                        path={`${match.path}/appointments`}
                        component={AppointmentPage}
                    />
                    <Route
                        path={`${match.path}/patients`}
                        component={PatientPage}
                    />
                    <Route
                        path={`${match.path}/profile`}
                        component={ProfilePage}
                    />
                    <Route component={Error} />
                </Switch>
            </div>
        </>
    );
};

export default Layout;
