import { Col, Row } from 'reactstrap';
import { Avatar, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneSalesperson } from '../redux/salespersonsActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: 0,
  },
}));

const SalespersonDetails = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );

  useEffect(() => {
    dispatch(getOneSalesperson(id));
  }, []);

  return (
    <>
      <Col className="col-6">
        <Row className="mt-3 mb-2">
          <div>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              SALESPERSON DETAILS
            </Typography>
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  size="small"*/}
            {/*  onClick={() => history.push(`/manager/salespersons/edit/${id}`)}*/}
            {/*>*/}
            {/*  Edit*/}
            {/*</Button>*/}
          </div>
        </Row>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <Col className="col-6">
              {/*<div>*/}
              {/*  <Avatar />*/}
              {/*</div>*/}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="col-6">
              <div>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {salesperson._id}
                </h4>
                <h4
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  salesperson ID
                </h4>
              </div>
            </Col>
            <Col className="col-6">
              <div>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {salesperson.email}
                </h4>
                <h4
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  Salesperson Email
                </h4>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="col-6">
              <div>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {salesperson.firstName}
                </h4>
                <h4
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  First Name
                </h4>
              </div>
            </Col>
            <Col className="col-6">
              <div>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {salesperson.lastName}
                </h4>
                <h4
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  Last Name
                </h4>
              </div>
            </Col>
          </Row>
        </Paper>
      </Col>
    </>
  );
};

export default SalespersonDetails;
