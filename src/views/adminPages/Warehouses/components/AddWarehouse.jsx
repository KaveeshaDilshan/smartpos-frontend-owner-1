import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import WarehouseForm from './WarehouseForm';

function AddWarehouse() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Col className="col-md-6 col-sm-12 col-lg-4 d-flex align-items-center justify-content-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
        >
          <WarehouseForm open={open} setOpen={setOpen} />
        </Button>
      </Col>
    </>
  );
}

export default AddWarehouse;
