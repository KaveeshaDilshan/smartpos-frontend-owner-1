import { Avatar, Dialog, Grid, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ManagerProfile.module.css';
import warehouseImage from '../../../adminPages/Warehouses/components/Capture.PNG';

const Transition = React.forwardRef(function Transition(props, ref) {
  console.log(props);
  console.log(ref);
  return <Slide direction="right" ref={ref} {...props} />;
});

function ManagerProfile({ open, handleClose }) {
  const warehouse = useSelector((state) => state.dashboardReducer.warehouse);
  if (!warehouse) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      PaperProps={{
        style: {
          minWidth: 650,
          padding: 0,
          minHeight: 300,
        },
      }}
      TransitionComponent={Transition}
    >
      <Grid container>
        <Grid item xs={5} className={styles.leftPart}>
          <div className={styles.managerName__box}>{`${
            warehouse.managerId && warehouse.managerId.firstName
          } ${warehouse.managerId && warehouse.managerId.lastName}`}</div>
          <div>Manager</div>
          <div className={styles.leftPart__bottom}>
            <div className={styles.leftPart__bottom__row}>
              <PhoneIcon className={styles.leftPart__icon} />
              {warehouse.managerId && warehouse.managerId.telephone}
            </div>
            <div className={styles.leftPart__bottom__row}>
              <EmailOutlinedIcon className={styles.leftPart__icon} />
              {warehouse.managerId && warehouse.managerId.email}
            </div>
          </div>
        </Grid>
        <Grid item xs={7} className={styles.rightPart}>
          <div>
            <Typography
              style={{
                borderBottom: '3px solid #5BC67AD9',
                width: 'fit-content',
              }}
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              {warehouse.name && warehouse.name}
            </Typography>
            <div style={{ display: 'flex' }}>
              <div className={styles.avatar__box}>
                <Avatar
                  className={styles.avatar}
                  alt="kaveesha dilshan"
                  src={warehouseImage}
                />
              </div>
              <div style={{ marginLeft: 20, marginTop: 40 }}>
                <h6>
                  <PhoneIcon className={styles.leftPart__icon} />
                  {warehouse.telephone && warehouse.telephone}
                </h6>
                <h6>District - {warehouse.district && warehouse.district}</h6>
                <h6>Town - {warehouse.town && warehouse.town}</h6>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ManagerProfile;
