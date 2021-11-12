import React from 'react';
import { Col, Row } from 'reactstrap';
// eslint-disable-next-line import/no-cycle
import { Modal } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import SalespersonAnalytics from './SalespersonAnalytics';

export default function Compare({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      <Row>
        <Col className="col-6">
          <SalespersonAnalytics />
        </Col>
      </Row>
    </>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
