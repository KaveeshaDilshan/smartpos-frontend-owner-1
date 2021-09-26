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
    minHeight: 170,
    '&:hover': {
      boxShadow: '0px 0px 5px 0px black',
      background: '#f8f7f7',
    },
  },
  title: {
    fontSize: 15,
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
      <CardContent
        style={{
          paddingLeft: 50,
          paddingRight: 200,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="d-flex align-items-center justify-content-start">
            <div>
              <Avatar
                style={{ height: 70, width: 70, marginRight: 80 }}
                sizes={100}
                alt="Remy Sharp"
                src={photo || profileFallback}
              />
            </div>
            <div>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                {name}
              </Typography>
            </div>
          </div>
          <div>
            <Typography
              style={{ height: '20px' }}
              className={classes.title}
              color="primary"
              gutterBottom
            >
              {email}
            </Typography>
            <Typography variant="body2" component="p">
              <span style={{ color: !warehouse && 'red' }}>
                Warehouse {warehouse ? warehouse.name : 'Not assigned yet'}
              </span>
            </Typography>
            <Typography>
              <span>Rs {income}</span>
            </Typography>
          </div>
        </div>
      </CardContent>
      {warehouse && (
        <CardActions
          style={{
            display: 'flex',
            marginLeft: 20,
          }}
        >
          <Button
            size="small"
            type="submit"
            className={classes.but}
            variant="contained"
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
