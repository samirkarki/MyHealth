import React, { Fragment } from 'react';
import UserRiskForm from '../../components/risk-form/user-risk-form';

const CovidTest = () => {
    return (
        <Fragment>

            <div className="col-md-12" style={{ marginTop: '10px' }}>
                <div className="alert alert-dismissible alert-info">
                    <h4 className="alert-heading">Info!</h4>
                    <p className="mb-0">
                        Hi! Our coronavirus disease self assessment scan has been developed on the basis of guidelines from the WHO and MoH, Government of Nepal. This interaction should not be taken as expert medical advice. Any information you share with us will be kept strictly confidential.
                    </p>
                </div>
                <UserRiskForm />
            </div>
        </Fragment>
    )
}

export default CovidTest;