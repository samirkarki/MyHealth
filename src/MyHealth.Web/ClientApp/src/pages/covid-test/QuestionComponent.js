import React, { Component, Fragment } from 'react';
import RadioButton from '../../components/radio/RadioButton';
import Checkbox from '../../components/checkbox/Checkbox';

const QuestionInfoComponent = ({ info, idx, ...props }) => {
    return (
        <fieldset>
            <label><strong>{idx}. {info.name} : </strong> </label>
            <Fragment>{props.children}</Fragment>
        </fieldset>
    )
}

const QuestionDetailComponent = ({ infoDetails, callbackFn, ...props }) => {
    return (infoDetails.map((item, index) => (
            <label key={index}>
                {/* <Checkbox checked={item.isChecked} name={item.id} value={item.description} onChange={(e) => callbackFn(e)} /> */}
                <RadioButton inline={true} checked={item.selected} name={item.symptomId} value={item.id} onChange={(e) => callbackFn(e)}>{item.description}</RadioButton>
                {/* <span>{item.description}</span> */}
            </label>
        )
    ))
}


const QuestionComponent = ({ data, onChange, ...props }) => {
    return (
        data.map((symptom, index) => {
            return (
                <div key={index}>
                    <QuestionInfoComponent idx={index+1} info={symptom}>
                        <div>
                            <QuestionDetailComponent infoDetails={symptom.symptomDetails} callbackFn={onChange} />
                        </div>
                    </QuestionInfoComponent>
                </div>
            )
        })
    )
}

export default QuestionComponent;