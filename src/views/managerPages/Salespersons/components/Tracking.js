import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Tracking.module.css';
import ManagerLayout from '../../../ManagerLayout';
import { getOneSalesperson } from '../redux/salespersonsActions';

const MapContainer = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: props.position.lat, lng: props.position.lng }}
    >
      {props.marker}
    </GoogleMap>
  ))
);

function SalespersonTracking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );
  useEffect(() => {
    dispatch(getOneSalesperson(id));
  }, []);
  console.log(salesperson);
  return (
    <>
      <ManagerLayout>
        <div className={styles.tracking}>
          {/* SalespersonTrackingPage {id} */}
          <MapContainer
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4EzeBpTd5RQrJucf0CbMPr15ysmsmvy0&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            position={{ lat: 6.2977166654563534, lng: 80.43254201534381 }}
            marker={
              <Marker
                position={{ lat: 6.2977166654563534, lng: 80.43254201534381 }}
              />
            }
          />
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonTracking;
