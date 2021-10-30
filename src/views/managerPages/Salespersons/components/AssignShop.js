import React from 'react';
import { Col, Row } from 'reactstrap';
import { Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  addShopsToSalesperson,
  getSalespersonShops,
  getWarehouseShops,
} from '../redux/salespersonsActions';

const useStyles = makeStyles((theme) => ({
  paper2: {
    padding: theme.spacing(1),
    margin: 0,
  },
  paper1: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(1),
    margin: 0,
    minHeight: 110,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const AssignShop = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );
  React.useEffect(() => {
    dispatch(getWarehouseShops(warehouseID));
    dispatch(getSalespersonShops(id));
  }, []);

  const warehouseShops = useSelector(
    (state) => state.salespersonsReducer.warehouseShops
  );

  const assignedShops = useSelector(
    (state) => state.salespersonsReducer.oneSalespersonAssignedShops
  );

  const [chipData, setChipData] = React.useState(assignedShops);
  const [selectedShop, setShopSelect] = React.useState({});

  React.useEffect(() => {
    setChipData(assignedShops);
  }, [assignedShops]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip._id !== chipToDelete._id)
    );
  };

  function findArrayElementById(array, _id) {
    return array.find((element) => {
      return element._id === _id;
    });
  }

  const handleClickAdd = () => {
    if (selectedShop._id) {
      if (!findArrayElementById(chipData, selectedShop._id)) {
        chipData.push(selectedShop);
        setChipData([...chipData]);
      }
    } else {
      toast.error('Select a Shop');
    }
  };
  const handleClickSave = () => {
    const shops = chipData.map((chip) => chip._id);
    dispatch(addShopsToSalesperson({ id, details: { shops } }));
  };
  return (
    <>
      <Col className="col-6">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ASSIGNED SHOPS
        </Typography>
        <Row className="mt-3">
          <div>
            <Paper component="ul" className={classes.paper1}>
              {chipData &&
                chipData.map((data) => {
                  return (
                    <li key={data._id}>
                      <Chip
                        icon={StorefrontIcon}
                        label={data.name}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })}
            </Paper>
          </div>
        </Row>
      </Col>
      <Col className="col-6">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ASSIGN NEW SHOPS
        </Typography>
        <Paper className={classes.paper2}>
          <Row className="mt-3">
            <div>
              <Autocomplete
                id="tags-standard"
                options={warehouseShops}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => setShopSelect({ ...value })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Shops"
                    placeholder="Shops"
                  />
                )}
              />
            </div>
          </Row>
          <Row className="mt-3" style={{ textAlign: 'end' }}>
            <div>
              <Button
                variant="contained"
                size="small"
                style={{ marginRight: 5 }}
                onClick={handleClickAdd}
              >
                ADD
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleClickSave}
              >
                Save
              </Button>
            </div>
          </Row>
        </Paper>
      </Col>
    </>
  );
};

export default AssignShop;
