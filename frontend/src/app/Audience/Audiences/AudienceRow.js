import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Checkbox, Paper} from '@material-ui/core';
import PaginationTable from "../../Components/MaterialTable/Pagination";
import EnhancedTableHead from "../../Components/MaterialTable/EnhancedTableHeader";
import EnhancedTableToolbar from "../../Components/MaterialTable/EnhancedTableToolbar";
import {desc, stableSort, getSorting} from '../../Components/MaterialTable/TableUtilities';
import {Link} from "react-router-dom";

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'ID'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
  {id: 'type', numeric: true, disablePadding: false, label: 'Type'},
  {id: 'last_updated', numeric: true, disablePadding: false, label: 'Last Updated'},
  {id: 'ts_id', numeric: true, disablePadding: false, label: 'TSID'},
  {id: 'refresh', numeric: true, disablePadding: false, label: 'Refresh'},
];

const styles = theme => ({
  root: {
    width: '97%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class AudienceRow extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    this.setState({data: this.props.audiences});
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({order, orderBy});
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({selected: state.data.map(n => n.id)}));
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({selected: newSelected});
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              rows={rows}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      aria-checked={isSelected}
                      hover
                      key={n.id}
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      selected={isSelected}
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>
                      <TableCell>{n.id}</TableCell>
                      <TableCell>
                        <Link to='/'> {n.name} - {n.sub_name} </Link>
                    </TableCell>
                      <TableCell numeric>{n.type}</TableCell>
                      <TableCell numeric>{n.last_updated}</TableCell>
                      <TableCell numeric>{n.ts_id}</TableCell>
                      <TableCell numeric>{n.refresh} Days</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <PaginationTable
          count={data.length}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    );
  }
}

AudienceRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AudienceRow);

