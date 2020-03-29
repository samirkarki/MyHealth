import React, { Fragment } from 'react';
import UserRiskForm from '../../components/risk-form/user-risk-form';
import { useDispatch,useSelector } from 'react-redux';

const Profile = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);

    return (
        <Fragment>

            <div className="col-md-12" style={{ marginTop: '10px' }}>
                <div className="alert alert-dismissible alert-info">
                    <h4 className="alert-heading">Info!</h4>
                    <p className="mb-0">
                        Hi! { auth.isAuthenticated ? auth.user.firstName : ''}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;