import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function ShowMap({ lat, lng, width = "400px", height = "400px" }) {
  const containerStyle = {
    width: width,
    height: height,
  };

  const position = {
    lat: lat,
    lng: lng,
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
        <Marker onLoad={onLoad} position={position} />
      </GoogleMap>
    </LoadScript>
  );
}

export default ShowMap;
