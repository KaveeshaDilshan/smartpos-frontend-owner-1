import React, { useState } from 'react';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

function SideBar() {
  const [select, setSelect] = useState('');
  const Component = ({ name, route, currentSelect, Icon }) => {
    return (
      <>
        <Link to={route}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
          <div
            onClick={() => setSelect(name)}
            role="button"
            className={styles.component}
            style={{ background: currentSelect !== select ? '' : '#4B76D1' }}
          >
            <div className="d-flex align-content-center ">
              <div>
                <Icon />
              </div>
              <div style={{ marginLeft: '10px' }}> {name}</div>
            </div>
          </div>
        </Link>
      </>
    );
  };
  return (
    <div className={styles.main}>
      {/*<Component name="Dashboard" route="dashboard" currentSelect="Dashboard" />*/}
      <Component
        name="Warehouse"
        route="warehouses"
        currentSelect="Warehouse"
        Icon={HomeWorkIcon}
      />
      <Component
        name="Manager"
        route="managers"
        currentSelect="Manager"
        Icon={PeopleIcon}
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

export default SideBar;
