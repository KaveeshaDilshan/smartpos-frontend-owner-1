import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from 'reactstrap';
// eslint-disable-next-line import/no-cycle
import { Modal } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import SalespersonAnalytics from './SalespersonAnalytics';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#FFF',
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Compare({ open, setOpen }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

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
