import React from 'react';
import RadioButton from '../../components/radio/RadioButton';
import Checkbox from '../../components/checkbox/Checkbox';

const UserRiskForm = () => {
    return (
        <div className="form">

            <div className="form-group">
                <fieldset>
                    <label className="control-label"><strong>तपाइको उमेर :</strong></label>
                    <input className="form-control" type="text" placeholder="तपाइको उमेर :" />
                </fieldset>
            </div>


            <div className="form-group">
                <fieldset>
                    <label><strong>लिङ्ग :</strong></label><br />
                    <label>
                        <div>
                            <RadioButton name="gender" value="M" onChange={(e) => { console.log(e.target.value) }}>पुरुस</RadioButton>
                            <RadioButton name="gender" value="F" onChange={(e) => { console.log(e.target.value) }}>महिला</RadioButton>
                            <RadioButton name="gender" value="O" onChange={(e) => { console.log(e.target.value) }}>अन्य</RadioButton>
                        </div>
                    </label>
                </fieldset>
            </div>


            <div className="form-group">
                <fieldset>
                    <label><strong>तपाइको वर्तमान तापक्रम :</strong></label><br />
                    <label>
                        <div>
                            <RadioButton name="temperature" value="M" onChange={(e) => { console.log(e.target.value) }}>96.6-96.8</RadioButton>
                            <RadioButton name="temperature" value="F" onChange={(e) => { console.log(e.target.value) }}>96.8-101</RadioButton>
                            <RadioButton name="temperature" value="O" onChange={(e) => { console.log(e.target.value) }}>>102</RadioButton>
                        </div>
                    </label>
                </fieldset>
            </div>

            <div className="form-group">
                <fieldset>
                    <label><strong>तपाइ ले निम्न लिखित कुन कुन लक्ष्यनहरु अनुभब गर्नु भएको छ   :</strong></label><br />
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>ज्वोरो (उच्च तापक्रम )</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>सुख्खा खोकी</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>जिउ दुख्ने</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>जोर्नी, माम्सपेसि दुख्ने</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>रुघा</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>हाच्छुऊ आउने</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>घाँटि दुख्नु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>दिशा लाग्नु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>टाउको दुख्नु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>सास फेर्न गारो हुनु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>कमजोरी हुनु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>खान मन कम हुनु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>नाकको सुग्ने क्षमतामा कमि आउनु</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>छाती दुख्नु ् र छाती भारी हुनु</span>
                    </div>
                </fieldset>
            </div>


            <div className="form-group">
                <fieldset>
                    <label><strong> यो एक महिना ,कुनै पनि कोरोना फैलिएको देशको यात्रा गरेको छ कि छैन ?</strong></label><br />
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>चाइना</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>ईटालि </span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>स्पेन</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>ईरान</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>अमेरिका</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>ईन्ल्यान्ण</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>कतार </span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>दुबई </span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>फ्रान्स</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>ईन्डिया</span>
                    </div>
                    <div>
                        <Checkbox
                            checked={false}
                            onChange={(e) => { console.log(e.target) }}
                        />
                        <span style={{ marginLeft: 8 }}>कोरिया</span>
                    </div>
                </fieldset>
            </div>


            <div className="form-group">
                <fieldset>
                    <label><strong>कोरोना सन्क्रमित सङग सम्पर्क भएको छ कि छैन ?</strong></label><br />
                    <label>
                        <div>
                            <RadioButton name="contact" value="M" onChange={(e) => { console.log(e.target.value) }}>छ</RadioButton>
                            <RadioButton name="contact" value="F" onChange={(e) => { console.log(e.target.value) }}>छैन</RadioButton>
                        </div>
                    </label>
                </fieldset>
            </div>


            <div className="form-group">
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
            </div>

            <div className="form-group">
                <fieldset>
                    <label><strong>हाल कहाँ हुनुहुनछ ?</strong></label><br />
                    <label>
                        <div>
                            <RadioButton name="place" value="M" onChange={(e) => { console.log(e.target.value) }}>Self Quarantine</RadioButton>
                            <RadioButton name="place" value="F" onChange={(e) => { console.log(e.target.value) }}>Isolation</RadioButton>
                        </div>
                    </label>
                </fieldset>
            </div>

            <button type="button" className="btn btn-primary">Submit</button>
        </div>
    )
}

export default UserRiskForm;