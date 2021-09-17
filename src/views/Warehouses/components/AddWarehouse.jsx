import React from 'react';
import { Col } from 'reactstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '20px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function AddWarehouse() {
  const classes = useStyles();
  return (
    <>
      <Col className="col-md-6 col-sm-12 col-lg-4">
        <Card className={classes.root} variant="outlined">
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <AddCircleIcon
              style={{ transform: 'scale(3)', marginTop: '20px' }}
            />
            <CardActions style={{ marginTop: '20px' }}>
              <Button size="small" type="submit">
                Add Warehouse
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Col>
    </>
  );
}

export default AddWarehouse;
