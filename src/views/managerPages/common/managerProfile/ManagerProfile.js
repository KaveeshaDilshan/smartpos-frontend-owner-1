import { Avatar, Dialog, Grid } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import React from 'react';
import styles from './ManagerProfile.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function ManagerProfile({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      PaperProps={{
        style: {
          minWidth: 650,
          padding: 0,
          minHeight: 500,
        },
      }}
      TransitionComponent={Transition}
    >
      <Grid container>
        <Grid item xs={5} className={styles.leftpart}>
          <div className={styles.avatar__box}>
            <Avatar
              className={styles.avatar}
              alt="kamal silva"
              src="https://avatars1.githubusercontent.com/u/35970677?s=60&v=4"
            />
          </div>
          <div className={styles.managername__box}>Manager name</div>
          <div>Manager warehouse name</div>
          <div className={styles.leftpart__bottom}>
            <div className={styles.leftpart__bottom__row}>
              <PhoneIcon className={styles.leftpart__icon} />
              +94123456789
            </div>
            <div className={styles.leftpart__bottom__row}>
              <EmailOutlinedIcon className={styles.leftpart__icon} />
              kamal@gmail.com
            </div>
          </div>
        </Grid>
        <Grid item xs={7} className={styles.rightpart}>
          <div className={styles.otherdetails}>
            <h4 className={styles.otherdetails__title}>Address</h4>
            <div className={styles.otherdetails__description}>
              107/5, Bandaragaswatta, Hunupitita Road, Biyagama
            </div>
          </div>
          <div className={styles.otherdetails}>
            <h4 className={styles.otherdetails__title}>Address</h4>
            <div className={styles.otherdetails__description}>
              107/5, Bandaragaswatta, Hunupitita Road, Biyagama
            </div>
          </div>
          <div className={styles.otherdetails}>
            <h4 className={styles.otherdetails__title}>Address</h4>
            <div className={styles.otherdetails__description}>
              107/5, Bandaragaswatta, Hunupitita Road, Biyagama
            </div>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ManagerProfile;
