import {TablePagination} from "@material-ui/core";
import React from "react";

const PaginationTable = (props) => {
  const {rowsPerPage, count, page, onChangePage, onChangeRowsPerPage} = props;
  return (<TablePagination
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    backIconButtonProps={{
      'aria-label': 'Previous Page',
    }}
    nextIconButtonProps={{
      'aria-label': 'Next Page',
    }}
    onChangePage={onChangePage}
    onChangeRowsPerPage={onChangeRowsPerPage}
  />)
};

export default PaginationTable;
