import React from 'react';
import { Row } from 'reactstrap';
import { Divider } from '@material-ui/core';
import ManagerLayout from '../../../ManagerLayout';
import AssignShop from './AssignShop';
import DailyProducts from './DailyProducts';
import SalespersonDetails from './SalespersonDetails';

function OneSalesperson(props) {
  const { id } = props.match.params;
  return (
    <>
      <ManagerLayout>
        <div style={{ marginBottom: 20 }}>
          <Row>
            <SalespersonDetails id={id} />
          </Row>
          <br />
          <Divider />
          <Row className="mt-3">
            <AssignShop id={id} />
          </Row>
          <br />
          <Divider />
          <Row className="mt-3">
            <DailyProducts id={id} />
          </Row>
        </div>
      </ManagerLayout>
    </>
  );
}

export default OneSalesperson;
