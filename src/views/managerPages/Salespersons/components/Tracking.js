import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Tracking.module.css';
import ManagerLayout from '../../../ManagerLayout';
import {
  getOneSalesperson,
  getSalespersonShops,
} from '../redux/salespersonsActions';
import MapContainer from './MapContainer';

function SalespersonTracking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );
  const assignedShops = useSelector(
    (state) => state.salespersonsReducer.oneSalespersonAssignedShops
  );
  useEffect(() => {
    dispatch(getOneSalesperson(id));
    dispatch(getSalespersonShops(id));
  }, []);
  console.log(assignedShops);
  return (
    <>
      <ManagerLayout>
        <div className={styles.tracking}>
          {/* SalespersonTrackingPage {id} */}
          <MapContainer
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAh8Mcle_XHWuQVfUQr-EjGL2p6SqvQK50&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            position={{ lat: 6.922 + 0.001, lng: 79.862 }}
            shops={assignedShops}
          />
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonTracking;
