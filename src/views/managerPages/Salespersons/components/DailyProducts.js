import { Col, Row, Table } from 'reactstrap';
import { Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  SaveIcon: {
    marginLeft: 10,
    fontSize: 30,
    '&:hover': {
      color: 'rgb(78, 90, 247)',
      cursor: 'pointer',
    },
  },
  paper: {
    padding: theme.spacing(1),
    margin: 0,
  },
}));

const DailyProducts = () => {
  const classes = useStyles();
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
  ];
  return (
    <>
      <Col className="col-6">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            DAILY PRODUCTS
          </Typography>
          2021/07/14
        </div>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Maari Bicuit</td>
                    <td>
                      {' '}
                      <div
                        style={{
                          marginRight: 10,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          type="number"
                          id="outlined-size-small"
                          defaultValue={50}
                          variant="outlined"
                          size="small"
                        />
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <SaveIcon className={classes.SaveIcon} />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h5>Remains Add to Warehouse:</h5>
              <Button variant="contained" size="small">
                Add
              </Button>
            </div>
          </Row>
        </Paper>
      </Col>
      <Col className="col-6">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ADD DAILY PRODUCTS
        </Typography>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <div>
              <Autocomplete
                id="tags-standard"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select a Product"
                    placeholder="Product"
                  />
                )}
              />
            </div>
          </Row>
          <Row className="mt-3" style={{ textAlign: 'end' }}>
            <div>
              <Button variant="contained" size="small">
                ADD
              </Button>
            </div>
          </Row>
        </Paper>
      </Col>
    </>
  );
};
export default DailyProducts;
