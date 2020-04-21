import React, { useState, Component, Fragment } from "react";
import { connect } from "react-redux";
import { addKeyValue } from "../../utils/json-helper";
import RadioButton from "../../components/radio/RadioButton";
import Checkbox from "../../components/checkbox/Checkbox";
import {
  saveUserResponse,
  initialStateLoad,
} from "../../store/actions/questionActions";
import QuestionComponent from "./../../pages/covid-test/QuestionComponent";

import { tokenConfig, getUserIdFromToken } from "../../utils/tokenUtility";
import axios from "axios";
import { notifyError, notifyInfo } from "../../components/toast/toast";
import { Redirect } from "react-router-dom";
import Loader from "../loader";

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
      gender: "",
      contact_num: "",
      userId: "",
    };
  }

  componentDidMount() {
    const config = tokenConfig();
    const user = getUserIdFromToken();
    user.userId = user.userId ?? "anonymous-" + new Date().getTime();
    this.setState({
      userId: user.userId,
    });
    axios
      .get(`/api/questionnaire/${user.userId}`, config)
      .then((res) => {
        const symptoms = res.data.symptoms;

        symptoms.forEach((itemdetail) => {
          if (itemdetail.symptomDetails) {
            itemdetail.symptomDetails.forEach((item) => {
              addKeyValue(item, "selected", false);
            });
          }
        });
        this.setState({
          questionaaire: symptoms,
        });
      })
      .catch((err) => {
        console.log(err);
        notifyError("Cannot load questions. Please try again.");
      });
  }

  handleChange = (event) => {
    const questions = [...this.state.questionaaire];

    questions.forEach((itemdetail) => {
      itemdetail.symptomDetails.forEach((item) => {
        if (item.symptomId == event.target.name) item.selected = false;
        if (item.id == event.target.value) item.selected = event.target.checked;
      });
    });

    this.setState(
      {
        questionaaire: questions,
      },
      () => {
        console.log("questiona change", this.state);
      }
    );
  };

  setAge = (evt) => {
    this.setState({
      age: evt.target.value,
    });
  };

  setGender = (evt) => {
    console.log(evt.target);
    this.setState({
      gender: evt.target.value,
    });
  };

  setContactNumber = (evt) => {
    this.setState({
      contact_num: evt.target.value,
    });
  };

  saveResponse = (evt) => {
    evt.preventDefault();

    const user = getUserIdFromToken();
    const { age, contact_num, gender, userId } = this.state;
    const selected_symptoms = [...this.state.questionaaire];
    const checkedSymptoms = [];
    selected_symptoms.forEach((itemdetail) => {
      itemdetail.symptomDetails.forEach((item) => {
        if (item.selected == true) {
          var obj = {
            userId: user.userId,
            symptomId: item.symptomId.toString(),
            symptomDetailId: item.id.toString(),
            selected: item.selected,
          };
          checkedSymptoms.push(obj);
        }
      });
    });
    if (!age) {
      notifyError("Age is required !");
      return false;
    } else if (!contact_num) {
      notifyError("Contact number is required !");
      return false;
    } else if (!gender) {
      notifyError("Gender is required !");
      return false;
    } else if (checkedSymptoms.length !== this.state.questionaaire.length) {
      notifyError("Please answer all the symptoms");
      return false;
    } else {
      var obj = {
        userId: userId,
        age: parseInt(age),
        contactNumber: contact_num,
        gender: gender,
        userSymptoms: checkedSymptoms,
      };
      this.props.saveUserResponse(obj);
    }
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.saveResponse}>
          <div className="form-group">
            <input name="userId" type="hidden" value="" />
            <label className="control-label">
              <strong>तपाइको उमेर :</strong>
            </label>
            <input
              style={{ width: "500px" }}
              className="form-control"
              name="age"
              type="number"
              placeholder="तपाइको उमेर :"
              onChange={this.setAge}
            />
          </div>

          <div className="form-group">
            <label className="control-label">
              <strong>Contact number :</strong>
            </label>
            <input
              style={{ width: "500px" }}
              className="form-control"
              name="contact_number"
              type="text"
              placeholder="Phone Number :"
              onChange={this.setContactNumber}
            />
          </div>

          <div className="form-group">
            <fieldset>
              <label>
                <strong>लिङ्ग :</strong>
              </label>
              <br />
              <label>
                <div>
                  <RadioButton
                    inline={true}
                    name="gender"
                    value="Male"
                    onChange={this.setGender}
                  >
                    पुरुस
                  </RadioButton>
                  <RadioButton
                    inline={true}
                    name="gender"
                    value="Femail"
                    onChange={this.setGender}
                  >
                    महिला
                  </RadioButton>
                  <RadioButton
                    inline={true}
                    name="gender"
                    value="Other"
                    onChange={this.setGender}
                  >
                    अन्य
                  </RadioButton>
                </div>
              </label>
            </fieldset>
          </div>

          {this.state.questionaaire.length > 0 ? (
            <Fragment>
              <label>
                <strong>
                  तपाइले निम्न लिखित कुन कुन लक्ष्यनहरु अनुभब गर्नु भएको छ :
                </strong>
              </label>
              <br />
              <br />
              <QuestionComponent
                data={this.state.questionaaire}
                onChange={this.handleChange}
              />

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Fragment>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions_state: state.questionReducer,
  };
};

const mapDispatchToProps = {
  saveUserResponse,
  initialStateLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRiskForm);
