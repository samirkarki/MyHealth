import React, { useEffect, useState } from "react";
var _ = require("lodash");

const ClientPagination = ({
  data,
  itemsPerPage,
  activeClassName,
  parentCallback,
  ...props
}) => {
  const handlePaginationClick = event => {
    parentCallback(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      // <li
      //     key={number}
      //     id={number}
      //     onClick={handlePaginationClick}
      // >
      //     {number}
      // </li>

      <li
        className="page-item"
        key={number}
        id={number}
        //onClick={handlePaginationClick}
      >
        <a
          id={number}
          href="#"
          className="page-link"
          onClick={handlePaginationClick}
        >
          {number}
        </a>
      </li>
    );
  });

  return (
    <div className={activeClassName}>
      {props.children}
      <nav aria-label="...">
        <ul className="pagination pagination-sm">{renderPageNumbers}</ul>
      </nav>
    </div>
  );
};

export default ClientPagination;
