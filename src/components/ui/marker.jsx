import { Marker } from "react-map-gl/mapbox";

const MarkerComponent = ({ key, longitude, latitude, Icon, ...args }) => {
  const { children } = args;

  return (
    <Marker key={key} longitude={longitude} latitude={latitude}>
      <div>{children} </div>
      <img src={Icon} />
    </Marker>
  );
};

export default MarkerComponent;
