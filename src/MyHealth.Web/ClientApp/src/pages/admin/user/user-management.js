// Form.js

import React, { useState, Fragment, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminFlag,
  load
} from "../../../store/actions/userAction";
import ClientPagination from "../../../components/pagination/client-side-pagination";
import { getCurrentPaginatedItems } from "../../../utils/table-helper";
import UserTable from "./user-table";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const tableData = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(load());
  }, []);

  // pagination
  let currentDataItems = [];
  if (tableData.userInfo) {
    currentDataItems = getCurrentPaginatedItems(
      currentPage,
      itemsPerPage,
      tableData.userInfo
    );
  }

  const callback = data => {
    setCurrentPage(data);
  };
  // end pagination


  const updateAdminFlag = (param) => (e) => {
    e.preventDefault()
    dispatch(updateAdminFlag(param));
  }

  return (
    <div>
          <div className="row">
            <div className="col-md-8">
              <ClientPagination
                data={tableData.userInfo != null ? tableData.userInfo : []}
                itemsPerPage={itemsPerPage}
                activeClassName=""
                parentCallback={callback}
              >
                <UserTable
                  data={currentDataItems}
                  updateAdminFlag={updateAdminFlag}
                />
              </ClientPagination>
            </div>
          </div>
    </div>
  );
};

export default UserManagement;
