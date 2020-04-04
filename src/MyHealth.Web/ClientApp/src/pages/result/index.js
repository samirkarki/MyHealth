import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Result = () => {


    const dispatch = useDispatch();
    const response_state = useSelector(state => state.questionReducer);
    const auth = useSelector(state => state.authReducer);




    if (auth.isAuthenticated) {
        if (!response_state.responseScore) {
            return <Redirect to="/test-covid" />
        }
    } else {
        return <Redirect to="/" />
    }

    return (
        <div className="col-md-12">
            <div className="col-md-3">
                <div className="card border-primary">
                    <div className="card-header">Results</div>
                    <div className="card-body">
                        <h4 className="card-title">Predictions: </h4>
                        <p className="card-text">Predicted Disease: <span>{response_state.responseScore.diseaseName}</span></p>
                        <p className="card-text">Predicted Score: <span>{response_state.responseScore.totalScore}</span></p>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card border-primary">
                    <div className="card-header">Suggestions</div>
                    <div className="card-body">
                        <h4 className="card-title">Our Suggestions: </h4>
                        <p className="card-text">Stay at home</p>
                        <p className="card-text">Wash hands regularly</p>
                        <p className="card-text">Take plenty of warm water</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Result;