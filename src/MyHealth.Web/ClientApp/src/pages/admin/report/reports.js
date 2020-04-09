import React from "react";
import Suspected from './suspected'
const Reports = () => {
  return (
    <div className="col-md-12" style={{ marginTop: "15px" }}>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#suspected">
            Suspected
          </a>
        </li>
        {/* <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#symptoms">Symptoms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#infected-country">Infected Country</a>
                </li> */}
      </ul>
      <div id="myTabContent" className="tab-content">
        <div className="tab-pane fade active show" id="suspected">
          <div
            className="card border-secondary mb-3"
            style={{ marginTop: "10px" }}
          >
            <div className="card-body">
              <Suspected />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
