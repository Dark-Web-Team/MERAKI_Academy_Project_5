import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function Map({lat,lng}) {
    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const position = {
        lat: lat,
        lng: lng
      };
      
      const onLoad = marker => {
          console.log('marker: ', marker)
        }
  return (
    <LoadScript
    googleMapsApiKey="AIzaSyCKGYO8byfTrwrbLGw7zy8HdrQFh1SYPKo"
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={15}
    >
      <Marker  onLoad={onLoad} position={position}   />

      </GoogleMap>
    </LoadScript>
  )
}

export default Map