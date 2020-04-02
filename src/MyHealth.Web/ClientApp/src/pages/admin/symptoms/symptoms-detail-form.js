import React, { useEffect, useState, Fragment } from "react";

import {
  getSymptomsDetail,
  deleteSymptomDetails
} from "../../../store/actions/symptomsAction";
import SymptomsDetailAdd from "./symptoms-detail-add";
import ClientPagination from "../../../components/pagination/client-side-pagination";
import { getCurrentPaginatedItems } from "../../../utils/table-helper";

const SymptomsDetailForm = props => {
  const { currentSymptoms, setDetails } = props;
  const [detailList, setDetailList] = useState([]);
  const [initAdd, setInitAdd] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentDetail, setcurrentDetail] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    let data = await getSymptomsDetail(currentSymptoms.id);
    await setDetailList(data);

    if (data.length === 0) {
      setInitAdd(true);
    }
  }

  const handleAddClick = () => {
    setInitAdd(true);
  };

  const backToList = () => {
    setDetails(false);
  };

  let currentDataItems = [];
  if (detailList) {
    currentDataItems = getCurrentPaginatedItems(
      currentPage,
      itemsPerPage,
      detailList
    );
  }

  const callback = data => {
    setCurrentPage(data);
  };

  // DELETE
  const deleteSymptomDetail = id => {
    if (window.confirm("Are you sure to delete ?")) {
      deleteDetail(id);
    }
  };

  const deleteDetail = async id => {
    let data = await deleteSymptomDetails(id);
    if (data) {
      loadData();
    }
  };

  const editSymbolDetails = detail => {
    setcurrentDetail(detail);
    setInitAdd(true);
  };

  return (
    <div>
      {initAdd ? (
        <Fragment>
          <SymptomsDetailAdd
            currentSymptoms={currentSymptoms}
            setInitAdd={setInitAdd}
            loadData={loadData}
            currentDetail={currentDetail}
            setcurrentDetail={setcurrentDetail}
          />
        </Fragment>
      ) : (
        <div className="row no-gutters">
          <div className="row col-12 no-gutters align-items-center">
            <div className="col-9">
              <span className="font-weight-bold">Symptom Name:</span>{" "}
              {currentSymptoms.name}
            </div>
            <div className="col-3 text-right">
              <span
                className="btn btn-secondary mr-lg-3  btn-sm"
                onClick={backToList}
              >
                Back to List
              </span>
              <span
                className="btn btn-primary  btn-sm"
                onClick={handleAddClick}
              >
                + Add
              </span>
            </div>
          </div>
          <span className="font-weight-bold mt-lg-5">Symptom Detail List</span>

          <ClientPagination
            data={detailList != null ? detailList : []}
            itemsPerPage={itemsPerPage}
            activeClassName="col-12"
            parentCallback={callback}
          >
            <table className="table table-striped mt-lg-1">
              <thead>
                <tr className="row col-12">
                  <th className="col-1">#</th>
                  <th className="col-4">Description</th>
                  <th className="col-4">Remarks</th>
                  <th className="col-3 ">
                    <span className="row">Action</span>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentDataItems.length > 0 ? (
                  currentDataItems.map((detail, index) => {
                    return (
                      <tr className="row col-12">
                        <td className="col-1">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="col-4">{detail.description}</td>
                        <td className="col-4">{detail.remarks}</td>
                        <td className="col-3 ">
                          <div className="row no-gutters float-left">
                            <span
                              className="btn btn-sm btn-secondary"
                              onClick={editSymbolDetails.bind(this, detail)}
                            >
                              Edit
                            </span>
                            <span
                              className="btn btn-sm btn-primary ml-lg-2"
                              onClick={deleteSymptomDetail.bind(
                                this,
                                detail.id
                              )}
                            >
                              Delete
                            </span>
                          </div>
                          <span className="row"></span>{" "}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="row col-12">
                    <td colSpan="3">
                      <div className="alert alert-secondary border-0">
                        No symptoms found!!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ClientPagination>
        </div>
      )}
    </div>
  );
}; 

export default SymptomsDetailForm;
