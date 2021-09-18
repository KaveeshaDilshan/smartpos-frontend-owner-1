import { Typography } from '@material-ui/core';
import React from 'react';
import { Button, Table } from 'reactstrap';
import styles from './LeavesPage.module.css';
import ManagerLayout from '../../ManagerLayout';

function LeavesPage() {
  return (
    <>
      <ManagerLayout>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto@gmail.com</td>
                <td>2021/09/10</td>
                <td>2021/09/15</td>
                <td>
                  <Button className={styles.button} color="success" size="sm">
                    Approve
                  </Button>
                  <Button className={styles.button} color="danger" size="sm">
                    Reject
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton@gmail.com</td>
                <td>2021/09/10</td>
                <td>2021/09/15</td>
                <td>
                  <Button className={styles.button} color="success" size="sm">
                    Approve
                  </Button>
                  <Button className={styles.button} color="danger" size="sm">
                    Reject
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>theBird@gmail.com</td>
                <td>2021/09/10</td>
                <td>2021/09/15</td>
                <td>
                  <Button className={styles.button} color="success" size="sm">
                    Approve
                  </Button>
                  <Button className={styles.button} color="danger" size="sm">
                    Reject
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ManagerLayout>
    </>
  );
}

export default LeavesPage;
