import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Tracking.module.css';
import ManagerLayout from '../../../ManagerLayout';
import {
  getOneSalesperson,
  getSalespersonShops,
} from '../redux/salespersonsActions';
import MapContainer from './MapContainer';

function SalespersonTracking() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );
  const assignedShops = useSelector(
    (state) => state.salespersonsReducer.oneSalespersonAssignedShops
  );
  useEffect(() => {
    dispatch(getSalespersonShops(id));
    dispatch(getOneSalesperson({ id, history }));
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getOneSalesperson({ id, history }));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <ManagerLayout>
        <div className={styles.tracking}>
          {salesperson && (
            <MapContainer
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAh8Mcle_XHWuQVfUQr-EjGL2p6SqvQK50&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              position={{
                lat: parseFloat(salesperson.latitude) + 0.0005,
                lng: parseFloat(salesperson.longitude),
              }}
              shops={assignedShops}
            />
          )}
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonTracking;
