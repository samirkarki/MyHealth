// Form.js

import React, { useState, Fragment, useEffect, useCallback } from "react";
import DiseaseInputs from "../../../components/form-inputs/DiseaseInputs";
import CustomInput from "../../../components/form-inputs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDisease,
  load,
  updateItem,
  remove
} from "../../../store/actions/diseaseActions";
import ClientPagination from "../../../components/pagination/client-side-pagination";
import { getCurrentPaginatedItems } from "../../../utils/table-helper";
import DiseaseTable from "./disease-crud-table";
import EditDiseaseForm from "./disease-edit-form";
import DiseaseSymptomMap from "./disease-symptom-map";

const DiseaseForm = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [editing, setEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState();

  const tableData = useSelector(state => state.diseaseReducer);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
    dispatch(load());
  }, []);

  // add form logic
  const blankDisease = { name: "" };
  const [diseaseState, setDiseaseState] = useState([{ ...blankDisease }]);

  const addDisease = () => {
    setDiseaseState([...diseaseState, { ...blankDisease }]);
  };

  const handleDiseaseChange = e => {
    const updatedDisease = [...diseaseState];
    updatedDisease[e.target.dataset.idx][e.target.className.split(" ")[0]] =
      e.target.value;
    setDiseaseState(updatedDisease);
  };

  const clearForm = () => {
    setDiseaseState([{ ...blankDisease }]);
  };

  // add form ends

  // CRUD portion
  // INSERT

  const submitForm = e => {
    e.preventDefault();
    let diseaseArr = JSON.stringify(diseaseState);
    dispatch(saveDisease(diseaseArr));
    clearForm();
  };

  // DELETE
  const deleteDisease = id => {
    setEditing(false);
    if (window.confirm("Are you sure to delete ?")) {
      dispatch(remove(id));
    }
  };

  const update = item => {
    setEditing(false);
    dispatch(updateItem(item));
  };

  const editRow = item => {
    setEditing(true);
    setCurrentEditItem(item);
  };
  // end CRUD

  const loadSymptoms = item => {
    setShowSymptoms(true);
    setCurrentEditItem(item);
  };

  const backToList = () => {
    setShowSymptoms(false);
  };

  // pagination
  let currentDataItems = [];
  if (tableData.diseaseInfo) {
    currentDataItems = getCurrentPaginatedItems(
      currentPage,
      itemsPerPage,
      tableData.diseaseInfo
    );
  }

  const callback = data => {
    setCurrentPage(data);
  };
  // end pagination


  const selectDiseaseFunc = (param)=>(e) => {
    e.preventDefault()
    const item = param
    item.selected = !item.selected
    dispatch(updateItem(item));
  }

  return (
    <div>
      {showSymptoms ? (
        <DiseaseSymptomMap
          currentDisease={currentEditItem}
          backToList={backToList}
        />
      ) : (
        <div className="row">
          <div className="col-md-4">
            {editing ? (
              <Fragment>
                <h3>Edit Disease</h3>
                <div className="clearfix"></div>

                <EditDiseaseForm
                  editing={editing}
                  setEditing={setEditing}
                  currentDisease={currentEditItem}
                  update={update}
                />
              </Fragment>
            ) : (
              <form onSubmit={submitForm} style={{ marginTop: "5px" }}>
                <h3>Add Disease</h3>

                <input
                  type="button"
                  className="btn btn-primary btn-sm float-right"
                  value="Add New Disease"
                  onClick={addDisease}
                />

                <div className="clearfix"></div>

                <Fragment>
                  {diseaseState.map((val, idx) => (
                    <CustomInput
                      key={`disease-${idx}`}
                      idx={idx}
                      inputState={diseaseState}
                      handleChange={handleDiseaseChange}
                      required={true}
                      title={`disease #${idx + 1}`}
                      value={val.name}
                    />
                  ))}
                </Fragment>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </form>
            )}
          </div>
          <div className="col-md-8">
            <ClientPagination
              data={tableData.diseaseInfo != null ? tableData.diseaseInfo : []}
              itemsPerPage={itemsPerPage}
              activeClassName=""
              parentCallback={callback}
            >
              <DiseaseTable
                data={currentDataItems}
                editRow={editRow}
                delete={deleteDisease}
                showSymptoms={loadSymptoms}
                selectDiseaseFn={selectDiseaseFunc}
                checkedItems={checkedItems}
              />
            </ClientPagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseForm;
