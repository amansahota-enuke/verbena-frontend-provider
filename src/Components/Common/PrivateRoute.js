import React, { useEffect, useState, useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import { PaymentService, TokenService } from "../../services";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = TokenService.getToken();
    const [validation, setValidation] = useState(true)
    const [page, setPage] = useState("")

    useEffect(async () => {
        const setupFeeDetails = await PaymentService.fetchSetupFeeDetails()
        const subscriptionDetails = await PaymentService.getSubscriptionDetails()
        if (!setupFeeDetails.data.data) {
            setPage("setupfee")
            setValidation(false)
        } else if (!subscriptionDetails.data.data) {
            setPage("subscription")
            setValidation(false)
        } else if (subscriptionDetails.data.data.status !== "active") {
            setPage("subscription")
            setValidation(false)
        } else {
            setValidation(true)
        }
    })

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (validation ? (
                    <Component {...props} />
                ) : (
                    page === "setupfee" ? (
                        <Redirect to="/setupfee" />
                    ) : (
                        <Redirect to="/subscription" />
                    )
                )) : <Redirect to="/login" />
                // token ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
};

export default PrivateRoute;
