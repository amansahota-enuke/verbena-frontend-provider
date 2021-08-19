import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonPage from "../Pages/common";
import { Header, LeftMenu, Error } from "../Components";
import selector from "../redux/selector";
import { UserActions } from "../redux/slice/user.slice";

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
    }, []);

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
                            <Redirect to={`${match.path}/common`} />
                        )}
                    />
                    <Route
                        path={`${match.path}/common`}
                        component={CommonPage}
                    />
                    <Route component={Error} />
                </Switch>
            </div>
        </>
    );
};

export default Layout;
