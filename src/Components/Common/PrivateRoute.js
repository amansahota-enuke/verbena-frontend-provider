import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TokenService } from "../../services";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = TokenService.getToken();
    const userSetUpFeeDetails = useSelector(selector.setUpfeeDetails)
    const userSubscription = useSelector(selector.userSubscriptionDetails)

    const subscriptionValidation = props => {
        if(!userSetUpFeeDetails){
            return <Redirect to="/signup/privacy-policy" />
        }else if(!userSubscription){
            return <Redirect to="/subscription" />
        }else if(userSubscription.status !== "active"){
            return <Redirect to="/subscription" />
        }else{
            return <Component {...props} />
        }
    }

    const loginValidation=()=>{
        return <Redirect to="/login" />
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? subscriptionValidation(props) : loginValidation()
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
