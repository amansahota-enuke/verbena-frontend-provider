import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";

import { SignUp, PrivacyPolicy, TermsAndServices } from "../../Components";
import { UserActions } from "../../redux/slice/user.slice";
import { TokenService } from "../../services";

const SignUpPageRoutes = (props) => {
    const dispatch = useDispatch();
    const { token } = useParams();
    
    useEffect(()=>{
        if(token){
            TokenService.setToken(token);
            dispatch(UserActions.getProfile())
        }
    },[]);

    return (
        <>
            <Switch>
                <Route path={`${props.match.path}/privacy-policy`} component={PrivacyPolicy} />
                <Route path={`${props.match.path}/termsandservices`} component={TermsAndServices} />
                <Route path={props.match.path} component={SignUp} />
            </Switch>
        </>
    );
};

export default SignUpPageRoutes;
