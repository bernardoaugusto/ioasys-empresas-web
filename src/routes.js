import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login/login';
import Home from './pages/Home/home';
import EnterpriseDetail from './pages/EnterpriseDetail/enterpriseDetail';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);

const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={{ pathname: "/home" }} />
                </Route>
                <PrivateRoute path="/home" exact component={Home} />
                <LoginRoute path="/login" component={Login} />
                <PrivateRoute path="/home/enterpriseDetail/:id" component={EnterpriseDetail} />
            </Switch>
        </BrowserRouter>
    )
}