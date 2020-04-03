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
        <h1>Result</h1>
    )
}

export default Result;