import React, { Component } from 'react';
import RadioButton from '../../components/radio/RadioButton';
import Checkbox from '../../components/checkbox/Checkbox';

const QuestionInfoComponent = ({ info, idx, ...props }) => {
    return (
        <fieldset>
            <label><strong>{idx}. {info.name} : </strong> </label>
            <div>{props.children}</div>
        </fieldset>
    )
}

const QuestionDetailComponent = ({ infoDetails, callbackFn, ...props }) => {
    return (infoDetails.map((item, index) => (
        <div key={item.id}>
            <label>
                <Checkbox checked={item.isChecked} name={item.id} value={item.description} onChange={(e) => callbackFn(e)} />
                <span style={{ marginLeft: 8 }}>{item.description}</span>
            </label>
        </div>)
    ))
}


const QuestionComponent = ({ data, onChange, ...props }) => {
    return (
        data.map((symptom, index) => {
            return (
                <div key={index}>
                    <QuestionInfoComponent idx={index+1} info={symptom}>
                        <QuestionDetailComponent infoDetails={symptom.symptomDetails} callbackFn={onChange} />
                    </QuestionInfoComponent>
                </div>
            )
        })
    )
}

export default QuestionComponent;