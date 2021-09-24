import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

//=> 'foo bar baz'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '20px',
    minHeight: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  but: {
    marginBottom: 0,
  },
});

function WarehouseItem({ id, name, district, telephone, managerName }) {
  const history = useHistory();
  const classes = useStyles();
  const fullName = managerName
    ? `${managerName.firstName} ${managerName.lastName}`
    : 'No manager is assigned yet';
  return (
    <Card className={clsx('shadow', classes.root)} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h5">
          Warehouse Name - {name}
        </Typography>
        <div style={{ height: '20px' }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            District - {district}
          </Typography>
        </div>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ height: '20px' }}
        >
          Telephone - {telephone}
        </Typography>
        <Typography variant="body2" component="p">
          Manager -{' '}
          <span style={{ color: !managerName && 'red' }}>{fullName}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          type="submit"
          className={classes.but}
          onClick={() => history.push(`/admin/warehouses/${id}`)}
        >
          Show Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default WarehouseItem;
