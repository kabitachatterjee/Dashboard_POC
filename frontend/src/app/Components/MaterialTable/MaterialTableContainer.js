import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Checkbox, Paper} from '@material-ui/core';
import PaginationTable from "../../Components/MaterialTable/Pagination";
import EnhancedTableHead from "../../Components/MaterialTable/EnhancedTableHeader";
import EnhancedTableToolbar from "../../Components/MaterialTable/EnhancedTableToolbar";
import { stableSort, getSorting} from '../../Components/MaterialTable/TableUtilities';


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

class MaterialTableContainer extends React.Component {
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

  /**
   * Frontend handling of sort, uses row.id, right now.
   * @param {!Event} event
   * @param {number} property
   */
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({order, orderBy});
  };

  /**
   * Click all or de-clicks all.
   * @param {!Event} event
   */
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({selected: state.data.map(n => n.id)}));
      return;
    }
    this.setState({selected: []});
  };



  /**
   * Sets current viewable page.
   * @param {!Event} event
   * @param {number} page
   */
  handleChangePage = (event, page) => {
    this.setState({page});
  };

  /**
   * Changes the number of viewable rows per page.
   * @param {!Event} event
   */
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  /**
   * Checks if the particular row is currently selected.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, tableBodyRowFunction} = this.props;
    const rows = this.props.headerRows;
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
                    tableBodyRowFunction(n, isSelected, this.state.selected)
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

MaterialTableContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTableContainer);

