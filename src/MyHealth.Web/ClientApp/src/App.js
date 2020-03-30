import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions/authAction';
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

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
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
                                    <PrivateRoutes path="/user-profile" component={Profile} />
                                    <PrivateRoutes path="/test-covid" component={CovidTest} />
                                    <PrivateRoutes path="/admin/management" component={AdminManagement} />
                                    <Route exact path="/admin/dashboard" component={Dashboard} />
                                    <Route exact path="/admin/diseases" component={Diseases} />
                                    <Route exact path="/admin/catform" component={CatsForm} />
                                    <Route path="*" component={() => <h1>Not found</h1>} />
                                </Switch>
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default App;