import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  login,
  login_usual,
  getSettings,
} from "../../store/actions/authAction";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [googleClientId, setGoogleClientId] = useState("");
  const [facebookAppId, setFacebookId] = useState("");

  useEffect(() => {
    bindSettings();
  }, []);

  const bindSettings = async () => {
    let data = await getSettings();
    if (data != null) {
      setGoogleClientId(data.googleClientId);
      setFacebookId(data.facebookAppId);
    }
  }

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  const responseGoogle = (response) => {
    console.log(response.profileObj);

    let email = null;
    if (response.profileObj.email == "" || response.profileObj.email == null) {
      email = "username@noemail.com";
    } else {
      email = response.profileObj.email;
    }

    let userInfo = {
      imageUrl: response.profileObj.imageUrl,
      email: email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      fullName: response.profileObj.name,
      userName: "user_" + response.googleId,
    };

    console.log(userInfo);

    dispatch(login(userInfo));
  };

  const responseFacebook = (response) => {
    console.log(response);
    let email = null;
    if (response.email == "" || response.email == null) {
      email = "username@noemail.com";
    } else {
      email = response.email;
    }

    let userInfo = {
      imageUrl: response.picture.data.url,
      email: email,
      firstName: response.last_name,
      lastName: response.first_name,
      fullName: response.name,
      userName: "user_" + response.id,
    };

    console.log(userInfo);
    dispatch(login(userInfo));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    let userInfo = {
      UserName: UserName,
      Password: Password,
    };

    dispatch(login(userInfo));
  };

  if (auth.isAuthenticated) {
    if (auth.user.isAdmin == true || auth.user.isAdmin == "True") {
      return <Redirect to="/admin/management" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <div
            className="card border-secondary mb-3"
            style={{ marginTop: "150px" }}
          >
            <div className="card-header">Login</div>
            <div className="card-body">
              <div className="form">
                <div className="form-group">
                  <fieldset>
                    <label className="control-label">User Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name ..."
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="form-group">
                  <fieldset>
                    <label className="control-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </fieldset>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitLogin}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>

              <div className="text-center" style={{ marginTop: "15px" }}>
                {googleClientId && googleClientId.length > 0 && (
                  <div>
                    <GoogleLogin
                      clientId={googleClientId}
                      render={(renderProps) => (
                        <button
                          className="btn btn-secondary"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <span>
                            <i className="fa fa-google"></i>
                          </span>
                          Sign in with Google
                        </button>
                      )}
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                    />
                  </div>
                )}
                {facebookAppId && facebookAppId.length > 0 && (
                  <div style={{ marginTop: "15px" }}>
                    <FacebookLogin
                      appId={facebookAppId}
                      fields="name,email,picture,first_name,last_name"
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <button
                          className="btn btn-info"
                          onClick={renderProps.onClick}
                        >
                          Sign in with Facebook
                        </button>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
