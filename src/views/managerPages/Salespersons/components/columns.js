/* eslint-disable */
import React from 'react';
import { Button } from '@material-ui/core';

const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    width: '30',
  },
  {
    Header: 'Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Phone',
    accessor: 'telephone',
  },
  {
    Header: 'Action',
    Cell: ({ cell }) => (
      <div style={{ display: 'flex' }}>
        <Button
          href={`salespersons/tracking/${cell.row.values.id}`}
          variant="contained"
          style={{ padding: 5, marginRight: 10, fontSize: 10 }}
        >
          track
        </Button>
        <Button
          href={`salespersons/moredetails/${cell.row.values.id}`}
          variant="contained"
          style={{ padding: 5, fontSize: 10 }}
        >
          more
        </Button>
      </div>
    ),
    width: '110',
  },
];

export default COLUMNS;
