import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  card: {
    boxSizing: 'border-box',
    width: '100%',
    marginBottom: 20,
    padding: 20,
    background: '#ffff',
    borderRadius: 5,
    boxShadow: '0px 0px 5px gray',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 5px 0px black',

      background: '#f8f7f7',
    },
  },
  SaveIcon: {
    marginLeft: 10,
    fontSize: 30,
    '&:hover': {
      color: 'rgb(78, 90, 247)',
    },
  },
  media: {
    height: 75,
    width: 75,
    display: 'inline-block',
  },
}));

function WarehouseItem({ poto, productName, unitPrice, count }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div style={{ display: 'flex' }}>
        <div>
          <CardMedia
            component="img"
            alt="Product Image"
            src={poto}
            title="Product Image"
            className={classes.media}
          />
        </div>
        <div
          style={{
            marginLeft: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 450 }}>{productName}</div>

          <div style={{ fontSize: 20, fontWeight: 450 }}>Rs {unitPrice}</div>
          <div
            style={{
              marginRight: 10,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              type="number"
              id="outlined-size-small"
              defaultValue={count}
              variant="outlined"
              size="small"
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SaveIcon className={classes.SaveIcon} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WarehouseItem;
