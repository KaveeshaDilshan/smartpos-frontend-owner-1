import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginBottom: 5,
  },
  media: {
    height: 140,
  },
});

export default function ProductCard({
  name,
  unitPrice,
  photo,
  quantity,
  sales,
}) {
  const classes = useStyles();
  return (
    <Card className={clsx('shadow', classes.root)} variant="outlined">
      <CardActionArea>
        <div className="d-flex align-items-center justify-content-lg-start">
          <div style={{ marginRight: '40px' }}>
            <img src={photo} alt="" height={100} width={100} />
          </div>
          <div>
            <Typography>Name - {name}</Typography>
            <Typography>Unit Price - {unitPrice}</Typography>
            <Typography>Quantity - {quantity}</Typography>
            <Typography>Sales - {sales}</Typography>
            <Typography>Cost - Rs. {sales * unitPrice}</Typography>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}
