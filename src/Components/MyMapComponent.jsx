import { useEffect, useRef } from "react";

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  }, [center, zoom]);

  return <div ref={ref} id="map" style={{height: '400px', width: '600px', margin: 'auto'}}/>;
}

export default MyMapComponent;
