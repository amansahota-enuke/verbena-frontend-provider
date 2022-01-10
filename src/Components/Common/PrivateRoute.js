import React, { useEffect, useState, useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import { PaymentService, TokenService } from "../../services";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../redux/selector";
import { SubscriptionActions } from "../../redux/slice/subscription.slice";
import statusConstants from "../../../src/constants/status.constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = TokenService.getToken();
    const [validation, setValidation] = useState(true)
    const [page, setPage] = useState("")
    const dispatch = useDispatch()
    const subscriptionDetails = useSelector(selector.userSubscriptionDetails)
    const setupFeeDetails = useSelector(selector.setUpfeeDetails)
    const subscriptionStatus = useSelector(selector.subscriptionStatus)
    const setupFeeStatus = useSelector(selector.setUpfeeStatus)

    useEffect(() => {
        if(Object.keys(subscriptionDetails).length === 0 || Object.keys(setupFeeDetails).length === 0){
            dispatch(SubscriptionActions.checkSetUpfeeDetails())
            dispatch(SubscriptionActions.checkSubscription())
        }
    },[])

    useEffect(async () => {
        if(setupFeeStatus === statusConstants.FULFILLED){
            if(subscriptionStatus === statusConstants.FULFILLED){
            if (!setupFeeDetails) {
                setPage("setupfee")
                setValidation(false)
            } else if (!subscriptionDetails) {
                setPage("subscription")
                setValidation(false)
            } else if (subscriptionDetails.status !== "active") {
                setPage("subscription")
                setValidation(false)
            } else {
                setValidation(true)
            }
        }
        }
    },[setupFeeDetails,subscriptionDetails])

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
