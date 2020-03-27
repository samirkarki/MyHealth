import React, { useState } from 'react';
import DiseaseForm from './disease/disease-form';
import TemperatureForm from './disease/temperature-form';

const Diseases = () => {

    return (
        <div className="col-md-12">
            <div className="card border-secondary mb-3" style={{ marginTop: '10px' }}>
                <div className="card-header">Disease</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card border-secondary mb-3">
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <DiseaseForm />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card border-secondary mb-3">
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <TemperatureForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Diseases;