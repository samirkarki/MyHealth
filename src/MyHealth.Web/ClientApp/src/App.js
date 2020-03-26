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
                                <Route exact path="/" component={Home} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <PrivateRoutes exact path="/admin/dashboard" component={Dashboard} />   
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default App;