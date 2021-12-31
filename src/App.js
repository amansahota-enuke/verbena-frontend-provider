import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./Layouts";
import {
    SignUpPage,
    LoginPage,
    ForgotPasswordPage,
    UpdatePasswordPage,
    SubscriptionPage,
    SetupFeePage
} from "./Pages";
import { ScrollToTop, Footer, AppointmentPopup, Subscription } from "./Components";
import { PrivateRoute } from "./Components";
import { TokenService } from "./services";
import Confirmation from "./Layouts/Confirmation";


function App() {
    return (
        <>
            <div className="wrapper h-full">
                <ScrollToTop>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() =>
                                !!TokenService.getToken() ? (
                                    <Redirect to="/home" />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <PrivateRoute path="/home" component={Layout} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignUpPage} />
                        <Route path="/setupfee" component={SetupFeePage} />
                        <Route path="/subscription" component={SubscriptionPage} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPasswordPage}
                        />
                        <Route
                            path="/update-password"
                            component={UpdatePasswordPage}
                        />
                        <Route
                            path="/appointment/:id"
                            component={AppointmentPopup}
                        />
                        <Route component={Error} />
                    </Switch>
                </ScrollToTop>
                <Footer />
                <Confirmation />
            </div>
        </>
    );
}

export default App;
