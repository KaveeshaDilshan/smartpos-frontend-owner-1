import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorefrontIcon from '@material-ui/icons/Storefront';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { useHistory } from 'react-router-dom';
import styles from './sidebar.module.css';

function ManagerSideBar() {
  const history = useHistory();
  const Component = ({ name, route, currentSelect, Icon }) => {
    console.log(route);
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
        <div
          onClick={() => {
            history.push(route);
          }}
          role="button"
          className={styles.component}
          style={{
            background: window.location.pathname.includes(currentSelect)
              ? '#4B76D1'
              : '',
          }}
        >
          <div className="d-flex align-content-center ">
            <div>
              <Icon />
            </div>
            <div style={{ marginLeft: '10px' }}> {name}</div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className={styles.main}>
      {/*<Component name="Dashboard" route="dashboard" currentSelect="Dashboard" />*/}
      <Component
        name="Salespersons"
        route="/manager/salespersons"
        currentSelect="manager/salespersons"
        Icon={PeopleIcon}
      />
      <Component
        name="Sales"
        route="/manager/salesDetails"
        currentSelect="manager/salesDetails"
        Icon={TrendingUpIcon}
      />
      <Component
        name="Warehouse"
        route="/manager/warehouse"
        currentSelect="manager/warehouse"
        Icon={StorefrontIcon}
      />
      <Component
        name="Products"
        route="/manager/products"
        currentSelect="manager/products"
        Icon={LocalGroceryStoreIcon}
      />
      <Component
        name="Category"
        route="/manager/category"
        currentSelect="manager/category"
        Icon={BorderAllIcon}
      />
      <Component
        name="Leaves"
        route="/manager/leaves"
        currentSelect="manager/leaves"
        Icon={EventNoteIcon}
      />
      {/*<Component*/}
      {/*  name="Salesperson"*/}
      {/*  route="salesperson"*/}
      {/*  currentSelect="Salesperson"*/}
      {/*/>*/}
      {/*<Component name="Sales" route="sales" currentSelect="Sales" />*/}
    </div>
  );
}

export default ManagerSideBar;
