import React, { useState, useEffect, useRef } from 'react';
import RadioButton from '../../components/radio/RadioButton';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register_user } from '../../store/actions/authAction';


const Register = () => {

    const pStyle = {
        color: '#bf1650'
    };

    const dispatch = useDispatch();
  
    const [Gender, setGender] = useState('Male');

    const { register, errors, handleSubmit, watch, reset } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data, e) => {

        var userInfo = {
            "FirstName": data.FirstName,
            "LastName": data.LastName,
            "UserName": data.UserName,
            "Email": data.Email,
            "ContactNumber": data.ContactNumber,
            "Password": data.password,
            "Gender": Gender
        }

        dispatch(register_user(userInfo))
      
        e.target.reset();
    };

    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            <h1>Register Here</h1>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-row">

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">First Name</label>
                        <input className="form-control" name="FirstName" type="text" placeholder="First name ..." ref={register({ required: true })} />
                        {errors.FirstName && <p style={pStyle}>This field is required</p>}
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Last Name</label>
                        <input className="form-control" type="text" name="LastName" placeholder="Last name ..." ref={register({ required: true })} />
                        {errors.LastName && <p style={pStyle}>This field is required</p>}
                    </fieldset>
                </div>

            </div>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">User Name</label>
                        <input className="form-control" type="text" name="UserName" placeholder="Username ..." ref={register({ required: true })} />
                        {errors.UserName && <p style={pStyle}>This field is required</p>}
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Email</label>
                        <input className="form-control" type="email" name="Email" placeholder="Email ..." ref={register({ required: true })} />
                        {errors.Email && <p style={pStyle}>This field is required</p>}
                    </fieldset>
                </div>
            </div>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Contact Number</label>
                        <input className="form-control" type="text" name="ContactNumber" placeholder="Contact Number..." ref={register} />
                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label><strong>Gender :</strong></label><br />
                        <label>
                            <div>
                                <RadioButton inline={true} name="gender" value="Male" checked={Gender === 'Male'} onChange={() => setGender('Male')}>पुरुस</RadioButton>
                                <RadioButton inline={true} name="gender" value="Female" checked={Gender === 'Female'} onChange={() => setGender('Female')}>महिला</RadioButton>
                                <RadioButton inline={true} name="gender" value="Other" checked={Gender === 'Other'} onChange={() => setGender('Other')}>अन्य</RadioButton>
                            </div>
                        </label>
                    </fieldset>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Password</label>
                        <input className="form-control"
                            type="password" placeholder="Password ..."
                            name="password"
                            ref={register({
                                required: "You must specify a password",
                                minLength: {
                                    value: 5,
                                    message: "Password must have at least 5 characters"
                                }
                            })}
                        />
                        {errors.password && <p style={pStyle}>{errors.password.message}</p>}

                    </fieldset>
                </div>

                <div className="form-group col-md-6">
                    <fieldset>
                        <label className="control-label">Re-Enter Password</label>
                        <input className="form-control"
                            name="password_repeat"
                            type="password" placeholder="Re-Enter Password ..."
                            ref={register({
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })} />

                        {errors.password_repeat && <p style={pStyle}>{errors.password_repeat.message}</p>}

                    </fieldset>
                </div>
            </div>


            <button type="submit" className="btn btn-primary">Register</button>

            </form>
        </div>
    )
}

export default Register;