import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TokenService } from "../../services";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = TokenService.getToken();

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
};

export default PrivateRoute;
