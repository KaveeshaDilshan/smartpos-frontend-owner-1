import React from 'react';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleIcon from '@material-ui/icons/People';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import styles from './sidebar.module.css';

function SideBar() {
  const history = useHistory();
  const Component = ({ name, route, currentSelect, Icon }) => {
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
            color: window.location.pathname.includes(currentSelect)
              ? '#FFF'
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
        name="Warehouses"
        route="/admin/warehouses"
        currentSelect="admin/warehouses"
        Icon={HomeWorkIcon}
      />
      <Component
        name="Managers"
        route="/admin/managers"
        currentSelect="admin/managers"
        Icon={PersonIcon}
      />
      <Component
        name="Salespersons"
        route="/admin/salespersons"
        currentSelect="admin/salespersons"
        Icon={PeopleIcon}
      />
      <Component
        name="Sales Analytics"
        route="/admin/analytics"
        currentSelect="admin/analytics"
        Icon={ShowChartIcon}
      />
    </div>
  );
}

export default SideBar;
