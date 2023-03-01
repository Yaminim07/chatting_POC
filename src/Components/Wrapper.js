import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "./MyMapComponent";

const render = (status) => {
  switch (status) {
    case Status.FAILURE:
      return <div>error</div>;
    case Status.SUCCESS:
      return <MyMapComponent center={{ lat: 44, lng: -80 }} zoom={15} />;
    default:
      return <div>loading...</div>;
  }
};
const MyApp = () => (
  <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} render={render} />
);

export default MyApp;
