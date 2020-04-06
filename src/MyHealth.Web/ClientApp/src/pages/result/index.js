import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {loadUserResult} from '../../store/actions/questionActions';


const ResultViewComponent = ({ dataitem, ...props }) => {
    return (
        <div className="col-md-12" style={{ marginTop: '20px' }}>
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-secondary">
                        <div className="card-header">Results</div>
                        <div className="card-body">
                            <h4 className="card-title">Predictions: </h4>
                            <p className="card-text">Predicted Disease: <span>{dataitem.diseaseName}</span></p>
                            <p className="card-text">Predicted Score: <span>{dataitem.totalScore}</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card border-secondary">
                        <div className="card-header">Suggestions</div>
                        <div className="card-body">
                            <div className="alert alert-dismissible alert-info">
                                <p className="mb-0">
                                    Hi! Our coronavirus disease self assessment scan has been developed on the basis of guidelines from the WHO and MoH, Government of Nepal. This interaction should not be taken as expert medical advice. Any information you share with us will be kept strictly confidential.
                        </p>
                            </div>
                            {
                                dataitem.safetyMeasures?.split(',').map((item, idx) => {
                                    return <p key={idx}> &rarr; {item}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const Result = () => {

    const dispatch = useDispatch();
    const response_state = useSelector(state => state.questionReducer);
    const auth = useSelector(state => state.authReducer);


    useEffect(()=>{
        dispatch(loadUserResult())
    },[])


    if (auth.isAuthenticated) {
        if (!response_state.responseScore) {
            return <Redirect to="/test-covid" />
        }
    } else {
        return <Redirect to="/login" />
    }

    const getMax = (arr, prop) => {
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (max == null || parseFloat(arr[i][prop]) > parseFloat(max[prop]))
                max = arr[i];
        }
        return max;
    }

    const maxTotalScore = getMax(response_state.responseScore, 'totalScore')
    const maxMajorScore = getMax(response_state.responseScore, 'majorScore')

    console.log(maxTotalScore, maxMajorScore)
    const to_show = response_state.responseScore.filter(item => item.totalScore == maxTotalScore.totalScore && item.majorScore == maxMajorScore.majorScore);

    console.log('filtered item ', to_show)

    if (to_show.length == 1) {
        return <ResultViewComponent dataitem={to_show[0]} />
    } else {
        const to_show_arr = to_show.filter(item => item.majorScore == maxMajorScore.majorScore);
        console.log('filtered alternate item ', to_show_arr)
        return <ResultViewComponent dataitem={to_show_arr[0]} />
    }
}

export default Result;