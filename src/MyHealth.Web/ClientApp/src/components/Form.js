import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead, addLead } from '../store/actions/leadsAction';
import Checkbox from './checkbox/Checkbox';
import RadioButton from './radio/RadioButton';

const Form = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();
    const leads = useSelector(state => state.leadReducer.leads);

    useEffect(() => {
        dispatch(getLeads());
    }, [])


    const handleSubmit = (evt) => {
        evt.preventDefault();
        const lead = { name, email, message };
        dispatch(addLead(lead))
        clearForm();
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div className="form">
            <h1>Add Leads</h1>

            <div className="form-group">
                <fieldset>
                    <label className="control-label">Name</label>
                    <input className="form-control" type="text" placeholder="Name ..." onChange={e => setName(e.target.value)} value={name} />
                </fieldset>
            </div>

            <div className="form-group">
                <fieldset>
                    <label className="control-label">Email</label>
                    <input className="form-control" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                </fieldset>
            </div>

            <div className="form-group">
                <fieldset>
                    <label className="control-label">Message</label>
                    <input className="form-control" type="text" placeholder="Message" onChange={e => setMessage(e.target.value)} value={message} />
                </fieldset>
            </div>

            <div className="form-group">
                <label>
                    <Checkbox
                        checked={checked}
                        onChange={(e) => { console.log(e.target); setChecked(e.target.checked) }}
                    />
                    <span style={{ marginLeft: 8 }}>Label Text</span>
                </label>
            </div>

            <div className="form-group">
                <label>
                    <div>
                        <RadioButton name="test" value="1" onChange={(e)=> {console.log(e.target.value)}}>RadioBtn #1</RadioButton>
                        <RadioButton name="test" value="2" onChange={(e)=> {console.log(e.target.value)}}>RadioBtn #2</RadioButton>
                        <RadioButton name="test">RadioBtn #3</RadioButton>
                    </div>
                </label>
            </div>


            <button type="button" onClick={handleSubmit} className="btn btn-primary">Save</button>
        </div>
    )
}


Form.propTypes = {
    addLead: PropTypes.func
}


export default Form;
