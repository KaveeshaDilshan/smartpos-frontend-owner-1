import React from 'react';
// import { useParams } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import styles from './Tracking.module.css';
import ManagerLayout from '../../ManagerLayout';

const MapContainer = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.marker}
    </GoogleMap>
  ))
);

function SalespersonTracking() {
  // const { id } = useParams();
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
