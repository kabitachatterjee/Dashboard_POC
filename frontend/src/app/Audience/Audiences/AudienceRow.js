import React from 'react';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';
import MaterialTableContainer from "../../Components/MaterialTable/MaterialTableContainer";

const AudienceRow = (props) => {
  const {audiences, onClickGoToDetailPage, match} = props;

  /**
   * These are the header rows to our material table. 6 columns.
   * @type {*[]}
   */
  const rows = [
    {id: 'id', numeric: false, disablePadding: false, label: 'ID'},
    {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'type', numeric: true, disablePadding: false, label: 'Type'},
    {id: 'last_updated', numeric: true, disablePadding: false, label: 'Last Updated'},
    {id: 'ts_id', numeric: true, disablePadding: false, label: 'TSID'},
    {id: 'refresh', numeric: true, disablePadding: false, label: 'Refresh'},
  ];
  /**
   * This is the meat of our table, which will map our values into rows.
   * @param {!AudienceRow} n
   * @param {boolean} isSelected
   * @param selected
   * @returns {*}
   * @constructor
   */
  const TableRowCreator = (n, isSelected, selectionClick) => {
    return (
      <TableRow
        aria-checked={isSelected}
        hover
        key={n.id}
        onClick={event => selectionClick(event, n.id)}
        role="checkbox"
        selected={isSelected}
        tabIndex={-1}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected}/>
        </TableCell>
        <TableCell>{n.id}</TableCell>
        <TableCell>
          {onClickGoToDetailPage(match, n)}
        </TableCell>
        <TableCell numeric>{n.type}</TableCell>
        <TableCell numeric>{n.last_updated}</TableCell>
        <TableCell numeric>{n.ts_id}</TableCell>
        <TableCell numeric>{n.refresh} Days</TableCell>
      </TableRow>
    );
  };

  return (
    <MaterialTableContainer
      headerRows={rows}
      tableBodyRowFunction={TableRowCreator}
      audiences={audiences}
    />
  );
};

export default AudienceRow;

