import { Col, Row } from 'reactstrap';
import { Paper, Typography } from '@material-ui/core';
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
    dispatch(getOneSalesperson({ id, history }));
  }, []);

  return (
    <>
      <Col className="col-6">
        <Row className="mt-3 mb-2">
          <div>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              SALESPERSON DETAILS
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => history.push(`/manager/salespersons/edit/${id}`)}
            >
              Edit
            </Button>
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
                  {salesperson ? salesperson.firstName : 'first name'}
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
                  {salesperson ? salesperson.lastName : 'last name'}
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
          <Row className="mt-5">
            <Col className="col-6">
              <div>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {salesperson ? salesperson.telephone : 'telephone'}
                </h4>
                <h4
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  Salesperson telephone
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
                  {salesperson ? salesperson.email : 'email'}
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
        </Paper>
      </Col>
    </>
  );
};

export default SalespersonDetails;
