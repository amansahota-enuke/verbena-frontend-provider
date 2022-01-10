import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, LeftMenu, Error } from "../Components";
import selector from "../redux/selector";
import { UserActions } from "../redux/slice/user.slice";
import {
  AppointmentPage,
  ProfilePage,
  PatientPage,
  DashboardPage,
  AccountPage,
  SecurityPage,
} from "../Pages";
import IdleTimer from "react-idle-timer";
import { useRef } from "react";
import { ConfirmationActions } from "../redux/slice/confirmation.slice";
import confirmationConstants from "../constants/confirmation.constants";

const Layout = ({ match }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow(!show);
  };

  const user = useSelector(selector.user);

  const idleTimer = useRef(null);

  let routeMatch = useRouteMatch("/home/appointments/video");

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(UserActions.getProfile());
    }
  }, [dispatch, user]);

  const onIdle = () => {
    if (!routeMatch) {
      dispatch(
        ConfirmationActions.setConfirmationType(
          confirmationConstants.SESSION_TIMEOUT
        )
      );
      dispatch(ConfirmationActions.openConfirmation());
    }
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        timeout={9 * 1000 * 100}
        onIdle={onIdle}
      ></IdleTimer>

      <Header handleToggle={handleToggle} />
      <div className={`main-panel relative ${show ? "expanded" : ""}`}>
        <LeftMenu show={show} />
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={() => <Redirect to={`${match.path}/dashboard`} />}
          />
          <Route path={`${match.path}/dashboard`} component={DashboardPage} />
          <Route
            path={`${match.path}/appointments`}
            component={AppointmentPage}
          />
          <Route path={`${match.path}/patients`} component={PatientPage} />
          <Route path={`${match.path}/profile`} component={ProfilePage} />
          <Route path={`${match.path}/account`} component={AccountPage} />
          <Route path={`${match.path}/security`} component={SecurityPage} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
};

export default Layout;
