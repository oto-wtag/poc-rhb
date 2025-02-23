import { Marker } from "react-map-gl/mapbox";

const MarkerComponent = ({ longitude, latitude, Icon, ...args }) => {
  const { children } = args;

  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div>{children} </div>
      <img src={Icon} />
    </Marker>
  );
};

export default MarkerComponent;
