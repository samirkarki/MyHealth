import React, { useState } from 'react';


const Register = () => {
    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            <h1>Register Here</h1>

            <div className="form-row">

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">First Name</label>
                        <input className="form-control" type="text" placeholder="First name ..." />
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Last Name</label>
                        <input className="form-control" type="text" placeholder="Last name ..." />
                    </fieldset>
                </div>

            </div>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">User Name</label>
                        <input className="form-control" type="text" placeholder="Username ..." />
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Email</label>
                        <input className="form-control" type="email" placeholder="Email ..." />
                    </fieldset>
                </div>
            </div>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Username</label>
                        <input className="form-control" type="text" placeholder="Username / Email ..." />
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Age</label>
                        <input className="form-control" type="number" placeholder="Age ..." />
                    </fieldset>
                </div>
            </div>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Contact Number</label>
                        <input className="form-control" type="text" placeholder="Contact Number..." />
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Address</label>
                        <input className="form-control" type="text" placeholder="Address..." />
                    </fieldset>
                </div>
            </div>
            <button type="button" className="btn btn-primary">Register</button>

        </div>
    )
}

export default Register;