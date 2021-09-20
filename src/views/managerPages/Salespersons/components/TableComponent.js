import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const columns = [
  { id: 'index', label: '#', maxWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'action',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableComponent({ data }) {
  const rows = data.map((d, i) => ({
    ...d,
    name: `${d.firstName} ${d.lastName}`,
    index: i + 1,
  }));
  const classes = useStyles();
  const history = useHistory();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  //
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    background: '#defcf2',
                    fontSize: 17,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <>
                              <Button
                                style={{
                                  marginRight: 5,
                                }}
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  history.push(
                                    `/manager/salespersons/tracking/${row._id}`
                                  )
                                }
                              >
                                Track
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  history.push(
                                    `/manager/salespersons/moredetails/${row._id}`
                                  )
                                }
                              >
                                More
                              </Button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<TablePagination*/}
      {/*  // rowsPerPageOptions={[10, 25, 100]}*/}
      {/*  rowsPerPageOptions={[5]}*/}
      {/*  component="div"*/}
      {/*  count={rows.length}*/}
      {/*  rowsPerPage={rowsPerPage}*/}
      {/*  page={page}*/}
      {/*  onPageChange={handleChangePage}*/}
      {/*  onRowsPerPageChange={handleChangeRowsPerPage}*/}
      {/*/>*/}
      <div
        style={{
          width: '100%',
          textAlign: 'right',
          paddingRight: 40,
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <ArrowBackIosIcon />
        <ArrowForwardIosIcon />
      </div>
    </Paper>
  );
}
