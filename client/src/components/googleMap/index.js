import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map({ marker, setMarker }) {
  const [center, setCenter] = React.useState({
    lat: 32.060662,
    lng: 36.093064,
  });

  const containerStyle = {
    width: "550px",
    height: "400px",
  };

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={(e) => {
          setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          setMarker(() => [
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {marker.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map;
