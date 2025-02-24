import { Marker } from "react-map-gl/mapbox";

const MarkerComponent = ({
  classProps,
  longitude,
  latitude,
  Icon,
  handleClick,
  ...args
}) => {
  const { children } = args;

  return (
    <Marker
      className={classProps}
      longitude={longitude}
      latitude={latitude}
      onClick={handleClick}
    >
      <div>{children} </div>
      <img src={Icon} />
    </Marker>
  );
};

export default MarkerComponent;
