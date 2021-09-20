import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import WarehouseForm from './WarehouseForm';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 65,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function AddWarehouse() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Col className="col-md-6 col-sm-12 col-lg-4">
        <div className={classes.root} variant="outlined">
          <WarehouseForm open={open} setOpen={setOpen} />
        </div>
      </Col>
    </>
  );
}

export default AddWarehouse;
