import React from 'react';
import DiseaseForm from './disease/disease-form';
import TemperatureForm from './disease/temperature-form';
import InfectedCountryForm from './disease/infected-country-form';
import SymptomsForm from './disease/symptoms-form';

const AdminManagement = () => {
    return (
        <div className="col-md-12" style={{ marginTop: '15px' }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#disease">Disease</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#temperature">Temperature</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#symptoms">Symptoms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#infected-country">Infected Country</a>
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
                <div className="tab-pane fade" id="temperature">
                    <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                        <div className="card-body">
                            <TemperatureForm />
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

            </div>
        </div>
    )
}


export default AdminManagement;