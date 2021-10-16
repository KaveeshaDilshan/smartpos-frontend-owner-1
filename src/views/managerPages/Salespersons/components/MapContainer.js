import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import React, { useState } from 'react';

const MapContainer = withScriptjs(
  withGoogleMap((props) => {
    const [selected, setSelected] = useState(null);
    return (
      <GoogleMap
        options={{ disableDefaultUI: true }}
        defaultZoom={15}
        defaultCenter={{ lat: props.position.lat, lng: props.position.lng }}
      >
        {props.shops.map((shop) => (
          <Marker
            key={shop._id}
            position={{
              lat: parseFloat(shop.latitude),
              lng: parseFloat(shop.longitude),
            }}
            icon={{
              url: 'https://firebasestorage.googleapis.com/v0/b/smart-pos-9254b.appspot.com/o/images%2Ficons8-shop-24.png?alt=media&token=f63321d1-a16a-4e7e-90d1-faa0d9b08766',
              scaledSize: new window.google.maps.Size(18, 18),
            }}
            onClick={() => setSelected(shop)}
          >
            {selected && selected.name === shop.name ? (
              <InfoWindow
                position={{
                  lat: parseFloat(selected.latitude),
                  lng: parseFloat(selected.longitude),
                }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h6>{selected.name}</h6>
                  <div>
                    <p>{shop.email}</p>
                    <p>{shop.telephone}</p>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}

        <Marker
          position={{ lat: props.position.lat, lng: props.position.lng }}
        />
        {console.log(props.position.lat)}
      </GoogleMap>
    );
  })
);
export default MapContainer;
