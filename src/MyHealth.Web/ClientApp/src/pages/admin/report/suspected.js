import React, { useEffect, useState } from "react";
import LineChart from "../../../components/graphs/linechart";
import {
  getSuspectedData,
  loadDiseases,
} from "../../../store/actions/reportAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

const SuspectedReport = () => {
  const [diseaseData, setDiseaseData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [diseaseId, setDiseaseId] = useState("");

  const [dataState, setDataState] = useState(false);

  useEffect(() => {
    GetDiseaseData();
  }, []);

  const GetDiseaseData = async () => {
    let dataResult = await loadDiseases();
    let items = [];
    dataResult.forEach((element) => {
      items.push(
        <option key={element.id} value={element.id}>
          {element.name}
        </option>
      );
    });

    setDiseaseData(items);
    if (dataResult.length > 0) {
      setDiseaseId(dataResult[0].id);
      GetLineData(dataResult[0].id);
    }
  };

  const GetLineData = async (diseaseId) => {
    let curDiseaseId = diseaseId;
    let dateFrom = startDate;
    let dateTo = endDate;
    let dataResult = await getSuspectedData(curDiseaseId, dateFrom, dateTo);
    setLineData(dataResult);
    setDataState(!dataState);
  };

  const handleSearch = async (e) => {
    await GetLineData(diseaseId);
  };

  const onDropdownSelected = (e) => {
    setDiseaseId(e.target.value);
    GetLineData(e.target.value);
  };

  return (
    <div className="col-12">
      <div className="row col-12 no-gutters align-items-center">
        <header className="mb-4 col-4">
          <h4 className="card-title">Suspected Report</h4>
        </header>
        <div className="col-8 text-right">
          <div className="form-group d-flex flex-row align-items-center justify-content-end">
            <label className="mr-2">Select Disease</label>
            <select
              className="form-control col-4 align-self-end"
              onChange={onDropdownSelected}
            >
              {diseaseData}
            </select>
          </div>
        </div>
        <div className="col-12 search-wrap d-flex flex-row mb-3">
          <div className="col-4">
            <div className="form-group mb-0">
              <label className="mr-2">From</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                key="dateFrom"
                maxDate={endDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-0">
              <label className="mr-2">To</label>
              <DatePicker
                className="form-control"
                key={`dateTo`}
                todayButton="Today"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <span className="btn btn-primary" onClick={handleSearch}>
                Search
              </span>
            </div>
          </div>
        </div>
        {lineData && lineData.length > 0 && (
          <div className="col-12">
            <LineChart
              key={dataState}
              title="Line Chart"
              data={lineData}
              xtitle="Date"
              ytitle="Count"
            />
          </div>
        )}
        {lineData && lineData.length === 0 && (
          <div className="content-empty col-12">
            <span> No Data Found !!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuspectedReport;
