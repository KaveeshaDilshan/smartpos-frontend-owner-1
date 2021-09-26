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
    minHeight: 220,
    position: 'relative',
    borderRadius: 10,
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

function ManagerItem({ firstName, lastName, email, photo, warehouse }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/admin/warehouses/${warehouse._id}`);
  };
  const classes = useStyles();
  const name = `${firstName} ${lastName}`;
  return (
    <Card className={clsx('shadow', classes.root)} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h5">
          {name}
        </Typography>
        <div style={{ height: '20px' }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {email}
          </Typography>
        </div>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ height: '20px' }}
        >
          {photo}
        </Typography>
        <Typography variant="body2" component="p">
          <span style={{ color: !warehouse && 'red' }}>
            Warehouse {warehouse ? warehouse.name : 'Not assigned yet'}
          </span>
        </Typography>
      </CardContent>
      {warehouse && (
        <CardActions>
          <Button
            size="small"
            type="submit"
            className={classes.but}
            onClick={handleClick}
          >
            Show Details Of Warehouse
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ManagerItem;
