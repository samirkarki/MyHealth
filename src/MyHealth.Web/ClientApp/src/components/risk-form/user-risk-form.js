import React, { useState, Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addKeyValue } from '../../utils/json-helper';
import RadioButton from '../../components/radio/RadioButton';
import Checkbox from '../../components/checkbox/Checkbox';
import { saveUserResponse, load } from '../../store/actions/questionActions';
import QuestionComponent from './../../pages/covid-test/QuestionComponent';

import { tokenConfig, getUserIdFromToken } from '../../utils/tokenUtility';
import axios from 'axios';
import { notifyError } from '../../components/toast/toast'


const symptoms = [
    {
        id: 1,
        name: "सुख्खा खोकी",
        remarks: "",
        symptomDetails: [
            {
                symptomId: 1,
                description: "xa",
                remarks: "xa",
                id: 1
            },
            {
                symptomId: 1,
                description: "xaina",
                remarks: "xaina",
                id: 2
            },
        ],
    },
    {
        id: 2,
        name: "जिउ दुख्ने",
        remarks: "",
        symptomDetails: [
            {
                symptomId: 2,
                description: "xa",
                remarks: "xa",
                id: 3
            },
            {
                symptomId: 2,
                description: "xaina",
                remarks: "xaina",
                id: 4
            },
        ],
    }
]



class UserRiskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionaaire: [],
            age: '',
            gender: '',
            contacted_victims: '',
            contact_num: '',
            current_status: ''
        }
    }

    componentDidMount() {
        const config = tokenConfig();
        const userid = getUserIdFromToken();

        axios.get(`/api/questionnaire/${userid}`, config)
            .then(res => {
                symptoms.forEach(itemdetail => {
                    if (itemdetail.symptomDetails) {
                        itemdetail.symptomDetails.forEach(item => {
                            addKeyValue(item, 'isChecked', false)
                        })
                    }
                })
                this.setState({
                    questionaaire: symptoms
                })
            })
            .catch(err => {
                console.log(err);
                notifyError('Cannot load questions. Please try again.')
            })
    }


    handleChange = (event) => {

        const questions = [...this.state.questionaaire]

        questions.forEach(itemdetail => {
            itemdetail.symptomDetails.forEach(item => {
                if (item.id == event.target.name)
                    item.isChecked = event.target.checked
            })
        })

        this.setState({
            questionaaire: questions
        })
    }

    setAge = (evt) => {
        this.setState({
            age: evt.target.value
        });
    }

    setGender = (evt) => {
        console.log(evt.target)
        this.setState({
            gender: evt.target.value
        })
    }


    setContactedVictims = (evt) => {
        this.setState({
            contacted_victims: evt.target.value
        })
    }

    setCurrentStatus = (evt) => {
        this.setState({
            current_status: evt.target.value
        })
    }


    render() {

        { console.log('render function', this.state) }
        return (
            <div className="form">

                <div className="form-group">
                    <fieldset>
                        <label className="control-label"><strong>तपाइको उमेर :</strong></label>
                        <input className="form-control" name="age" required type="text" placeholder="तपाइको उमेर :" onChange={this.setAge} />
                    </fieldset>
                </div>


                <div className="form-group">
                    <fieldset>
                        <label><strong>लिङ्ग :</strong></label><br />
                        <label>
                            <div>
                                <RadioButton inline={true} name="gender" value="Male" onChange={this.setGender}>पुरुस</RadioButton>
                                <RadioButton inline={true} name="gender" value="Femail" onChange={this.setGender}>महिला</RadioButton>
                                <RadioButton inline={true} name="gender" value="Other" onChange={this.setGender}>अन्य</RadioButton>
                            </div>
                        </label>
                    </fieldset>
                </div>



                <label><strong>तपाइ ले निम्न लिखित कुन कुन लक्ष्यनहरु अनुभब गर्नु भएको छ   :</strong></label><br />
                <Fragment style={{marginLeft: '25px'}}>
                {
                    this.state.questionaaire.length > 0 ? <QuestionComponent data={this.state.questionaaire} onChange={this.handleChange} /> : <div>Loading...</div>
                }
                </Fragment>
                <div className="form-group">
                    <fieldset>
                        <label><strong>कोरोना सन्क्रमित सङग सम्पर्क भएको छ कि छैन ?</strong></label><br />
                        <label>
                            <div>
                                <RadioButton inline={true} name="contacted_victims" value="Y" onChange={this.setContactedVictims}>छ</RadioButton>
                                <RadioButton inline={true} name="contacted_victims" value="N" onChange={this.setContactedVictims}>छैन</RadioButton>
                            </div>
                        </label>
                    </fieldset>
                </div>


                {/* <div className="form-group">
                    <fieldset>
                        <label><strong> तपाईलाई अन्य कुनै रोग हरु छ ?</strong></label><br />
                        <div>
                            <Checkbox
                                checked={false}
                                onChange={(e) => { console.log(e.target) }}
                            />
                            <span style={{ marginLeft: 8 }}>सुगर ( चिनी रोग)</span>
                        </div>
                        <div>
                            <Checkbox
                                checked={false}
                                onChange={(e) => { console.log(e.target) }}
                            />
                            <span style={{ marginLeft: 8 }}>उच्च रक्तचाप ( प्रेसर) </span>
                        </div>
                        <div>
                            <Checkbox
                                checked={false}
                                onChange={(e) => { console.log(e.target) }}
                            />
                            <span style={{ marginLeft: 8 }}>दम</span>
                        </div>
                        <div>
                            <Checkbox
                                checked={false}
                                onChange={(e) => { console.log(e.target) }}
                            />
                            <span style={{ marginLeft: 8 }}>क्षयरोग</span>
                        </div>
                        <div>
                            <Checkbox
                                checked={false}
                                onChange={(e) => { console.log(e.target) }}
                            />
                            <span style={{ marginLeft: 8 }}>थाइरोइडको रोग</span>
                        </div>
                    </fieldset>
                </div> */}

                <div className="form-group">
                    <fieldset>
                        <label><strong>हाल कहाँ हुनुहुनछ ?</strong></label><br />
                        <label>
                            <div>
                                <RadioButton inline={true} name="current_status" value="Self-Quarantine" onChange={this.setCurrentStatus}>Self Quarantine</RadioButton>
                                <RadioButton inline={true} name="current_status" value="Isolation" onChange={this.setCurrentStatus}>Isolation</RadioButton>
                            </div>
                        </label>
                    </fieldset>
                </div>

                <button type="button" className="btn btn-primary">Submit</button>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        questions_state: state.questionReducer.questions
    };
}

const mapDispatchToProps = {
    saveUserResponse,
    load
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRiskForm);