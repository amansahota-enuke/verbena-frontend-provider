import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useParams } from "react-router-dom";

import { SignUp, PrivacyPolicy, TermsAndServices } from "../../Components";
import { UserActions } from "../../redux/slice/user.slice";
import { TokenService, UserService } from "../../services";
import { useLocation } from 'react-router';
import queryString from 'query-string';

const SignUpPageRoutes = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const token = queryString.parse(location.search)._key
    const [valid, setValid] = useState(true)

    useEffect(() => {
        async function checkToken(){
        if (token) {
            const res = await UserService.checkToken({
                token: token
            })
            if (!res.data.data) {
                setValid(false)
            }
        }else{
            setValid(false)
        }
    }
        checkToken()
    }, []);

    if (valid) {
        return (
            <>
                <Switch>
                    <Route path={props.match.path} component={SignUp} />
                </Switch>
            </>
        );
    } else {
        return (
            <>
                <Switch>
                    <Route render={() => <Redirect to="/login" />} />
                </Switch>
            </>
        )
    }

};

export default SignUpPageRoutes;
