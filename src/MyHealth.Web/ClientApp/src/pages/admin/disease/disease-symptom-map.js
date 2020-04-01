import React, { useEffect } from "react";

import { getdiseasesymptoms } from "../../../store/actions/diseaseActions";
import { useDispatch } from "react-redux";

const DiseaseSymptomMap = props => {
  const { currentDisease } = props;
  const dispatch = useDispatch();
  let symptomsList = [];

  useEffect(() => {
    dispatch(getdiseasesymptoms(currentDisease.id));
  }, []);

  return (
    <div className="row no-gutters">
      <div className="row col-12 no-gutters align-items-center">
        <div className="col-9">
          <span className="font-weight-bold">Disease:</span>{" "}
          {currentDisease.name}
        </div>
        <div className="col-3 text-right">
          <span className="btn btn-info">+ Add</span>
        </div>
      </div>

      <table class="table table-striped mt-lg-3">
        <thead>
          <tr>
            <th scope="col-1">#</th>
            <th scope="col-8">Title</th>
            <th scope="col-3 ">
              <span className="row">Action</span>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {symptomsList.length > 0 ? (
            <span className="comming-soon font-weight-bold">
              --- Coming soon ---
            </span>
          ) : (
            <div class="alert alert-secondary border-0">
              No symptoms found!!
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiseaseSymptomMap;
