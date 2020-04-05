import React, { useState, Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addKeyValue } from '../../utils/json-helper';
import RadioButton from '../../components/radio/RadioButton';
import Checkbox from '../../components/checkbox/Checkbox';
import { saveUserResponse, initialStateLoad } from '../../store/actions/questionActions';
import QuestionComponent from './../../pages/covid-test/QuestionComponent';

import { tokenConfig, getUserIdFromToken } from '../../utils/tokenUtility';
import axios from 'axios';
import { notifyError, notifyInfo } from '../../components/toast/toast'
import { Redirect } from 'react-router-dom';


// const symptoms = [
//     {
//         id: 1,
//         name: "सुख्खा खोकी",
//         remarks: "",
//         symptomDetails: [
//             {
//                 symptomId: 1,
//                 description: "xa",
//                 remarks: "xa",
//                 id: 1
//             },
//             {
//                 symptomId: 1,
//                 description: "xaina",
//                 remarks: "xaina",
//                 id: 2
//             },
//         ],
//     },
//     {
//         id: 2,
//         name: "जिउ दुख्ने",
//         remarks: "",
//         symptomDetails: [
//             {
//                 symptomId: 2,
//                 description: "xa",
//                 remarks: "xa",
//                 id: 3
//             },
//             {
//                 symptomId: 2,
//                 description: "xaina",
//                 remarks: "xaina",
//                 id: 4
//             },
//         ],
//     }
// ]



class UserRiskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionaaire: [],
            age: 0,
            gender: '',
            contact_num: ''
        }
    }

    componentDidMount() {

        const config = tokenConfig();
        const user = getUserIdFromToken();

        axios.get(`/api/questionnaire/${user.userId}`, config)
            .then(res => {

                const symptoms = res.data.symptoms

                symptoms.forEach(itemdetail => {
                    if (itemdetail.symptomDetails) {
                        itemdetail.symptomDetails.forEach(item => {
                            addKeyValue(item, 'selected', false)
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
                if (item.symptomId == event.target.name)
                    item.selected = false
                if (item.id == event.target.value)
                    item.selected = event.target.checked
            })
        })

        this.setState({
            questionaaire: questions
        }, () => {
            console.log('questiona change', this.state)
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


    setContactNumber = (evt) => {
        this.setState({
            contact_num: evt.target.value
        })
    }


    saveResponse = (evt) => {
        evt.preventDefault()

        const user = getUserIdFromToken();
        const { age, contact_num, gender } = this.state;
        const selected_symptoms = [...this.state.questionaaire]
        const checkedSymptoms = []
        selected_symptoms.forEach(itemdetail => {
            itemdetail.symptomDetails.forEach(item => {
                if (item.selected == true) {
                    var obj = {
                        userId: user.userId,
                        symptomId: item.symptomId.toString(),
                        symptomDetailId: item.id.toString(),
                        selected: item.selected
                    }
                    checkedSymptoms.push(obj)
                }
            })
        })


        if (!gender) {
            notifyInfo('Gender is required !')
            return false
        } else if (checkedSymptoms.length <= 0) {
            notifyInfo('Please answer all the symptoms')
            return false
        } else {
            var obj = {
                userId: user.userId,
                age: parseInt(age),
                contactNumber: contact_num,
                gender: gender,
                userSymptoms: checkedSymptoms
            }
            this.props.saveUserResponse(obj)
        }

    }


    render() {

        if (this.props.questions_state.responseScore) {
            return <Redirect to='/result' />
        }

        return (
            <div>
                <form className="form" onSubmit={this.saveResponse}>

                    <div className="form-group">
                        <fieldset>
                            <label className="control-label"><strong>तपाइको उमेर :</strong></label>
                            <input className="form-control" name="age" required type="number" placeholder="तपाइको उमेर :" onChange={this.setAge} />
                        </fieldset>
                    </div>

                    <div className="form-group">
                        <fieldset>
                            <label className="control-label"><strong>Contact number :</strong></label>
                            <input className="form-control" name="contact_number" type="text" placeholder="Phone Number :" onChange={this.setContactNumber} />
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
                    {
                        this.state.questionaaire.length > 0 ? <QuestionComponent data={this.state.questionaaire} onChange={this.handleChange} /> : <div>Loading...</div>
                    }

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        questions_state: state.questionReducer
    };
}

const mapDispatchToProps = {
    saveUserResponse,
    initialStateLoad
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRiskForm);