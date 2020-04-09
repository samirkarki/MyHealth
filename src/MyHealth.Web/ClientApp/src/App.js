import React, { Component, Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Provider, useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions/authAction';
import { loadUserResult } from './store/actions/questionActions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Register from './pages/account/Register';
import Login from './pages/account/Login';
import PrivateRoutes from './components/common/PrivateRoute';
import Dashboard from './pages/admin/dashboard';
import Diseases from './pages/admin/diseases';
import CatsForm from './pages/admin/form';
import AdminManagement from './pages/admin/management';
import Profile from './pages/profile/Profile';
import CovidTest from './pages/covid-test/CovidTest';
import AdminRoutes from './components/common/AdminRoutes';
import Result from './pages/result';
import Reports from './pages/admin/report/reports';

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
        store.dispatch(loadUserResult())
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Header />
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <AdminRoutes exact path="/admin/reports" component={Reports} />
                                <PrivateRoutes exact path="/result" component={Result} />
                                <PrivateRoutes exact path="/user-profile" component={Profile} />
                                <PrivateRoutes exact path="/test-covid" component={CovidTest} />
                                <AdminRoutes exact path="/admin/management" component={AdminManagement} />
                                <AdminRoutes exact path="/admin/dashboard" component={Dashboard} />
                                <AdminRoutes exact path="/admin/diseases" component={Diseases} />
                                <AdminRoutes exact path="/admin/catform" component={CatsForm} />
                                <Route path="*" component={() => <h1>Not found</h1>} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    )

}

export default App;