import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/actions/authAction';

const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);


    const clientId = "749061088249-339fn2hlbc4tbg6e849oljsk52q3ou22.apps.googleusercontent.com";
    const fbAppId = "211665063234659";

    const responseGoogle = (response) => {

        console.log(response)
       
        let imageUrl = response.profileObj.imageUrl;
        let email = response.profileObj.email;
        let name = response.profileObj.name;
        let access_token = response.tokenObj.access_token;

        dispatch(login(name, email, imageUrl, access_token))
    }

    const responseFacebook = (response) => {
        
        let name = response.name;
        let email = response.name;
        let picture = response.picture.data.url;
        let accessToken = response.accessToken;

        console.log(response)
        dispatch(login(name, email, picture, accessToken))
    }


    if (auth.isAuthenticated) {
        return <Redirect to="/profile" />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="card border-secondary mb-3" style={{ marginTop: '150px' }}>
                        <div className="card-header">Login</div>
                        <div className="card-body text-center">
                            <div>
                                <GoogleLogin
                                    clientId={clientId}
                                    render={renderProps => (
                                        <button className="btn btn-secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}><span><i className="fa fa-google"></i></span>Sign in with Google</button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <FacebookLogin
                                    appId={fbAppId}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <button className="btn btn-info" onClick={renderProps.onClick}>Sign in with Facebook</button>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;