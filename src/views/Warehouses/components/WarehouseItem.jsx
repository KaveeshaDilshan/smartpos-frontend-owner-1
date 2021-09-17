import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

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

function WarehouseItem({ id, name, location, telephone, managerName }) {
  const history = useHistory();
  const classes = useStyles();
  const fullName = managerName
    ? `${managerName.firstName} ${managerName.lastName}`
    : 'No manager is assigned yet';
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h5">
          {name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {location}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {telephone}
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
          onClick={() => history.push(`/admin/warehouses/${id}`)}
        >
          Show Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default WarehouseItem;
