import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DiseaseForm from '../admin/disease/disease-form';
import InfectedCountryForm from '../admin/country/infected-country-form';
import SymptomsForm from '../admin/symptoms/symptoms-form';
import UserManagement from './user/user-management';

const AdminManagement = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);
    const user = useSelector(state => state.userReducer);

    return (
        <div className="col-md-12" style={{ marginTop: '15px' }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#disease">Disease</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#symptoms">Symptoms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#infected-country">Infected Country</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#users">Users</a>
                </li>
                
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active show" id="disease">
                    <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                        <div className="card-body">
                            <DiseaseForm />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="symptoms">
                    <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                        <div className="card-body">
                            <SymptomsForm />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="infected-country">
                    <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                        <div className="card-body">
                            <InfectedCountryForm />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="users">
                    <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                        <div className="card-body">
                            <UserManagement />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminManagement;