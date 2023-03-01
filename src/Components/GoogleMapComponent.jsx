import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  console.log(GoogleMap);
  return (
    <>
      <GoogleMap
        zoom={15}
        center={{ lat: 44, lng: -80 }}
        mapContainerStyle={{
          height: "400px",
          width: "600px",
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Marker position={{ lat: 44, lng: -80 }}></Marker>
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
