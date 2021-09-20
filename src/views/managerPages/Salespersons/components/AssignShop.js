import React from 'react';
import { Col, Row } from 'reactstrap';
import { Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShopArray from './ShopsArray';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: 0,
  },
}));

const AssignShop = () => {
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
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ALREADY ASSIGNED SHOPS
        </Typography>
        <Row className="mt-3">
          <div>
            <ShopArray />
          </div>
        </Row>
      </Col>
      <Col className="col-6">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ASSIGN NEW SHOPS
        </Typography>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <div>
              <Autocomplete
                multiple
                id="tags-standard"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Shops"
                    placeholder="Shops"
                  />
                )}
              />
            </div>
          </Row>
          <Row className="mt-3" style={{ textAlign: 'end' }}>
            <div>
              <Button variant="contained" size="small">
                SAVE
              </Button>
            </div>
          </Row>
        </Paper>
      </Col>
    </>
  );
};

export default AssignShop;
