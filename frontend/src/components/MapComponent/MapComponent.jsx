import { useSelector } from "react-redux";
import axios from "axios";
import { useQueries } from "react-query";
import MapWrapper from "./MapWrapper.jsx";
import { act } from "react-dom/test-utils";
import Loading from "../UI/Loading/Loading.jsx";

async function fetchCenter(address) {
  let request = `https://www.mapquestapi.com/geocoding/v1/address?key=xoWAr2sWOucw5gFEejiwYSVK9y9X7m0F&location=${address}`;
  const { data } = await axios.get(request);
  return data["results"][0]["locations"][0]["latLng"];
}

export default function MapComponent() {
  let activeFilter = useSelector((state) => state.maps.activeFilter);
  let thisHouseAddress = useSelector(
    (state) => state.building.buildingInfo.address
  );
  let similarBuildingsAddress = useSelector(
    (state) => state.similarBuildings.buildings
  );
  similarBuildingsAddress = similarBuildingsAddress.map((el) => el.address);
  let positions = null;
  let addresses = [thisHouseAddress];
  if (activeFilter === "Похожие дома") addresses = [...similarBuildingsAddress];

  const results = useQueries(
    addresses.map((address) => {
      return {
        queryKey: ["address: ", address],
        queryFn: () => fetchCenter(address),
        retry: 10,
      };
    })
  );

  const isLoading = results.some((query) => query.isLoading);

  if (isLoading) {
    return <Loading />;
  }
  positions = results.map((result) => [result.data.lat, result.data.lng]);

  return (
    <div className="w-full h-full">
      <MapWrapper positions={positions} />
    </div>
  );
}
