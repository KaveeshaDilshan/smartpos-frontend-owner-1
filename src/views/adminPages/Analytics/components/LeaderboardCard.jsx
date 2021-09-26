import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import profileFallback from '../../../../components/images.png';

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

function LeaderboardCard({
  id,
  firstName,
  lastName,
  email,
  photo,
  warehouse,
  income,
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/admin/salespersons/analytics/${id}`);
  };
  const classes = useStyles();
  const name = `${firstName} ${lastName}`;
  return (
    <Card className={clsx('shadow', classes.root)} variant="outlined">
      <CardContent>
        <div className="d-flex align-items-center justify-content-start">
          <div>
            <Avatar
              sizes={100}
              alt="Remy Sharp"
              src={photo || profileFallback}
            />
          </div>
          <div variant="h5" component="h5">
            {name}
          </div>
        </div>
        <div style={{ height: '20px' }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {email}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          <span style={{ color: !warehouse && 'red' }}>
            Warehouse {warehouse ? warehouse.name : 'Not assigned yet'}
          </span>
        </Typography>
        <Typography>
          <span>{income}</span>
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
            Show Analytics Of Salesperson
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default LeaderboardCard;
