import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import styles from './LeavesPage.module.css';
import ManagerLayout from '../../ManagerLayout';
import { getLeaves, updateLeaves } from './redux/leavesActions';
import LeaveDetailsBox from './components/LeaveDetailsBox';

const useStyles = makeStyles({
  eyeIcon: {
    color: 'blue',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
      borderRadius: 5,
      cursor: 'pointer',
    },
  },
});

function LeavesPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [clickView, setClickView] = useState(false);
  const [description, setescription] = useState('');
  const [search, setSearch] = useState('pending');
  const allLeaves = useSelector((state) => state.leavesReducer.allLeaves);
  const loading = useSelector((state) => state.leavesReducer.loading);
  React.useEffect(() => {
    dispatch(getLeaves(search));
  }, [search]);

  const handleClickApprove = (leaveId) => {
    dispatch(
      updateLeaves({
        id: leaveId,
        details: {
          approved: 'approved',
        },
      })
    );
    dispatch(getLeaves(search));
  };

  const handleClickDisapprove = (leaveId) => {
    dispatch(
      updateLeaves({
        id: leaveId,
        details: {
          approved: 'reject',
        },
      })
    );
    dispatch(getLeaves(search));
  };
  const showReason = (reason) => {
    setescription(reason);
    setClickView(true);
  };

  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
        <div className={styles.leavespage}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Leave Requests
          </Typography>
          <br />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            {!loading && (
              <tbody>
                {allLeaves &&
                  allLeaves.map((leave, index) => (
                    <tr key={leave._id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {leave.userId.firstName} {leave.userId.lastName}
                      </td>
                      <td>{leave.userId.email}</td>
                      <td>
                        <Moment format="YYYY/MM/DD">{leave.from}</Moment>
                      </td>
                      <td>
                        <Moment format="YYYY/MM/DD">{leave.to}</Moment>
                      </td>
                      <td>
                        <VisibilityIcon
                          className={classes.eyeIcon}
                          onClick={() => showReason(leave.description)}
                        />
                      </td>
                      <td>
                        {leave.approved === 'pending' ? (
                          <>
                            <Button
                              className={styles.button}
                              color="success"
                              size="sm"
                              onClick={() => handleClickApprove(leave._id)}
                            >
                              Approve
                            </Button>
                            <Button
                              className={styles.button}
                              color="danger"
                              size="sm"
                              onClick={() => handleClickDisapprove(leave._id)}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <div>{leave.approved}</div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </Table>
          {loading && (
            <>
              <div style={{ textAlign: 'center', marginTop: 50 }}>
                <CircularProgress style={{ color: 'red' }} />
              </div>
            </>
          )}
          <LeaveDetailsBox
            open={clickView}
            handleClose={setClickView}
            description={description}
          />
        </div>
      </ManagerLayout>
    </>
  );
}

export default LeavesPage;
