import React, { useState } from 'react';


const Login = () => {
    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-6">
                <h1>Login Here</h1>

                <div className="form-group">
                    <fieldset disabled="">
                        <label className="control-label">Username / Email</label>
                        <input className="form-control" type="text" placeholder="Username / Email ..." disabled="" />
                    </fieldset>
                </div>

                <div className="form-group">
                    <fieldset>
                        <label className="control-label">Password</label>
                        <input className="form-control" type="text" placeholder="Password…" />
                    </fieldset>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <a href="#" className="btn btn-info float-right">Register</a>
            </div>
        </div>
        </div>
    )
}

export default Login;