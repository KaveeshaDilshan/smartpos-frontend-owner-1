import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    minHeight: 110,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ShopArray({ id }) {
  const allShops = [
    { shopId: '4556', shop: { name: 'shop1' } },
    { shopId: '4557', shop: { name: 'shop2' } },
  ];
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(allShops);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.shopId !== chipToDelete.shopId)
    );
  };

  return (
    <>
      <Paper component="ul" className={classes.root}>
        {chipData.map((data) => {
          return (
            <li key={data.shopId}>
              <Chip
                icon={StorefrontIcon}
                label={data.shop.name}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
      <Button>Save</Button>
    </>
  );
}
