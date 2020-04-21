import React, { Fragment } from 'react';
import UserRiskForm from '../../components/risk-form/user-risk-form';
import Form from '../../components/Form'

const CovidTest = () => {
    return (
        <Fragment>
        <div className="col-md-12" style={{ marginTop: '10px' }}>
            <div className="alert alert-dismissible alert-info">
                <h4 className="alert-heading">नमस्कार !!!</h4>
                <p className="mb-0">
                    यो एप्लिकेसन बिश्व स्वास्थ्य संगठन तथा नेपाल सरकार स्वास्थ्य तथा जनसंख्या मन्त्रलायद्वारा 
                    जारी गरेको दिशानिर्देशका आधार तथा  डाक्टर तथा सम्बन्धित विज्ञहरु संगको परामर्समा तयार 
                    पारिएको हो र लक्षणका आधारमा कोरोना अथवा फ्लु अथवा रुगा खोकी के हो भनि घरमै बसेर 
                    प्रारम्भिक चरणको निर्क्योल गर्न सहयोग होस् भन्ने उद्देश्यले नेपाल इगभर्नेन्स सोसाइटीको 
                    अग्रसरतामा निर्माण गरिएको जानकारी गराउदछौ| यस एप्लिकेसनमा दिनु भएको सम्पूर्ण 
                    विवरणहरु पूर्ण रुपमा सुरक्षित तथा गोप्य हुने बाचा गर्दछौँ| 
                </p>
                <p>
                <a href="http://negos.org/">Nepal e-Governance Society</a>
                </p>
            </div>
            <UserRiskForm />
        </div>
    </Fragment>
    )
}

export default CovidTest;