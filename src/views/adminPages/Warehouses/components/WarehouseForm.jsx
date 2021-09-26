import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Form } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOCATIONS } from '../../../../util/locations';
import { addWarehouse } from '../actions';

export default function WarehouseForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [town, setTown] = useState('Moratuwa');
  const [telephone, setTelephone] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(addWarehouse({ name, district, town, telephone }));
  };
  const locations = LOCATIONS;
  const districts = Object.keys(locations);
  const towns = Object.values(locations[district]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: 28,
        }}
      >
        <Button
          size="small"
          type="submit"
          onClick={handleClickOpen}
          style={{ color: '#FFF' }}
        >
          Add Warehouse
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW WAREHOUSE</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleSubmit}>
            <div className="pt-2 pb-2">
              <TextField
                onChange={(e) => setName(e.target.value)}
                label="NAME"
                defaultValue={name}
                required
                helperText={!name && 'Name is required'}
              />
            </div>
            <div className="pt-2 pb-2">
              <TextField
                onChange={(e) => setTelephone(e.target.value)}
                defaultValue={telephone}
                label="TELEPHONE"
                required
                onFocus
                helperText={!telephone && 'Telephone is required'}
              />
            </div>
            <div className="pt-2 pb-2">
              <InputLabel id="demo-simple-select-label">DISTRICT</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                label="DISTRICT"
                required
                onChange={(e) => setDistrict(e.target.value)}
              >
                {districts.map((d) => (
                  <MenuItem value={d}>{d}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="pt-2 pb-2">
              <InputLabel id="demo-simple-select-label 2l">TOWN</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                value={town}
                label="TOWN"
                required
                style={{ width: 200 }}
                onChange={(e) => setTown(e.target.value)}
              >
                {towns[0].map((t) => (
                  <MenuItem style={{ width: 100 }} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleClose}>
                Add Warehouse
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
